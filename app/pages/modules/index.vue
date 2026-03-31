<template>
  <SearchBase
    v-model:sort-by="sortBy"
    :query="query"
    :facets="facets"
    :sort-options="sortOptions"
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
          :placeholder="[
            t('modules.search.placeholder1'),
            t('modules.search.placeholder2'),
            t('modules.search.placeholder3'),
          ]"
        />
      </UFormField>
    </template>
    <template #sort="{ sortOptions, value }">
      <div class="flex items-center gap-2">
        <SearchSortSelector
          :options="sortOptions"
          v-model="sortBy"
          class="md:my-4"
        />
        <SearchDisplayToggle v-model="displayMode" />
      </div>
    </template>
    <template #hit="{ hit }">
      <ModuleHit :variant="displayMode" :module-grouped="hit" />
    </template>
    <template #loading>
      <ModuleHitSkeleton v-for="n in perPage" :key="n" :variant="displayMode" />
    </template>
    <template #empty>
      <div>
        <UEmpty
          variant="naked"
          icon="module"
          class="mb-24"
          :title="t('modules.empty.title')"
          :description="t('modules.empty.description')"
        />
      </div>
    </template>
  </SearchBase>
</template>

<script setup lang="ts">
import type {
  ModuleGroupedHit,
  Facet,
  FacetSearchParam,
  FacetSearchResult,
} from '~~/models'
const { t } = useI18n()
const route = useRoute()
const router = useRouter()
const { data: content } = await useAsyncData(`content-modules`, () => {
  return queryCollection('docs').path(route.path).first()
})

const moduleService = useService('modules')
const sortOptions = computed(() => {
  return [
    { label: t('modules.sort.name_asc'), value: 'name:asc' },
    { label: t('modules.sort.name_desc'), value: 'name:desc' },
  ]
})
const sortBy = ref('name:asc')
const displayMode = useCookie<'grid' | 'list'>('modules_display_mode', {
  default: () => 'grid',
})
const perPage = 12
const searchTerms = ref((route.query?.q as string) || '')
const searchTermsDebounced = refDebounced(searchTerms, 300)
const query = reactive({
  q: searchTerms.value,
  highlight_full_fields:
    'name,techname,repo.category.name,repo.name,summary,description,readme_fragments.usage',
  query_by:
    'name,techname,repo.category.name,repo.name,summary,description,readme_fragments.usage',
  query_by_weights: '10,8,4,3,2,1,1',
})

const facets: Facet[] = [
  {
    field: 'serie',
    title: t('modules.filters.versions'),
    sortBy: '_alpha:desc',
    routeParam: 'version',
    searchable: true,
  },
  {
    field: 'repo.category.name',
    title: t('modules.filters.category'),
    routeParam: 'category',
    sortBy: '_alpha:asc',
    searchable: true,
  },
  {
    field: 'repo.name',
    title: t('modules.filters.repository'),
    sortBy: '_alpha:asc',
    routeParam: 'repository',
    searchable: true,
  },
]
const searchFunction = async (
  query: any,
  facets: FacetSearchParam[]
): Promise<FacetSearchResult<ModuleGroupedHit>> => {
  const res = await moduleService.facetSearch(query, facets)

  return res
}

const ui = computed(() => {
  return {
    root: 'pb-6',
    results:
      displayMode.value === 'list'
        ? 'flex flex-col gap-3 sm:gap-4'
        : 'gap-3 sm:gap-5 sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3',
  }
})

watch(
  () => searchTermsDebounced.value,
  () => {
    router.push({
      query: {
        ...route.query,
        q: searchTermsDebounced.value || undefined,
      },
    })
    query.q = searchTermsDebounced.value
  }
)
</script>
