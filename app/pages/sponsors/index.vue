<template>
  <SearchBase
    v-model:page="page"
    v-model:sortBy="sortBy"
    :query="query"
    :facets="facets"
    :sort-options="sortOptions"
    :infinite-scroll="false"
    :search-function="searchFunction"
    :per-page="perPage"
  >
    <template #header>
      <ContentRenderer v-if="content" :value="content" />
    </template>
    <template #actions>
      <UFormField>
        <UInput
          v-model="searchTerms"
          :placeholder="t('sponsors.search.placeholder')"
          size="lg"
          trailing-icon="search"
        />
      </UFormField>
    </template>
    <template #results="{ results, isLoading, total, perPage, infiniteScroll }">
      <div class="container mx-auto p-4">
        <SponsorLevelHits
          v-if="sortBy == 'sponsorship.level.id:asc'"
          :sponsors="results.hits"
        />
        <SponsorList v-else :sponsors="results.hits" />
      </div>
      <div class="mt-4 flex justify-center">
        <UPagination
          v-if="!infiniteScroll && total > perPage"
          v-model:page="page"
          :total="total"
          :items-per-page="perPage"
        />
      </div>
    </template>
  </SearchBase>
</template>
<script setup lang="ts">
import type {
  Sponsor,
  Facet,
  FacetSearchParam,
  FacetSearchResult,
} from '~~/models'

const { t } = useI18n()
const route = useRoute()
const { data: content } = await useAsyncData(`sponsors-modules`, () => {
  return queryCollection('docs').path(route.path).first()
})

const companiesService = useService('companies')

const searchTerms = ref('')
const perPage = 12
const page = ref(1)

const query = computed(() => {
  return {
    q: searchTerms.value,
    query_by: 'name',
    filter_by: `sponsorship.level.id:>0`,
  }
})
const sortOptions = computed(() => {
  return [
    { label: t('sponsors.sort.level'), value: 'sponsorship.level.id:asc' },
    { label: t('sponsors.sort.name_asc'), value: 'name:asc' },
    { label: t('sponsors.sort.name_desc'), value: 'name:desc' },
  ]
})
const sortBy = ref('sponsorship.level.id:asc')
const links = ref([
  {
    label: t('sponsors.page.become_button'),
    to: '/docs/getting-started',
    color: 'primary',
    icon: 'i-lucide-square-play',
  },
  {
    label: t('sponsors.page.learn_more'),
    to: '/docs/getting-started/theme/design-system',
    color: 'neutral',
    variant: 'subtle',
    trailingIcon: 'i-lucide-arrow-right',
  },
])

const facets: Facet[] = [
  {
    field: 'sponsorship.level.name',
    title: t('sponsors.filters.sponsor_level'),
  },
  {
    field: 'countries.label',
    title: t('sponsors.filters.countries'),
  },
  {
    field: 'sponsorship.industries.name',
    title: t('sponsors.filters.industries'),
  },
]

const searchFunction = async (
  query: any,
  facets: FacetSearchParam[]
): Promise<FacetSearchResult<Sponsor>> => {
  const res = await companiesService.facetSearch(query, facets)

  return res
}
</script>
