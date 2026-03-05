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
      query_by: 'name,description',
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
    const body = { q: '*', per_page: maxSize }
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
    const category: Category = {
      id: json.id,
      metaDescription: json.meta_description,
      metaKeywords: json.meta_keywords,
      seoTitle: json.seo_title,
      name: json.name,
      subtitle: json.subtitle,
      shortDescription: json.short_description,
      description: json.description,
      level: json.level,
      urlKey: json.url_key,
      redirectUrlKey: json.redirect_url_key || [],
      childs: [],
      parent: json?.parent
        ? CategoryFactory.createCategoryParent(json.parent)
        : null,
      mainParent: null,
      images: Array.isArray(json?.images)
        ? json.images.map((imgJson: any) =>
          CategoryFactory.createCategoryImageSet(imgJson),
        )
        : null,
      sequence: parseInt(json.sequence || 0),
      entityModel: json.entity_model || 'category',
    }
    category.mainParent = category.parent
    if (Array.isArray(json?.childs)) {
      category.childs = json.childs.map((item: any) =>
        CategoryFactory.createCategoryChild(item),
      )
    }
    while (
      category.mainParent != null
      && category.mainParent?.parent !== null
    ) {
      category.mainParent = category.mainParent.parent
    }
    return category
  },
  createCategoryParent(json: any): CategoryParent {
    return {
      name: json?.name || '',
      urlKey: json?.url_key || '',
      id: json?.id || 0,
      parent: json?.parent
        ? CategoryFactory.createCategoryParent(json.parent)
        : null,
    }
  },
  createCategoryImageSet(json: any): CategoryImageSet {
    return {
      small: json?.small
        ? CategoryFactory.createCategoryImage(json.small)
        : null,
      medium: json?.medium
        ? CategoryFactory.createCategoryImage(json.medium)
        : null,
      large: json?.large
        ? CategoryFactory.createCategoryImage(json.large)
        : null,
    }
  },
  createCategoryImage(json: any): CategoryImage {
    return {
      src: json?.src || '',
      alt: json?.alt || '',
      tag: json?.tag || '',
    }
  },
  createCategoryChild(json: any): CategoryChild {
    return {
      name: json?.name || '',
      urlKey: json?.url_key || '',
      id: json?.id || 0,
      childs: null,
      sequence: parseInt(json?.sequence || 0),
    }
  },
}
