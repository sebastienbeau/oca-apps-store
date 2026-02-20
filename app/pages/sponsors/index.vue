<template>
  <UBreadcrumb :items="[
    { label: t('nav.sponsors.title'), to: '/sponsors', icon: 'i-ph-cube-duotone' },
  ]" class="mt-8 mb-6" />
  <USeparator />
  <SearchBase v-model:page="page" v-model:sortBy="sortBy" :query="query" :facets="facets" :sort-options="sortOptions"
    :infinite-scroll="false" :search-function="searchFunction" :perPage="perPage">
    <template #header>
      <UPageHero description="{{ $t('sponsors.page.description') }}" :links="links" :ui="{
        root: 'overflow-hidden',
        header: 'text-left',
        footer: 'text-left',
        links: 'justify-start',
      }">
        <template #title>
          {{ t('sponsors.page.title') }}
          <span class="text-secondary-500"> {{ t('sponsors.page.title_emphasis') }}</span>
        </template>
        <template #description>
          {{ t('sponsors.page.description') }}
        </template>
      </UPageHero>
    </template>
    <template #actions>
      <UFormField>
        <UInput v-model="searchTerms" :placeholder="t('sponsors.search.placeholder')" size="lg"
          trailing-icon="search" />
      </UFormField>
    </template>
    <template #results="{ results, isLoading, total, perPage, infiniteScroll }">
      <div class="container mx-auto p-4">
        <SponsorLevelHits v-if="sortBy == 'sponsor_level.id:asc'" :sponsors="results.hits" />
        <SponsorList v-else :sponsors="results.hits" />
      </div>
      <div class="flex justify-center mt-4">
        <UPagination v-if="!infiniteScroll && total > perPage" v-model:page="page" :total="total"
          :items-per-page="perPage" />
      </div>
    </template>
  </SearchBase>
</template>
<script setup lang="ts">
import type { Facet, FacetSearchParam, FacetSearchResult } from '~/models/Search';
import type { Sponsor } from "~/models";

const { t } = useI18n()
const sponsorService = useService('sponsors')

const searchTerms = ref('')
const perPage = 12
const page = ref(1)

const query = computed(() => {
  return {
    q: searchTerms.value,
    query_by: 'name',
  }
})
const sortOptions = computed(() => {
  return [
    { label: t('sponsors.sort.level'), value: 'sponsor_level.id:asc' },
    { label: t('sponsors.sort.name_asc'), value: 'name:asc' },
    { label: t('sponsors.sort.name_desc'), value: 'name:desc' },
  ]
})
const sortBy = ref('sponsor_level.id:asc')
const links = ref([
  {
    label: t('sponsors.page.become_button'),
    to: '/docs/getting-started',
    color: 'primary',
    icon: 'i-lucide-square-play'
  },
  {
    label: t('sponsors.page.learn_more'),
    to: '/docs/getting-started/theme/design-system',
    color: 'neutral',
    variant: 'subtle',
    trailingIcon: 'i-lucide-arrow-right'
  }
])

const facets: Facet[] = [
  {
    field: 'sponsor_level.name',
    title: t('sponsors.filters.sponsor_level')
  },
  {
    field: 'countries.label',
    title: t('sponsors.filters.countries')
  },
  {
    field: 'industry.name',
    title: t('sponsors.filters.industries')
  },
]

const searchFunction = async (
  query: any,
  facets: FacetSearchParam[]
): Promise<FacetSearchResult<Sponsor>> => {
  const res = await sponsorService.facetSearch(query, facets)

  return res
}
</script>
