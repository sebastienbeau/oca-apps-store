import type { Person } from '~/models'
import { BaseServiceTypeSense } from '~/services'
import type { SearchResponseHit } from 'typesense/lib/Typesense/Documents'
import type { FacetSearchParam, FacetSearchResult } from '~/models/Search'
import type { PersonRole } from '~/models/Person'

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
      company: json?.company,
      companyId: json?.company_id,
      country: PersonFactory.createPersonCountry(json),
      roles: PersonFactory.createPersonRoles(json),
      collaboratorIndex: json?.collaborator_index,
      translations: !isNaN(json?.translations) ? json.translations : 0,
      modulesMaintained: !isNaN(json?.modules_maintained) ? json.modules_maintained : 0,
      psc: !isNaN(json?.psc) ? json.psc : 0,
      pscList: json?.psc_list || [],
      workGroupList: json?.work_group_list || [],
    }
    return Person
  },
  createPersonCountry(json: any): { label: string, code: string } | undefined {
    if (json?.country_label && json?.country_code) {
      return {
        label: json.country_label,
        code: json.country_code,
      }
    }
    return undefined
  },
  createPersonRoles(json: any): PersonRole[] {
    if (json?.roles) {
      return json.roles.map((role: any) => ({
        id: role.id,
        name: role.name,
      }))
    }
    return []
  }
}
