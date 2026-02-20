<template>
  <UBreadcrumb :items="[
    { label: t('nav.community.title'), to: '/community', icon: 'i-ph-cube-duotone' }
  ]" class="mt-8 mb-6" />
  <USeparator />
  <SearchBase :query="query" :facets="facets" :sort-options="sortOptions" v-model:sort-by="sortBy"
    :infinite-scroll="false" :search-function="searchFunction" :perPage="perPage" :ui="ui">
    <template #header>
      <UPageHero :links="links" :ui="{
        header: 'text-left',
        footer: 'text-left',
        links: 'justify-start',
      }">
        <template #title>
          {{ t('community.page.title') }}
        </template>

        <template #description>
          {{ t('community.page.description') }}
        </template>
      </UPageHero>
    </template>
    <template #actions>
      <UFormField>
        <UInput v-model="searchTerms" :placeholder="t('person.search.placeholder')" size="lg" trailing-icon="search" />
      </UFormField>
    </template>
    <template #sort="{ sortOptions, value, change }">
      <div class="flex gap-2 items-center">
        <SearchSortSelector :options="sortOptions" :value="value" class="my-4" @change="change" />
        <UFieldGroup class="hidden sm:flex">
          <UButton color="neutral" :variant="displayMode === 'list' ? 'subtle' : 'outline'"
            leading-icon="i-mdi-view-list" @click="displayMode = 'list'" />
          <UButton color="neutral" :variant="displayMode === 'grid' ? 'subtle' : 'outline'"
            leading-icon="i-mdi-view-grid" @click="displayMode = 'grid'" />
        </UFieldGroup>
      </div>
    </template>
    <template #hit="{ hit: person, index, total }">
      <PersonHit :variant="displayMode" :person="person" />
    </template>
  </SearchBase>
</template>

<script setup lang="ts">
import type { Person } from '~/models'
import type { Facet, FacetSearchParam, FacetSearchResult } from '~/models/Search'
const { t } = useI18n()
const personService = useService('persons')
const sortOptions = computed(() => {
  return [
    { label: t('person.sort.name_asc'), value: 'name:asc' },
    { label: t('person.sort.name_desc'), value: 'name:desc' },
  ]
})
const sortBy = ref('name:asc')
const query = computed(() => {
  return {
    q: searchTerms.value,
    query_by: 'name,username,company',
  }
})
const displayMode = ref<'grid' | 'list'>('grid')
const perPage = 12
const searchTerms = ref('')
const facets: Facet[] = [
  {
    field: 'country.label',
    title: t('person.filters.countries')
  },
  {
    field: 'roles.name',
    title: t('person.filters.roles')
  },
]
const searchFunction = async (
  query: any,
  facets: FacetSearchParam[]
): Promise<FacetSearchResult<Person>> => {
  const res = await personService.facetSearch(query, facets)
  return res
}

const ui = computed(() => {
  return {
    results: displayMode.value === 'list' ? 'flex flex-col gap-3 sm:gap-4' : 'gap-3 sm:gap-5',
  }
})

const links = ref([
  {
    label: t('community.page.become_button'),
    to: '/docs/getting-started',
    color: 'primary',
    icon: 'i-lucide-square-play'
  },
  {
    label: t('community.page.learn_more'),
    to: '/docs/getting-started/theme/design-system',
    color: 'neutral',
    variant: 'subtle',
    trailingIcon: 'i-lucide-arrow-right'
  }
])
</script>
