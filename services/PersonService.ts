import { BaseServiceTypeSense } from '~~/services'
import type { Person, PersonResult, PersonRole, FacetSearchParam, FacetSearchResult } from '~~/models'
import type { SearchResponseHit } from 'typesense/lib/Typesense/Documents'
import type { SitemapUrlInput } from '#sitemap/types'

interface PersonSchema {
  id: number
  url_key: string
}

export class PersonService extends BaseServiceTypeSense {
  navCategories: Person[] | null = null
  hits(data: SearchResponseHit<PersonSchema>[]): Person[] {
    return data.map((hit: any) => this.jsonToModel(hit?.document))
  }

  async facetSearch(
    query: any,
    facets: FacetSearchParam[],
  ): Promise<FacetSearchResult<Person>> {
    if (!query.sort_by) {
      delete query.sort_by
    }
    /** Build facet by query */
    let facetBy = facets.map(facet => facet.field)
    if (query?.facet_by) {
      if (Array.isArray(query.facet_by)) {
        facetBy = [...facetBy, ...query.facet_by]
      }
      else {
        facetBy = [...facetBy, ...query.facet_by.split(',')]
      }
    }

    /** Build filter by query */
    let filterBy = facets.reduce((acc, facet) => {
      if (facet.query) {
        acc.push(facet.query)
      }
      return acc
    }, [] as string[])

    if (query?.filter_by) {
      filterBy = [...filterBy, ...query.filter_by.split(' && ')]
    }

    const queries = [
      {
        ...query,
        facet_by: facetBy.join(','),
        filter_by: filterBy.join(' && '),
      },
    ]

    for (const facet of facets) {
      if (facet.query) {
        const filterBy
          = queries[0]?.filter_by
            ?.split(' && ')
            .filter(f => f !== facet.query)
            .join(' && ') || ''
        queries.push({
          ...query,
          filter_by: filterBy,
          facet_by: facet.field,
          per_page: 0,
          max_facet_values: facet.perPage,
        })
      }
    }
    const { results } = await super.performMultiSearch<PersonSchema>(queries)
    return {
      hits: this.hits(results[0]?.hits) || [],
      found: results[0]?.found || 0,
      facets: facets.map((facet) => {
        const filterResults = results.findLast(res =>
          res.facet_counts?.some((f: any) => f.field_name === facet.field),
        )
        const result
          = filterResults?.facet_counts?.find(
            (f: any) => f.field_name === facet.field,
          ) || null
        return {
          field: facet.field,
          stats: result?.stats || {},
          items: result?.counts || [],
        }
      }),
    }
  }


  async getPersonByUrlKey(query: {}, urlKey: string): Promise<Person> {
    query = { ... { q: '*', query_by: 'url_key' }, ...query }

    const result = await super.performSearch<PersonSchema>({
      ...query,
      filter_by: `url_key:=${urlKey}`,
    })
    const hits = this.hits(result?.hits) || []

    return hits[0] || null

  }
  /**
   * Return the list of all persons url for sitemap generation
   * We use a loop with pagination to avoid issues with large number of entries
   */
  async sitemapsEntries(): Promise<SitemapUrlInput[]> {
    const size = 249
    const urls: SitemapUrlInput[] = []
    let page = 1
    let total = 0
    do {
      const res = await super.performSearch({
        q: '*',
        group_by: "username",
        per_page: size,
        page,
        group_limit: 1,
        include_fields: "username",
        enable_highlight_v1: false,
      })
      total = res?.found || 0
      const hits = res?.grouped_hits
      for (const hit of hits || []) {
        if (hit?.group_key?.[0]) {
          urls.push({
            loc: `/persons/${hit.group_key[0]}`,
          })
        }
      }

      page++
    } while ((page - 1) * size < total)

    return urls || []
  }
  async getPersonsByCompanyId(companyId: number, searchTerms: string, page: number): Promise<PersonRole> {
    const query = {
      q: searchTerms || '*',
      query_by: 'name',
      filter_by: `company_id:=${companyId}`,
      page,
      per_page: 9
    }

    const result = await super.performSearch<PersonSchema>({
      ...query,
      //filter_by: `company_id:=${companyId}`,
    })
    return {
      hits: this.hits(result?.hits) || [],
      found: result?.found || 0,
    }
  }
  jsonToModel(json: PersonSchema): Person {
    return PersonFactory.createPerson(json)
  }

}

export const PersonFactory = {
  createPerson(json: any): Person {
    const Person: Person = {
      id: json.id,
      name: json?.name,
      avatarUrl: json?.avatar_url || null,
      username: json?.username,
      company: PersonFactory.createPersonCompany(json),
      companyId: json?.company_id,
      country: PersonFactory.createPersonCountry(json),
      roles: PersonFactory.createPersonRoles(json),
      collaboratorIndex: json?.collaborator_index,
      translations: !isNaN(json?.translations) ? json.translations : 0,
      modulesMaintained: !isNaN(json?.modules_maintained)
        ? json.modules_maintained
        : 0,
      modulesMaintainedIds: json?.modules_maintained_ids || [],
      psc: !isNaN(json?.psc) ? json.psc : 0,
      pscList: json?.psc_list || [],
      workGroupList: json?.work_group_list || [],
      contact: PersonFactory.createPersonContact(json),
      urlKey: json?.url_key || '',
    }
    return Person
  },
  createPersonContact(json: any):
    | {
        address: string
        email: string
        phone: string
        city: string
        website: string
      }
    | undefined {
    if (json?.contact) {
      return {
        address: json.contact.address || '',
        email: json.contact.email || '',
        phone: json.contact.phone || '',
        city: json.contact.city || '',
        website: json.contact.website || '',
      }
    }
  },

  createPersonCountry(json: any): { label: string; code: string } | undefined {
    if (json?.country.label && json?.country.code) {
      return {
        label: json.country.label,
        code: json.country.code,
      }
    }
    return undefined
  },
  createPersonCompany(
    json: any
  ): { id: number; name: string; urlKey: string } | undefined {
    if (json?.company.id && json?.company.name && json?.company.url_key) {
      return {
        id: json.company.id,
        name: json.company.name,
        urlKey: json.company.url_key,
      }
    }
  },
  createPersonRoles(json: any): PersonRole[] {
    if (json?.roles) {
      return json.roles.map((role: any) => ({
        id: role.id,
        name: role.name,
      }))
    }
    return []
  },
}
