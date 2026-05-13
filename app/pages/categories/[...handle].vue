<template>
  <SearchBase
    v-if="category"
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
      <UBreadcrumb :items="breadCrumb" class="mb-6 md:mt-8" />
      <USeparator />
      <UPageSection
        :title="category?.name"
        :description="
          category?.shortDescription ||
          category?.description ||
          t('category.description', { category: category?.name })
        "
      />
    </template>
    <template #actions>
      <UFormField class="min-w-72 max-md:w-full">
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
const categoryService = useService('categories')

const { data: category, error } = await useAsyncData(
  `category-${route.path}`,
  () => categoryService.getByURLKey(route.path),
  {
    watch: [route.path],
  }
)

console.log('category', category.value, error.value)
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
if (category.value == null || error.value) {
  throw createError({
    statusCode: error?.value ? 500 : 404,
    statusMessage: error?.value?.message || t('modules.notFound'),
    fatal: true,
  })
}
const perPage = 12
const searchTerms = ref((route.query?.q as string) || '')
const searchTermsDebounced = refDebounced(searchTerms, 300)
const query = reactive({
  q: searchTerms.value,
  filter_by: `repo.category.url_key:=${category.value.urlKey}`,
  highlight_full_fields:
    'name,techname,repo.category.name,repo.name,summary,description,readme_fragments.usage,authors.name,maintainers.name',
  query_by:
    'name,techname,repo.category.name,repo.name,summary,description,readme_fragments.usage,authors.name,maintainers.name',
  query_by_weights: '10,8,4,3,2,1,1,1,1',
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

const breadCrumb = computed(() => {
  const items = [
    { label: t('nav.modules.title'), to: '/modules', icon: 'module' },
  ]
  if (category.value?.name) {
    items.push({
      icon: 'category',
      label: category.value.name,
      to: `/${category.value.urlKey}`,
    })
  }
  return items
})

useSeoMeta({
  title: t('category.seo.title', { category: category.value?.name }) || '',
  description:
    category.value?.description ||
    t('category.seo.description', { category: category.value?.name }) ||
    '',
  ogTitle: t('category.seo.title', { category: category.value?.name }) || '',
  ogDescription:
    category.value?.description ||
    t('category.seo.description', { category: category.value?.name }) ||
    '',
})
</script>
