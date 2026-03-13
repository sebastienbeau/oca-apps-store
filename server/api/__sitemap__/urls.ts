import { defineSitemapEventHandler } from '#imports'
import type { SitemapUrlInput } from '#sitemap/types'
import { ofetch } from 'ofetch'
import {
  CategoryService,
  ModuleService,
  PersonService,
  CompanyService
} from '~~/services'

export default defineSitemapEventHandler(async () => {

  const config = useRuntimeConfig()?.public?.search || {}
  const searchBaseUrl = config.url
  const searchFetch = ofetch.create({})
  const searchIndexes = config.indices
  const searchKey = config.key
  const isoLocale = 'en'
  const services = {
    persons: new PersonService(
      isoLocale,
      searchFetch,
      searchBaseUrl,
      searchKey,
      searchIndexes.persons,
    ),
    companies: new CompanyService(
      isoLocale,
      searchFetch,
      searchBaseUrl,
      searchKey,
      searchIndexes.companies,
    ),
    modules: new ModuleService(
      isoLocale,
      searchFetch,
      searchBaseUrl,
      searchKey,
      searchIndexes.modules,
    )
  }
  const modulesUrls = await services.modules.sitemapsEntries()
  const companiesUrls = await services.companies.sitemapsEntries()
  const personsUrls = await services.persons.sitemapsEntries()
  return [
    ...modulesUrls,
    ...companiesUrls,
    ...personsUrls
  ]
})