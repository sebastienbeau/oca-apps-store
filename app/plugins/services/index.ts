import { useRuntimeConfig } from '#app'

import {
  CategoryService,
  ModuleService,
  PersonService,
  SponsorService
} from '~/services'

import { ofetch } from 'ofetch'
import type {
  ServiceList as ServiceList,
  SearchConfig
} from './types/config'

declare global {
  interface Shopinvader {
    services: ShopinvaderServiceList
  }
}

declare global {
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  interface ShopinvaderServiceList extends ServiceList { }
}

declare module '#app' {
  interface NuxtApp {
    $shopinvader: Shopinvader
  }
}

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $shopinvader: Shopinvader
  }
}

/*
 * This plugin is used to initialize all the services used in the app.
 * It also provides the fetchers to fetch data from the ERP and Search Engine.
 */
export default defineNuxtPlugin(async (nuxtApp) => {
  let config = useRuntimeConfig()?.public?.search as SearchConfig

  if (
    !config
    || !config.url
  ) {
    throw new Error('No shopinvader search config found')
  }
  const fetchers = {
    searchFetch: ofetch.create({}),
    erpFetch: ofetch.create({}),
  }

  // Shortcuts to data
  const i18nOptions: any = nuxtApp.$i18n || {}
  const isoLocale: string
    = i18nOptions?.localeProperties?.value?.language
    || i18nOptions?.localeProperties?.value?.iso // For nuxt-i18n < 7
    || 'en'

  const searchBaseUrl = config.url
  const searchFetch = fetchers.searchFetch
  const searchIndexes = config.indices
  const searchKey = config.key


  // Create all other services
  const services: ShopinvaderServiceList = {
    categories: new CategoryService(
      isoLocale,
      searchFetch,
      searchBaseUrl,
      searchKey,
      searchIndexes.categories,
    ),
    persons: new PersonService(
      isoLocale,
      searchFetch,
      searchBaseUrl,
      searchKey,
      searchIndexes.persons,
    ),
    sponsors: new SponsorService(
      isoLocale,
      searchFetch,
      searchBaseUrl,
      searchKey,
      searchIndexes.sponsors,
    ),
    modules: new ModuleService(
      isoLocale,
      searchFetch,
      searchBaseUrl,
      searchKey,
      searchIndexes.modules,
    )
  }
  // Init all services when the app is mounted
  // -----------------------------------------
  if (services) {
    // Init services in the order if the initSeq attribute
    const orderedServiceList = Object.values(services).sort(
      (a, b) => a?.initSeq - b?.initSeq,
    )
    for (const service of orderedServiceList) {
      if (service?.init) {
        await service.init(services)
      }
    }
  }


  // Provide the services and fetchers to the app
  return {
    provide: {
      services
    },
  }
})
