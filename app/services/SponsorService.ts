import type { Sponsor, SponsorResult, SponsorResultGroupedLevels, SponsorIndustry, SponsorCountry } from '~/models'
import { BaseServiceTypeSense } from '~/services'
import type { SearchResponseHit } from 'typesense/lib/Typesense/Documents'
import type { FacetSearchParam, FacetSearchResult } from '~/models/Search'
import type { SponsorStory } from '~/models/Sponsor'

interface SponsorSchema {
  id: string
  name: string
}
export class SponsorService extends BaseServiceTypeSense {
  navCategories: Sponsor[] | null = null

  hits(data: SearchResponseHit<SponsorSchema>[]): Sponsor[] {
    return data.map((hit: any) => this.jsonToModel(hit?.document))
  }

  groupedHits(groupedHits: {
    hits: SearchResponseHit<SponsorSchema>[]
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
    const result = await super.performSearch<SponsorSchema>(body)
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
    const result = await super.performSearch<SponsorSchema>({
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
  async getSponsorById(query: {}, id: string): Promise<Sponsor> {
    query = { ...{ q: '*', query_by: 'name' }, ...query }
    const result = await super.performSearch<SponsorSchema>({
      ...query,
      filter_by: `id:=${id}`,
    })
    const hits = this.hits(result?.hits) || []
    return hits[0] || null
  }


  async facetSearch(
    query: any,
    facets: FacetSearchParam[],
  ): Promise<FacetSearchResult<Sponsor>> {
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
    const { results } = await super.performMultiSearch<SponsorSchema>(queries)
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

  jsonToModel(json: SponsorSchema): Sponsor {
    return SponsorFactory.createSponsor(json)
  }
}

export const SponsorFactory = {
  createSponsor(json: any): Sponsor {
    const Sponsor: Sponsor = {
      id: json.id,
      logo: json.logo_urls.l,
      sponsorLevel: {
        id: json?.sponsor_level?.id,
        name: json?.sponsor_level?.name,
      },
      name: json.name,
      locations: json.locations,
      shortDescription: json?.description_short || '',
      description: json?.description_long || '',
      members: json.members,
      membersCount: json.members_count || '0',
      collaborators: json?.collaborators || [],
      industries: this.createSponsorIndustries(json?.industries),
      collaboratorIndex: json.collaborator_index || 0,
      isIntegrator: json.is_integrator || false,
      website: json?.website || '',
      websiteLabel: this.getWebsiteLabel(json),
      phone: json?.phone || '',
      email: json?.email || '',
      sponsorRank: json.sponsor_rank || 0,
      contributorsCount: json?.contributors_count || '0',
      modulesCount: json?.modules_count || '0',
      stories: this.createSponsorStories(json?.stories),
      countries: this.createSponsorCountries(json?.countries),
      descriptionWhyOca: json?.description_why_oca || '',
    }
    return Sponsor
  },
  getWebsiteLabel(json: any): string {
    if (!json?.website) {
      return ''
    }
    const url = new URL(json?.website)
    return url?.host.replace('www.', '')
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
  },
  createSponsorCountries(json: any): SponsorCountry[] {
    if (!Array.isArray(json)) {
      return []
    }
    return json.map((countryJson: any) => {
      return {
        label: countryJson?.label,
        code: countryJson?.code,
      }
    }) || []
  }
}
