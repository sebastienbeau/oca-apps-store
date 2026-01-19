<template>
  <UPage>
    <template #default>
      <slot name="header">
        <UContainer>
          <UPageHeader class="" />
        </UContainer>
      </slot>
      <div ref="container">
        <UContainer>
          <div class="flex justify-between items-center gap-1">
            <div class="flex-1">
              <SearchFacetsList ref="facetsList" :facets="facets" :results="results" :query-facets="queryFacets"
                class="max-md:my-4" @refine="onChangeFilter" />
            </div>
            <SearchSortSelector :options="sortOptions" :value="sortBy" class="my-4" @change="onSort" />
          </div>
          <USeparator class="mb-4" />
          <div v-if="error" class="mx-auto my-10 max-w-lg">
            <UAlert type="error" color="error" icon="error" variant="outline" orientation="horizontal"
              :title="t('search.error.title')" :description="error?.message ||
                'An error occurred during the search'
                " :actions="[
                  {
                    label: t('search.error.retry'),
                    color: 'neutral',
                    onClick: search,
                  },
                ]" />
          </div>
          <template v-else-if="results.hits.length === 0">
            <div class="text-muted py-10 text-center">
              {{ t('search.noresults') }}
            </div>
          </template>
          <template v-else>
            <div class="pb-3">
              <div class="text-muted text-xs">
                {{
                  t('search.results.count', {
                    count: results.total,
                  })
                }}
              </div>
            </div>
            <SearchProductResult :products="results.hits" :total="results.total" :infinite-scroll="infiniteScroll"
              :per-page="perPage" :page="page" :is-loading="isLoading" @change-page="changePage">
              <template #product-hit="{ product, index, total }">
                <slot name="product-hit" :product="product" :index="index" :total="total" />
              </template>
            </SearchProductResult>
          </template>
          <div v-if="$slots.footer" class="mt-8">
            <slot name="footer" />
          </div>
        </UContainer>
      </div>
    </template>
  </UPage>
</template>

<script lang="ts" setup>
import type { Product, ProductResult } from '~/models'
import type {
  FacetSearchParam,
  FacetSearchResult,
  ProductSearchParams,
} from '~/services/ProductService'
import type { Facet } from './SearchFacetsList.vue'

const props = withDefaults(
  defineProps<{
    facets?: Facet[]
    sortOptions?: { label: string; value: string }[]
    query?: ProductSearchParams | null
    infiniteScroll?: boolean
  }>(),
  {
    facets: () => [],
    sortOptions: () => [],
    query: null,
    infiniteScroll: true,
  }
)

const productServices = useService('products')
const productSearchContainer = useTemplateRef<HTMLDivElement>('container')
const router = useRouter()
const route = useRoute()
const { start, finish } = useLoadingIndicator()
const facetHasChanges = ref(false)
const isLoading = ref(false)
const error = ref(null)
const sortBy = ref(
  route.query.sort ? String(route.query.sort) : props.sortOptions?.[0]?.value
)
const page = ref(route.query.page ? Number(route.query.page) : 1)
const perPage = ref(8)

const { t } = useI18n()

const query = computed(() => {
  return props?.query || {}
})

const queryFacets: { [field: string]: string } = {}
/**
 * Initial search with the current facets from the route only on server side
 */
const res = await useAsyncData<FacetSearchResult>(
  route.fullPath,
  async () => {
    let facetData: FacetSearchParam[] = []
    if (props?.facets && props?.facets?.length > 0) {
      facetData = props?.facets.map((f) => {
        return {
          field: f.field,
          query: queryFacets?.[f.field] || '',
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
    return await productServices.facetSearch(query, facetData)
  },
  {
    watch: [query],
  }
)
const { data } = res

const results = reactive<ProductResult>({
  hits: data?.value?.hits || ([] as Product[]),
  total: data?.value?.found || 0,
  facets: data?.value?.facets || {},
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

    const res: FacetSearchResult = await productServices.facetSearch(
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
    results.total = res?.found || 0
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
  } else if (p > Math.ceil(results.total / perPage.value)) {
    p = Math.ceil(results.total / perPage.value)
  }
  page.value = p
  if (!props.infiniteScroll && productSearchContainer.value) {
    productSearchContainer.value.scrollIntoView({
      behavior: 'smooth',
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
  () => props.query,
  async () => {
    await search()
  }
)
</script>
