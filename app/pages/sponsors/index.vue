<template>
  <SearchBase :query="query" :facets="facets" :sort-options="[]" :infinite-scroll="false"
    :search-function="searchFunction">
    <template #header>
      <UPageHero description="{{ $t('sponsors.page.description') }}" :links="links" :ui="{
        root: 'overflow-hidden',
        header: 'text-left',
        footer: 'text-left',
        links: 'justify-start',
      }">
        <template #title>
          {{ t('sponsors.page.title') }}
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
    <template #results="{ results }">
      <div class="container mx-auto p-4">
        <SponsorLevelHits :hits-by-level="results.hits" />
      </div>
    </template>
  </SearchBase>
</template>
<script setup lang="ts">
import type { Facet, FacetSearchParam, FacetSearchResult } from '~/models/Search';
import type { Sponsor, SponsorResultGroupedLevels } from "~/models";

const { t } = useI18n()
const perPage = 12
const page = ref(1)
const sponsorService = useService('sponsors')
const sponsors = ref<{ [level: string]: Sponsor[] }>({})
const totalSponsors = ref(0)
const searchTerms = ref('')

const query = computed(() => {
  return {
    q: searchTerms.value,
    query_by: 'name',
  }
})

const links = ref([
  {
    label: t('sponsor.page.become_button'),
    to: '/docs/getting-started',
    color: 'primary',
    icon: 'i-lucide-square-play'
  },
  {
    label: t('sponsor.page.learn_more'),
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

const getSponsors = async () => {
  const res = await sponsorService.getSponsorsGroupedLevels({}, page.value, perPage)
  return res
}

const { data } = await useAsyncData<SponsorResultGroupedLevels>('sponsors', getSponsors)
if (data.value) {
  sponsors.value = data.value.hits
  totalSponsors.value = data.value.total
}

</script>
