<template>
  <UPage>
    <template #default>
      <slot name="header">
        <UPageHeader class="" />
      </slot>
      <div ref="container" class="scroll-mt-20 pb-32">
        <div
          class="flex flex-col items-end justify-between gap-2 pb-5 md:flex-row md:items-center"
        >
          <slot name="actions"></slot>
          <div class="flex flex-1 items-center gap-2">
            <div class="flex-1">
              <slot
                name="facets"
                :onChangeFilter="onChangeFilter"
                :facets="facets"
                :results="results"
                :query-facets="queryFacets"
              >
                <SearchFacetsList
                  ref="facetsList"
                  :facets="facets"
                  :results="results"
                  :query-facets="queryFacets"
                  class=""
                  @refine="onChangeFilter"
                  @search-in-facet="onSearchInFacet"
                />
              </slot>
            </div>
            <slot
              name="sort"
              :sort-options="sortOptions"
              :value="sortBy"
              :change="onSort"
            >
              <SearchSortSelector
                :options="sortOptions"
                :value="sortBy"
                class="my-4"
                @change="onSort"
              />
            </slot>
          </div>
        </div>
        <div v-if="error" class="mx-auto my-10 max-w-lg">
          <UAlert
            type="error"
            color="error"
            icon="error"
            variant="outline"
            orientation="horizontal"
            :title="t('search.error.title')"
            :description="
              error?.message || 'An error occurred during the search'
            "
            :actions="[
              {
                label: t('search.error.retry'),
                color: 'neutral',
                onClick: search,
              },
            ]"
          />
        </div>
        <template v-else-if="!isLoading && results.hits.length === 0">
          <slot name="empty">
            <div class="py-10 text-center text-muted">
              {{ t('search.noresults') }}
            </div>
          </slot>
        </template>
        <template v-else>
          <div class="pb-3">
            <div class="text-xs text-muted">
              {{
                t('search.results.count', {
                  count: results.found,
                })
              }}
            </div>
          </div>
          <slot
            name="results"
            :per-page="perPage"
            :results="results"
            :is-loading="isLoading"
            :total="results.found"
            :infinite-scroll="infiniteScroll"
          >
            <SearchResult
              v-model:page="page"
              v-model:per-page="perPage"
              :hits="results.hits"
              :total="results.found"
              :infinite-scroll="infiniteScroll"
              :is-loading="isLoading"
              :ui="{
                root: ui?.results,
              }"
            >
              <template #hit="{ hit, index, total }">
                <slot name="hit" :hit="hit" :index="index" :total="total" />
              </template>
            </SearchResult>
          </slot>
        </template>
        <div v-if="$slots.footer" class="mt-8">
          <slot name="footer" />
        </div>
      </div>
    </template>
  </UPage>
</template>

<script lang="ts" setup generic="T">
import type { Facet, FacetSearchParam, FacetSearchResult } from '~~/models'

const props = withDefaults(
  defineProps<{
    facets?: Facet[]
    sortOptions?: { label: string; value: string }[]
    query?: object | null
    infiniteScroll?: boolean
    searchFunction?: (
      query: any,
      facets: FacetSearchParam[]
    ) => Promise<FacetSearchResult<T>>
    ui?: {
      results?: string
    }
  }>(),
  {
    facets: () => [],
    sortOptions: () => [],
    query: null,
    infiniteScroll: true,
  }
)
const perPageCookie = useCookie('search_per_page')
const { t } = useI18n()
let initFacetCount = 0
const searchContainer = useTemplateRef<HTMLDivElement>('container')
const router = useRouter()
const route = useRoute()
const { start, finish } = useLoadingIndicator()
const facetHasChanges = ref(false)
const isLoading = ref(false)
const error = ref(null)
const perPage = defineModel('perPage', {
  type: Number,
  required: false,
})
if (perPageCookie?.value) {
  perPage.value = Number(perPageCookie.value)
}
const page = defineModel('page', {
  type: Number,
  required: false,
})

const sortBy = defineModel('sortBy', {
  type: String,
  required: false,
})
if (!page.value) {
  page.value = route.query.page ? Number(route.query.page) : 1
}
if (!sortBy.value) {
  const querySort = route.query.sort
    ? String(route.query.sort)
    : props.sortOptions?.[0]?.value
  sortBy.value =
    props.sortOptions?.find((o) => o.value === querySort)?.value ||
    props.sortOptions?.[0]?.value ||
    ''
}
const query = computed(() => {
  return props?.query || {}
})
const searchInFacet: { [field: string]: string } = {}
const queryFacets: { [field: string]: string } = {}

const hasFacetQuery = props.facets?.some((facet) => {
  const routeFacet = route.query?.[facet.field]
  return !!routeFacet
})

/**
 * Initial search with the current facets from the route only on server side
 */
