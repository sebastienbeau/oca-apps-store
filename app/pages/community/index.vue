<template>
  <SearchBase
    :query="query"
    :facets="facets"
    :sort-options="sortOptions"
    v-model:sort-by="sortBy"
    :infinite-scroll="false"
    :search-function="searchFunction"
    :per-page="perPage"
    :ui="ui"
  >
    <template #header>
      <ContentRenderer v-if="content" :value="content" />
    </template>
    <template #actions>
      <UFormField class="min-w-72">
        <SearchBox
          v-model="searchTerms"
          :placeholder="[t('person.search.placeholder')]"
        />
      </UFormField>
    </template>
    <template #sort="{ sortOptions, value, change }">
      <div class="flex items-center gap-2">
        <SearchSortSelector
          :options="sortOptions"
          :value="value"
          class="my-4"
          @change="change"
        />
        <UFieldGroup class="hidden sm:flex">
          <UButton
            color="neutral"
            :variant="displayMode === 'list' ? 'subtle' : 'outline'"
            leading-icon="i-mdi-view-list"
            @click="displayMode = 'list'"
          />
          <UButton
            color="neutral"
            :variant="displayMode === 'grid' ? 'subtle' : 'outline'"
            leading-icon="i-mdi-view-grid"
            @click="displayMode = 'grid'"
          />
        </UFieldGroup>
      </div>
    </template>
    <template #hit="{ hit: person, index, total }">
      <PersonHit :variant="displayMode" :person="person" />
    </template>
  </SearchBase>
</template>

<script setup lang="ts">
import type {
  Facet,
  FacetSearchParam,
  FacetSearchResult,
  Person,
} from '~~/models'
const { t } = useI18n()
const route = useRoute()

const { data: content } = await useAsyncData(`community-modules`, () => {
  return queryCollection('docs').path(route.path).first()
})
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
    q: searchTermsDebounced.value,
    query_by: 'name,github_users,company.name',
  }
})
const displayMode = ref<'grid' | 'list'>('grid')
const perPage = 12
const searchTerms = ref('')
const searchTermsDebounced = useDebounce(searchTerms, 500)
const facets: Facet[] = [
  {
    field: 'country.label',
    title: t('person.filters.countries'),
  },
  {
    field: 'roles.name',
    title: t('person.filters.roles'),
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
    results:
      displayMode.value === 'list'
        ? 'flex flex-col gap-3 sm:gap-4'
        : 'gap-3 sm:gap-5',
  }
})
</script>
