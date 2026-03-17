import type { Module, ModuleGroupedHit, ModuleResult, FacetSearchParam, FacetSearchResult } from '~~/models'
import { BaseServiceTypeSense } from '~~/services'
import type { SearchResponseHit } from 'typesense/lib/Typesense/Documents'
import type { SitemapUrlInput } from '#sitemap/types'

interface ModuleSchema {
  id: number
  url_key: string
}

export class ModuleService extends BaseServiceTypeSense {
  navCategories: Module[] | null = null
  hits(data: SearchResponseHit<ModuleSchema>[]): Module[] {
    return data.map((hit: any) => this.jsonToModel(hit?.document))
  }
  groupedHits(groupedHits: any[]): ModuleGroupedHit[] {
    return groupedHits.map((group: any) => ({
      urlKey: group?.group_key?.[0] || '',
      hits: group?.hits.map((hit: any) => this.jsonToModel(hit?.document)) || [],
    }))
  }

  async findByURLKey(urlKey: string): Promise<ModuleGroupedHit | null> {
    const result = await super.performSearch({
      q: '*',
      filter_by: `url_key:${urlKey}`,
      group_by: 'url_key',
      include_fields: "$ocastore_persons_en(*, strategy: merge)"
    })

    const groupedHits = this.groupedHits(result?.grouped_hits) || []
    return groupedHits?.[0] || null
  }

  async search(body: any): Promise<ModuleResult> {
    body = {
      ...{ q: '*', query_by: 'name' },
      ...body,
      group_by: 'url_key'
    }
    const result = await super.performSearch<any>(body)
    const hits = this.groupedHits(result?.grouped_hits) || []
    const total = result?.found || 0
    return { hits, total }
  }
  async getModuleDependencies(module: Module): Promise<ModuleGroupedHit[]> {
    const filter = module?.dependencies.map(dep => `${dep}`).join(',')
    const res = await this.search({
      filter_by: `techname:=[${filter}]`
    })
    return module?.dependencies.map(dep => {
      let found = res?.hits.find(hit => hit.urlKey === dep) || {
        urlKey: dep,
        hits: [ModuleFactory.createModule({
          name: dep,
          urlKey: null,
        })],
      }
      return found
    }) || []
  }

  async getModuleUsedBy(module: Module, queryString: string, page: number): Promise<ModuleResult> {
    const query: any = {
      filter_by: `dependencies:="${module.techname}" && version:=${module.version}`,
      group_by: 'url_key',
      page: page
    }
    if (queryString) {
      query.q = queryString
      query.query_by = 'name'
    }
    const res = await this.search(query)
    return res
  }

  async facetSearch(
    query: any,
    facets: FacetSearchParam[],
  ): Promise<FacetSearchResult<ModuleGroupedHit>> {
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
        group_by: 'url_key',
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
          group_by: 'url_key',
          per_page: 0,
          max_facet_values: facet.perPage,
        })
      }
    }
    const { results } = await super.performMultiSearch<ModuleSchema>(queries)
    const groupedHits = results[0]?.grouped_hits || []
    return {
      hits: this.groupedHits(groupedHits) || [],
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
   * Return the list of all modules url for sitemap generation
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
        group_by: "techname",
        per_page: size,
        page,
        group_limit: 1,
        include_fields: "techname",
        enable_highlight_v1: false,
      })
      total = res?.found || 0
      const hits = res?.grouped_hits
      for (const hit of hits || []) {
        if (hit?.group_key?.[0]) {
          urls.push({
            loc: `/modules/${hit.group_key[0]}`
          })
        }
      }

      page++
    } while ((page - 1) * size < total)

    return urls || []
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
      techname: json?.techname,
      repository: {
        url: json?.repository?.url,
        name: json?.repository?.name,
        description: json?.repository?.description,
        category: {
          name: json?.category,
          urlKey: json?.category
        },
      },

      version: json?.version,
      description: json?.description,
      summary: json?.summary,
      license: json?.license,
      usedBy: json?.used_by || [],
      dependencies: json?.dependencies || [],
      maturity: json?.maturity,
      authors: json?.author || [],
      publicURL: json?.public_url,
      runboatURL: json?.runboat_url,
      website: json?.website,
      readmeFragments: {
        configure: json?.readme_fragments?.configure,
        context: json?.readme_fragments?.context,
        credits: json?.readme_fragments?.credits,
        history: json?.readme_fragments?.history,
        install: json?.readme_fragments?.install,
        roadmap: json?.readme_fragments?.roadmap,
        usage: json?.readme_fragments?.usage,
      },
      contributors: json?.contributors || [],
      maintainer: json?.maintainer,
      bugTracker: {
        url: json?.bug_tracker?.url,
        instructions: json?.bug_tracker?.instructions,
      },
      popularity: json?.popularity,
      lastUpdate: json?.last_update ? new Date(json.last_update) : null,
    }
    return module
  }
}