const res = await useAsyncData<FacetSearchResult<T>>(
  async () => {
    /**
     * check if there is any facet query in the route,
     * if not, do not perform the search as it will
     * be performed on mounted with the correct
     * facet queries after all facets are initialized
     */
    if (hasFacetQuery) {
      return null
    }
    let facetData: FacetSearchParam[] = []
    if (props?.facets && props?.facets?.length > 0) {
      facetData = props?.facets.map((f) => {
        return {
          field: f.field,
          query: queryFacets?.[f.field] || '',
          searchTerm: searchInFacet?.[f.field] || undefined,
          sortBy: f.sortBy,
          perPage: f.perPage || 12,
        }
      })
    }

    let query = {
      query_by: 'name',
      q: '*',
      ...(props?.query || {}),
      page: page.value,
      per_page: perPage.value,
      sort_by: sortBy.value,
    }

    if (props.infiniteScroll) {
      query.page = 1
      query.per_page = perPage.value * page.value
    }
    return await props.searchFunction?.(query, facetData)
  },
  {
    watch: [query],
  }
)
const { data } = res
if (hasFacetQuery) {
  /* 
    If there is a facet query in the route, we need to perform the search on mounted
    after all facets are initialized with the values from the route
  */
  isLoading.value = true
}
const results = reactive<FacetSearchResult<T>>({
  hits: data?.value?.hits || ([] as T[]),
  found: data?.value?.found || 0,
  facets: data?.value?.facets || [],
})
/**
 * Perform the search with the current facets
 */
const search = async () => {
  isLoading.value = true
  error.value = null
  try {
    start({ force: true })
    if (facetHasChanges.value && page.value !== 1) {
      page.value = 1
      router.push({
        query: {
          ...route.query,
          page: '1',
        },
      })
    }

    const facetData: FacetSearchParam[] =
      props.facets.map((f) => {
        return {
          field: f.field,
          query: queryFacets?.[f.field] || '',
          searchTerm: searchInFacet?.[f.field] || undefined,
          sortBy: f.sortBy,
          perPage: f?.perPage || 10,
        }
      }) || []

    const defaultQuery = {
      query_by: 'name',
      per_page: perPage.value,
      q: '*',
    }

    const query = {
      ...defaultQuery,
      ...(props?.query || {}),
    }
    const res: FacetSearchResult<T> = await props.searchFunction?.(
      {
        ...query,
        sort_by: sortBy.value,
        page: page.value,
      },
      facetData
    )
    if (props.infiniteScroll && !facetHasChanges.value) {
      results.hits = [
        ...results.hits.slice(0, perPage.value * (page.value - 1)),
        ...(res?.hits || []),
      ]
    } else {
      results.hits = res?.hits || []
    }
    results.facets = res?.facets || []
    results.found = res?.found || 0
  } catch (err) {
    console.error(err)
    error.value = err
  } finally {
    facetHasChanges.value = false
    isLoading.value = false
    finish()
  }
}

/**
 * Refine the search with the given facet and value
 */
const onChangeFilter = async (facetName: string, query: string) => {
  facetHasChanges.value = true
  queryFacets[facetName] = query

  await search()
}

const onSearchInFacet = async (facetName: string, query: string) => {
  facetHasChanges.value = true
  searchInFacet[facetName] = query
  await search()
}

/**
 *
 * @param value
 */
const onSort = async (value: string) => {
  sortBy.value = value
  router.replace({
    query: {
      ...route.query,
      sort: sortBy.value,
    },
  })
  await search()
}

const changePage = async (p: number) => {
  if (p < 1) {
    p = 1
  } else if (p > Math.ceil(results.found / perPage.value)) {
    p = Math.ceil(results.found / perPage.value)
  }
  page.value = p
  if (!props.infiniteScroll && searchContainer.value) {
    searchContainer.value.scrollIntoView({
      behavior: 'instant',
      block: 'start',
    })
  }

  router.replace({
    query: {
      ...route.query,
      page: page.value.toString(),
    },
  })
  await search()
}

onMounted(async () => {
  if (data?.value) {
    return
  }
  await search()
})

watch(
  () => [props.query, perPage.value],
  async () => {
    if (perPage.value) {
      perPageCookie.value = perPage.value.toString()
    }
    await search()
  }
)

watch(
  () => page.value,
  async (newValue, oldValue) => {
    if (newValue !== oldValue && newValue) {
      changePage(newValue)
    }
  }
)

watch(
  () => sortBy.value,
  async (newValue, oldValue) => {
    if (newValue !== oldValue && newValue) {
      onSort(newValue)
    }
  }
)
const initFacet = (field: string, query: string) => {
  if (query) {
    queryFacets[field] = query
  }
  initFacetCount++
  // Automatically search when all facets are initialized with the values from the route
  if (initFacetCount >= (props.facets?.length || 0) && hasFacetQuery) {
    search()
  }
}
provide('init-facet', initFacet)
</script>
