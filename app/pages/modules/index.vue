<template>
  <UBreadcrumb :items="[
    { label: t('nav.modules.title'), to: '/modules', icon: 'i-ph-cube-duotone' },
  ]" class="mt-8 mb-6" />
  <USeparator />
  <SearchBase :query="query" :facets="facets" :sort-options="sortOptions" v-model:sort-by="sortBy"
    :infinite-scroll="false" :search-function="searchFunction" :perPage="perPage" :ui="ui">
    <template #header>
      <UPageHero description="{{ $t('modules.page.description') }}" :links="links" :ui="{
        root: 'overflow-hidden',
        header: 'text-left',
        footer: 'text-left',
        links: 'justify-start',
      }">
        <template #title>
          {{ t('modules.page.title') }}
          <span class="text-secondary-500"> {{ t('modules.page.title_emphasis') }}</span>
        </template>
        <template #description>
          {{ t('modules.page.description') }}
        </template>
      </UPageHero>
    </template>
    <template #actions>
      <UFormField>
        <UInput v-model="searchTerms" :placeholder="t('modules.search.placeholder')" size="lg" trailing-icon="search" />
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
    <template #hit="{ hit: module, index, total }">
      <ModuleHit :variant="displayMode" :module="module" />
    </template>
  </SearchBase>
</template>

<script setup lang="ts">
import type { Module } from '~/models'
import type { Facet, FacetSearchParam, FacetSearchResult } from '~/models'
const { t } = useI18n()
const moduleService = useService('modules')
const sortOptions = computed(() => {
  return [
    { label: t('modules.sort.name_asc'), value: 'name:asc' },
    { label: t('modules.sort.name_desc'), value: 'name:desc' },
  ]
})
const sortBy = ref('name:asc')
const query = computed(() => {
  return {
    q: searchTerms.value,
    query_by: 'name,category,technical_name,repository.project,description',
  }
})
const displayMode = ref<'grid' | 'list'>('grid')
const perPage = 12
const searchTerms = ref('')
const facets: Facet[] = [
  {
    field: 'supported_versions',
    title: t('modules.filters.versions')
  },
  {
    field: 'category',
    title: t('modules.filters.category')
  },
]
const searchFunction = async (
  query: any,
  facets: FacetSearchParam[]
): Promise<FacetSearchResult<Module>> => {
  const res = await moduleService.facetSearch(query, facets)
  return res
}

const ui = computed(() => {
  return {
    results: displayMode.value === 'list' ? 'flex flex-col gap-3 sm:gap-4' : 'gap-3 sm:gap-5',
  }
})

const links = ref([
  {
    label: t('modules.page.become_button'),
    to: '/docs/getting-started',
    color: 'primary',
    icon: 'i-lucide-square-play'
  },
  {
    label: t('modules.page.learn_more'),
    to: '/docs/getting-started/theme/design-system',
    color: 'neutral',
    variant: 'subtle',
    trailingIcon: 'i-lucide-arrow-right'
  }
])
</script>
