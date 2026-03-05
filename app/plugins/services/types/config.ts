import type {
  CategoryService,
  ModuleService,
  PersonService,
  CompanyService,
} from '~~/services'

export interface LocalizedIndex {
  en: string
}
export interface SearchConfig {
  url: string
  key: string
  indices: {
    persons: LocalizedIndex
    companies: LocalizedIndex
    modules: LocalizedIndex
    categories: LocalizedIndex
    [key: string]: LocalizedIndex
  }
}

export interface ServiceList {
  categories: CategoryService
  modules: ModuleService
  persons: PersonService
  companies: CompanyService
}
