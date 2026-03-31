export interface FacetSearchParam {
  field: string
  query: string
  sortBy?: string
  perPage: number
  searchTerm?: string
}
export interface FacetSearchResult<T> {
  hits: T[]
  found: number
  facets: [
    {
      field: string
      stats: {
        min: number
        max: number
        avg: number
        sum: number
        total_values: number
      }
      items: [
        {
          value: string
          count: number
        },
      ]
    },
  ]
}
export type Facet = {
  field: string
  title: string
  transformItems?: (
    items: { label?: string, value: string, count: number }[]
  ) => { label?: string, value: string, count: number }[]
  perPage?: number
  searchable?: boolean
  sortBy?: string
  routeParam?: string
}

export type FacetWithResult = {
  items: { label?: string, value: string, count: number }[]
  stats: { min?: number, max?: number, avg?: number }
  query?: string
} & Facet
