import type {
    CategoryService,
    ModuleService,
    PersonService,
    SponsorService,
} from '~/services'

export interface SearchConfig {
    url: string
    indices: {
        persons: string
        sponsors: string
        modules: string
        categories: string
        [key: string]: string
    }
}

export interface ServiceList {
    categories: CategoryService
    modules: ModuleService
    persons: PersonService
    sponsors: SponsorService
}
