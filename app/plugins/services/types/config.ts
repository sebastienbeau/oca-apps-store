import type {
  CategoryService,
  ModuleService,
  PersonService,
  SponsorService,
} from '~~/services'

export interface LocalizedIndex {
  en: string
}
export interface SearchConfig {
  url: string
  key: string
  indices: {
    persons: LocalizedIndex
    sponsors: LocalizedIndex
    modules: LocalizedIndex
    categories: LocalizedIndex
    [key: string]: LocalizedIndex
  }
}

export interface ServiceList {
  categories: CategoryService
  modules: ModuleService
  persons: PersonService
  sponsors: SponsorService
}
