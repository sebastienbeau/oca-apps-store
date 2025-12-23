import { useRuntimeConfig } from '#app'
import {
    CategoryService,
    ModuleService,
    PersonService,
    SponsorService,
} from '~/services'
import type { LocaleObject, NuxtI18nOptions } from '@nuxtjs/i18n'
import { ofetch } from 'ofetch'
import type { ServiceList, config } from './types/config'

declare module '#app' {
    interface NuxtApp {
        $services: ServiceList
    }
}

declare module '@vue/runtime-core' {
    interface ComponentCustomProperties {
        $services: ServiceList
    }
}

/*
 * This plugin is used to initialize all the services used in the app.
 * It also provides the fetchers to fetch data from the ERP and Search Engine.
 */
export default defineNuxtPlugin(async (nuxtApp) => {
    // Get the search config from the runtime config
    let config = useRuntimeConfig()?.public as config
    if (!config.search || !config.search.url) {
        throw new Error('No typesense config found')
    }
    config = JSON.parse(JSON.stringify(config))
    const searchFetch = ofetch.create({})
    const i18nOptions: any = nuxtApp.$i18n || {}
    const isoLocale: string =
        i18nOptions?.localeProperties?.value?.language ||
        i18nOptions?.localeProperties?.value?.iso ||
        'en_us'
    const searchBaseUrl = config.search.url
    const searchIndexes = config.search.indices

    // Create all other services
    const services: ServiceList = {
        categories: new CategoryService(
            isoLocale,
            searchFetch,
            searchBaseUrl,
            searchIndexes.categories
        ),
        persons: new PersonService(
            isoLocale,
            searchFetch,
            searchBaseUrl,
            searchIndexes.persons
        ),
        sponsors: new SponsorService(
            isoLocale,
            searchFetch,
            searchBaseUrl,
            searchIndexes.sponsors
        ),
        modules: new ModuleService(
            isoLocale,
            searchFetch,
            searchBaseUrl,
            searchIndexes.modules
        ),
    }
    // Init all services when the app is mounted
    // -----------------------------------------
    if (services) {
        for (const service of Object.values(services)) {
            if (service?.init) {
                await service.init(services)
            }
        }
    }

    // Manage the language switch
    // --------------------------
    nuxtApp.hook('i18n:localeSwitched', async ({ newLocale }) => {
        // Convert the locale to the iso format (while trying to keep TS typing)
        // We get 'en' in newLocale but search services want 'en_en' or 'en_us'...
        const i18n = nuxtApp.$i18n as NuxtI18nOptions
        const locales = i18n.locales as unknown as Ref<LocaleObject[]>
        const locale = locales?.value?.find((l) => l.code === newLocale)
        const newIsoLocale = locale?.language || 'fr_fr'
        if (services) {
            for (const service of Object.values(services)) {
                await service.changeLocale(newIsoLocale)
            }
        }
    })

    // Provide the services and fetchers to the app
    return {
        provide: {
            services,
        },
    }
})

const isValidURL = (url: string): boolean => {
    try {
        new URL(url)
        return true
    } catch {
        return false
    }
}
