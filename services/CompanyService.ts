import type { Sponsor, SponsorResult, SponsorResultGroupedLevels, SponsorIndustry, Company, FacetSearchParam, FacetSearchResult } from '~~/models'
import type { SponsorStory } from '~~/models/Sponsor'
import { BaseServiceTypeSense } from '~~/services'
import type { SearchResponseHit } from 'typesense/lib/Typesense/Documents'
import type { SitemapUrlInput } from '#sitemap/types'

interface CompanySchema {
  id: string
  name: string
}
export class CompanyService extends BaseServiceTypeSense {
  navCategories: Sponsor[] | null = null

  hits(data: SearchResponseHit<CompanySchema>[]): Sponsor[] {
    return data.map((hit: any) => this.jsonToModel(hit?.document))
  }

  groupedHits(groupedHits: {
    hits: SearchResponseHit<CompanySchema>[]
  }[]): SponsorResultGroupedLevels['hits'] {
    return groupedHits.reduce((acc, group) => {
      const sponsors: Sponsor[] = group.hits.map((hit: any) =>
        this.jsonToModel(hit?.document),
      )

      acc[sponsors[0]?.sponsorLevel.id] = sponsors
      return acc
    }, {} as SponsorResultGroupedLevels['hits'])
  }

  async search(body: any): Promise<SponsorResult> {
    body = {
      ...{ q: '*', query_by: 'name' },
      ...body,
    }
    const result = await super.performSearch<CompanySchema>(body)
    const hits = this.hits(result?.hits) || []
    const total = result?.found || 0
    const aggregations = null
    return { hits, total, aggregations }
  }

  async getSponsorsGroupedLevels(query: {}, page: number, perPage: number): Promise<SponsorResultGroupedLevels> {
    query = {
      ...{ q: '*', query_by: 'name' },
      ...query,
    }
    const result = await super.performSearch<CompanySchema>({
      ...query,
      group_by: 'sponsor_level.id',
      page,
      per_page: perPage,
      sort_by: 'sponsor_level.id:asc',

    })
    return {
      total: result?.found || 0,
      hits: result?.grouped_hits?.reduce((acc, hit) => {
        const key = hit.group_key[0] || ''
        return {
          ...acc,
          [key]: this.hits(hit.hits)
        }
      }, {}) || []
    }
  }

  async getCompanyById(query: {}, id: string): Promise<Company> {
    query = { ...{ q: '*', query_by: 'name' }, ...query }
    const result = await super.performSearch<CompanySchema>({
      ...query,
      filter_by: `id:=${id}`,
    })
    const hits = this.hits(result?.hits) || []
    return hits[0] || null
  }

  /**
   * Get company data by URL Key attribute, used for company page
   * @param urlKey The URL key of the company, which is a unique identifier used in the URL of the company page
   * @returns a company or null if not found
   */
  async findByURLKey(urlKey: string): Promise<Company | null> {
    const result = await super.performSearch({
      q: '*',
      filter_by: `url_key:${urlKey}`,
      limit: 1,
    })

    const hits = this.hits(result?.hits) || []
    return hits?.[0] || null
  }

  async facetSearch(
    query: any,
    facets: FacetSearchParam[],
  ): Promise<FacetSearchResult<Company | Sponsor>> {
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
    const { results } = await super.performMultiSearch<CompanySchema>(queries)
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
  /**
   * Return the list of all companies url for sitemap generation
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
        group_by: "url_key",
        per_page: size,
        page,
        group_limit: 1,
        include_fields: "url_key",
        enable_highlight_v1: false,
      })
      total = res?.found || 0
      const hits = res?.grouped_hits
      for (const hit of hits || []) {
        if (hit?.group_key?.[0]) {
          urls.push({
            loc: `/integrators/${hit.group_key[0]}`,
          })
        }
      }

      page++
    } while ((page - 1) * size < total)

    return urls || []
  }
  jsonToModel(json: CompanySchema): Company | Sponsor {
    if (json?.sponsorship?.level) {
      return SponsorFactory.createSponsor(json)
    }
    return CompanyFactory.createCompany(json)
  }
}
export const CompanyFactory = {
  createCompany(json: any): Company {
    const company: Company = {
      id: json.id,
      name: json.name,
      redirectUrlKey: json?.redirect_url_key || [],
      urlKey: json?.url_key || '',
      email: json?.email || '',
      countries: this.createCompanyCountries(json?.countries),
      phone: json?.phone || '',
      contacts: this.createCompanyContacts(json?.contacts),
      website: this.getWebsite(json),
      isIntegrator: json.is_integrator || false,
      collaborationIndex: json.collaboration_index || 0,
      contributorsCount: json.contributors_count || '0',
      membersCount: json.members_count || '0',
      modulesCount: json.modules_count || '0',
      logoUrls: {
        alt: json?.logo_urls?.alt || '',
        l: json?.logo_urls?.l || '',
        m: json?.logo_urls?.m || '',
        s: json?.logo_urls?.s || '',
      },
    }
    return company
  },
  getWebsite(json: any) {
    try {
      if (!json?.website) {
        throw new Error('No website')
      }
      const url = new URL(json?.website)
      return {
        url: url.href,
        label: url.hostname.replace('www.', ''),
      }
    } catch (e) {
      return {
        url: '',
        label: '',
      }
    }
  },

  createCompanyContacts(json: any): CompanyContact[] {
    if (!Array.isArray(json)) {
      return []
    }
    return (
      json.map((contactJson: any) => {
        return {
          email: contactJson?.email,
          name: contactJson?.name,
          phone: contactJson?.phone,
          city: contactJson?.city,
          state: contactJson?.state,
          street: contactJson?.street,
          street2: contactJson?.street2,
          zip: contactJson?.zip,
          country: {
            code: contactJson?.country?.code,
            label: contactJson?.country?.label,
          },
        }
      }) || []
    )
  },

  createCompanyCountries(json: any): CompanyCountry[] {
    if (!Array.isArray(json)) {
      return []
    }
    return (
      json.map((countryJson: any) => {
        return {
          label: countryJson?.label,
          code: countryJson?.code,
        }
      }) || []
    )
  },
}

export const SponsorFactory = {
  createSponsor(json: any): Sponsor {
    const company = CompanyFactory.createCompany(json)
    const Sponsor: Sponsor = {
      ...company,
      sponsorship: {
        level: {
          id: json?.sponsorship?.level?.id,
          name: json?.sponsorship?.level?.name,
        },
        shortDescription: json?.sponsorship?.description_short || '',
        description: json?.sponsorship?.description_long || '',
        descriptionWhyOca: json?.sponsorship?.description_why_oca || '',
        stories: this.createSponsorStories(json?.sponsorship?.stories),
        industries: this.createSponsorIndustries(json?.sponsorship?.industries),
      },
    }
    return Sponsor
  },
  createSponsorStories(json: any): SponsorStory[] {
    if (!Array.isArray(json)) {
      return []
    }
    return json.map((storiesJson: any) => {
      return {
        title: storiesJson.title,
        teaser: storiesJson.teaser,
        coverUrl: storiesJson.cover_url,
        relativeUrl: storiesJson.relative_url,
      }
    })
  },
  createSponsorIndustries(json: any): SponsorIndustry[] {
    if (!Array.isArray(json)) {
      return []
    }
    return json.map((industryJson: any) => {
      return {
        name: industryJson.name,
        description: industryJson.description,
      }
    })
  }
}
