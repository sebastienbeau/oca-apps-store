import { BaseServiceLocalized } from '~/services'
import type { $Fetch } from 'ofetch'
import { Client } from 'typesense'
import type {
  DocumentSchema,
  SearchResponse,
} from 'typesense/lib/Typesense/Documents'
import type {
  SearchParams,
} from 'typesense/lib/Typesense/Types'
import type { LocalizedIndex } from '~/plugins/services/types/config'

export class BaseServiceTypeSense extends BaseServiceLocalized {
  ofetch: $Fetch
  host: string
  key: string
  collectionByLocales: {
    [key: string]: string
  }
  collection: {
    [key: string]: string
  }
  client: Client
  constructor(
    isoLocale: string,
    ofetch: $Fetch,
    host: string,
    key: string,
    collectionByLocales: LocalizedIndex,
  ) {
    super(isoLocale)
    this.ofetch = ofetch
    this.host = host
    this.key = key
    this.collectionByLocales = collectionByLocales
    if (!this.collectionByLocales) {
      throw new Error('Typesense collection is required')
    }
    this.collection = this.setLocalizedCollectionName()
    const url = new URL(this.host)
    let path = url.pathname === '/' ? '' : url.pathname
    this.client = new Client({
      nodes: [
        {
          host: url.hostname,
          path,
          port: url.port ? parseInt(url.port) : 443,
          protocol: url.protocol.replace(':', ''),
        },
      ],
      apiKey: this.key,
      connectionTimeoutSeconds: 2,
    })
  }

  setLocalizedCollectionName() {
    return this.collectionByLocales?.['en'] || ''
  }

  // Change indexes' names to match the current locale
  override async changeLocale(isoLocale: string) {
    super.changeLocale(isoLocale)
    this.collection = this.setLocalizedCollectionName()
  }

  /**
   * Perform a multiple queries search on Typesense
   * @param queries
   * @returns
   */
  async performMultiSearch<T extends DocumentSchema>(
    queries: SearchParams<T>[] = [],
  ): Promise<{ results: SearchResponse<T>[] }> {
    try {
      const searches = queries.map(query => ({
        collection: this.collection,
        ...query,
      }))

      const res = await this.client.multiSearch.perform({
        searches,
      })
      if (res?.results?.[0]?.error) {
        console.error('Typesense error:', res.results[0].error)
        throw new Error(res.results[0].error)
      }
      return res
    }
    catch (error: any) {
      this.findFailureInTypesenseResponse(error?.data)
      throw error
    }
  }

  /**
   * Perform a search on a single collection
   * @param body
   * @returns
   */
  async performSearch<T extends DocumentSchema>(
    body: SearchParams<T>,
  ): Promise<SearchResponse<T> | null> {
    const res = await this.performMultiSearch<T>([body])
    return res?.results?.[0] || null
  }

  // Recursively search for 'failures' or 'failed_shards' fields somewhere deep in the response and concat errors from them
  findFailureInTypesenseResponse(response: any): string | null {
    if (!response) {
      return null
    }
    const searchFailures = (level: number, obj: any): string => {
      let errors = ''
      for (const key in obj) {
        if (key === 'failures' || key === 'failed_shards') {
          // if it's an array, concat all the messages
          if (Array.isArray(obj[key])) {
            errors += obj[key]
              .map((item: any) => `${item?.index}: ${item?.reason?.reason}`)
              .join('; ')
          }
          else {
            errors += JSON.stringify(obj[key])
          }
        }
        else if (level < 1 && typeof obj[key] === 'object') {
          // Go deeper only once for optimization
          errors += searchFailures(level + 1, obj[key])
        }
      }
      return errors
    }
    const res = searchFailures(0, response)
    return res || null
  }
}

export class BaseServiceTypeSenseUnion extends BaseServiceTypeSense {
  collectionsByLocales: {
    [key: string]: {
      [key: string]: string
    }
  }
  collections: { [key: string]: string }
  constructor(
    isoLocale: string,
    ofetch: $Fetch,
    host: string,
    key: string,
    collectionsByLocales: {
      [key: string]: {
        [key: string]: string
      }
    },
  ) {
    const firstCollection = Object.values(collectionsByLocales)[0]?.['fr'] || ''
    super(isoLocale, ofetch, host, key, firstCollection || {})

    this.collectionsByLocales = collectionsByLocales
    if (!this.collectionsByLocales) {
      throw new Error('Typesense collections is required')
    }
    this.collections = this.setLocalizedCollectionNames()
  }

  setLocalizedCollectionNames() {
    return Object.fromEntries(
      Object.entries(this.collectionsByLocales).map(([key, collectionByLocales]) => [
        key,
        collectionByLocales?.['fr'] || '',
      ]),
    )
  }

  /**
   * Perform a multiple queries search on multiple collection in Typesense
   * @param queries
   * @returns
   */
  async performMultiCollectionSearch<T extends DocumentSchema>(
    queries: SearchParams<T>[] = [],
  ): Promise<{ [key: string]: SearchResponse<T> }> {
    try {
      const searches = Object.entries(this.collections).map(
        ([key, collection]) => ({
          collection: collection,
          ...queries,
        }),
      )

      const res: SearchResponse<T>[] = await this.client.multiSearch
        .perform({
          searches,
        })
        .then(r => r.results)

      const results: { [key: string]: SearchResponse<T> } = {}
      for (const key in this.collections) {
        const collectionName = this.collections[key]
        results[key] = res.find(
          r => r.request_params.collection_name === collectionName,
        )!
      }
      return results
    }
    catch (error: any) {
      this.findFailureInTypesenseResponse(error?.data)
      throw error
    }
  }
}
