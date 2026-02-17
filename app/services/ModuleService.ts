import type { Module } from '~/models'
import { BaseServiceTypeSense } from '~/services'
import type { SearchResponseHit } from 'typesense/lib/Typesense/Documents'
import type { FacetSearchParam, FacetSearchResult } from '~/models/Search'

interface ModuleSchema {
  id: number
  url_key: string
}
export class ModuleService extends BaseServiceTypeSense {
  navCategories: Module[] | null = null
  hits(data: SearchResponseHit<ModuleSchema>[]): Module[] {
    return data.map((hit: any) => this.jsonToModel(hit?.document))
  }
  async findByURLKey(urlKey: string): Promise<Module | null> {
    const result = await super.performSearch<ModuleSchema>({
      q: '*',
      filter_by: `url_key:${urlKey}`,
    })
    const hits = this.hits(result?.hits) || []
    return hits.length > 0 ? hits[0] : null
  }
  async search(body: any): Promise<ModuleService> {
    body = {
      ...{ q: '*', query_by: 'name' },
      ...body,
    }
    const result = await super.performSearch<ModuleService>(body)
    const hits = this.hits(result?.hits) || []
    const total = result?.found || 0
    const aggregations = null
    return { hits, total, aggregations }
  }
  async facetSearch(
    query: any,
    facets: FacetSearchParam[],
  ): Promise<FacetSearchResult<Module>> {
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
    const { results } = await super.performMultiSearch<ModuleSchema>(queries)
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
  jsonToModel(json: ModuleSchema): Module {
    return ModuleFactory.createModule(json)
  }
}

export const ModuleFactory = {
  createModule(json: any): Module {
    const module: Module = {
      id: json.id,
      name: json.name,
      urlKey: json.url_key,
      technicalName: json?.technical_name,
      description: json?.description,
      license: json?.license,
      author: json?.author,
      maintainer: {
        name: json?.maintainer?.name,
        website: json?.maintainer?.website,
      },
      repository: {
        url: json?.repository?.url,
        project: json?.repository?.project,
      },
      supportedVersions: json?.supported_versions || [],
      contributors: json?.contributors || [],
      bugTracker: {
        url: json?.bug_tracker?.url,
        instructions: json?.bug_tracker?.instructions,
      },
      documentation: {
        userGuide: json?.documentation?.user_guide,
        contributionGuide: json?.documentation?.contribution_guide,
      },
      category: json?.category,
      popularity: json?.popularity,
      lastUpdate: json?.last_update ? new Date(json.last_update) : null,
    }
    return module
  },
}
