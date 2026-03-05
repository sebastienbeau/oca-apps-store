export interface CategoryChild {
  name: string
  urlKey: string
  id: number
  childs: CategoryChild[] | null
  sequence: number
}

export interface CategoryParent {
  name: string
  urlKey: string
  id: number
  parent: CategoryParent | null
}
export interface CategoryImage {
  src: string
  alt: string
  tag: string
}
export interface CategoryImageSet {
  small: CategoryImage | null
  medium: CategoryImage | null
  large: CategoryImage | null
}
export const CATEGORY_ENTITY_MODEL = 'category'
type CategoryEntityModel = typeof CATEGORY_ENTITY_MODEL
export interface Category {
  // Standard fields
  entityModel: CategoryEntityModel
  id: number
  name: string
  subtitle: string
  shortDescription: string
  description: string
  seoTitle: string
  urlKey: string
  redirectUrlKey: string[]
  level: number
  metaDescription: string
  metaKeywords: string
  childs: CategoryChild[]
  parent: CategoryParent | null
  mainParent: CategoryParent | null
  images: CategoryImageSet[] | null
  sequence: number
}