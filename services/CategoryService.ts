import type {
  Category,
  CategoryChild,
  CategoryImage,
  CategoryImageSet,
  CategoryParent,
  CategoryResult,
} from '~~/models'
import { BaseServiceTypeSense } from '~~/services'
import type { SearchResponseHit } from 'typesense/lib/Typesense/Documents'

interface CategorySchema {
  id: number
  url_key: string
}
export class CategoryService extends BaseServiceTypeSense {
  navCategories: Category[] | null = null
  hits(data: SearchResponseHit<CategorySchema>[]): Category[] {
    return data.map((hit: any) => this.jsonToModel(hit?.document))
  }

  async search(body: any): Promise<CategoryResult> {
    const result = await super.performSearch<CategorySchema>(body)
    const hits = this.hits(result?.hits) || []
    const total = result?.found || 0
    const aggregations = null
    return { hits, total, aggregations }
  }

  static fullTextQuery(q: string) {
    return {
      q,
      query_by: 'name',
    }
  }

  /**
   * @param field
   * @param value
   * @returns
   */
  find(field: string, value: string[] | number[]): Promise<CategoryResult> {
    const body = {
      q: '*',
      query_by: 'name',
      filter_by: `${field}:=[${value.join(',')}]`,
    }
    return this.search(body)
  }

  getByIds(ids: number[]): Promise<CategoryResult> {
    const body = {
      q: '*',
      query_by: 'name,description',
      filter_by: `id:=[${ids.join(',')}]`,
      per_page: ids.length,
    }
    return this.search(body)
  }

  getAll(maxSize = 100): Promise<CategoryResult> {
    const body = { q: '*', sort_by: 'name:asc', per_page: maxSize }
    return this.search(body)
  }

  async getByURLKey(urlKey: string): Promise<Category | null> {
    const result: CategoryResult = await this.find('url_key', [urlKey])
    if (result?.hits?.length > 0) {
      return result?.hits?.[0]
    }
    return null
  }

  async autocompleteSearch(
    query: string,
    limit: number,
  ): Promise<CategoryResult> {
    const body = {
      ...CategoryService.fullTextQuery(query),
      per_page: limit,
    }

    const response = await this.search(body)
    const hits = response?.hits || []
    const total = response?.total || 0
    return { hits, total }
  }

  async getNavCategories(): Promise<Category[]> {
    if (this.navCategories == null) {
      const result = await this?.search({
        per_page: 20,
        q: '*',
        filter_by: `level:=0`
      })
      this.navCategories = result?.hits || []
    }
    return this.navCategories || []
  }

  async getSubCategories(parentId: number): Promise<Category[]> {
    const result = await this?.search({
      per_page: 20,
      q: '*',
      filter_by: `parent.id:=${parentId}`,
    })
    return result?.hits || []
  }

  jsonToModel(json: CategorySchema): Category {
    return CategoryFactory.createCategory(json)
  }
}

export const CategoryFactory = {
  createCategory(json: any): Category {
    return {
      id: json.id,
      name: json.name,
      urlKey: json.url_key,
      shortDescription: json?.short_description,
      description: json?.description
    }
  }
}
