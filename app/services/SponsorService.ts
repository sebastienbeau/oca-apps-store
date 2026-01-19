import type { Sponsor, SponsorResult, SponsorResultGroupedLevels } from '~/models'
import { BaseServiceTypeSense } from '~/services'
import type { SearchResponseHit } from 'typesense/lib/Typesense/Documents'

interface SponsorSchema {
  id: number
  url_key: string
}
export class SponsorService extends BaseServiceTypeSense {
  navCategories: Sponsor[] | null = null
  hits(data: SearchResponseHit<SponsorSchema>[]): Sponsor[] {
    return data.map((hit: any) => this.jsonToModel(hit?.document))
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
      group_by: 'level',
      page,
      per_page: perPage,
      sort_by: 'level:desc',
    })

    return {
      total: result?.found || 0,
      hits: result?.grouped_hits?.reduce((acc, hit) => {
        const key = hit.group_key[0]?.toString() || ''
        return {
          ...acc,
          [key]: this.hits(hit.hits)
        }
      }, {}) || []
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
      logo: json.logo,
      name: json.name,
      locations: json.locations,
      description: json.description,
      members: json.members,
      collaborators: json.collaborators,
      industries: json.industries,
      collaboratorIndex: json.collaboratorIndex,
    }
    return Sponsor
  },
}
