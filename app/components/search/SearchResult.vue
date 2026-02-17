<template>
  <UPageGrid :class="ui?.root">
    <template v-if="!isLoading || infiniteScroll">
      <template v-for="(hit, index) in hits" :key="hit.id">
        <div v-if="infiniteScroll && index % perPage === 0" ref="pageDelimiter" class="col-span-full"
          :data-page="index / perPage" />
        <slot name="hit" :hit="hit" :index="index" :total="total">

        </slot>
      </template>
    </template>
    <template v-if="isLoading">
      <slot name="loading">
        <UCard v-for="n in perPage" :key="n" :field="n" :ui="{ header: 'p-0 sm:p-0 h-64 sm:h-48 md:h-64' }">
          <template #header>
            <USkeleton class="h-64 sm:h-48 md:h-64 w-full" />
          </template>
          <div class="grid gap-2">
            <USkeleton class="h-4 w-[250px]" />
            <USkeleton class="h-4 w-[200px]" />
          </div>
        </UCard>
      </slot>
    </template>
  </UPageGrid>
  <div ref="paginationElement" class="flex justify-center mt-4">
    <UPagination v-if="!infiniteScroll && total > perPage" :default-page="page" :per-page="perPage" :total="total"
      @update:page="changePage" />
  </div>
</template>

<script lang="ts" setup generic="T">
interface Props {
  hits?: T[]
  total?: number
  infiniteScroll?: boolean
  isLoading?: boolean
  perPage?: number
  page?: number
  ui?: {
    root?: string
  }
}
const props = withDefaults(defineProps<Props>(), {
  hits: () => [],
  total: () => 0,
  infiniteScroll: () => true,
  isLoading: () => false,
  perPage: () => 12,
  page: () => 1,
})
const emits = defineEmits<{
  (e: 'change-page', page: number): void
}>()

const router = useRouter()
const route = useRoute()
const pageDelimiter = useTemplateRef<HTMLElement[]>('pageDelimiter')
const paginationElement = useTemplateRef<HTMLElement>('paginationElement')
let observer: IntersectionObserver | null = null

const setInfiniteScroll = () => {
  useInfiniteScroll(
    paginationElement,
    async () => {
      await changePage(props.page + 1)
    },
    {
      distance: 100,
      canLoadMore: () => {
        return props.hits.length < props.total
      },
    },
  )
}

const setIntersectionObserver = () => {
  if (observer) {
    observer.disconnect()
  }
  observer = new IntersectionObserver(
    (entries) => {
      if (entries?.[0]?.isIntersecting) {
        const { target } = entries[0]
        const targetPage = target.getAttribute('data-page') || '0'
        router.push({
          query: {
            ...route.query,
            page: (parseInt(targetPage) + 1).toString(),
          },
        })
      }
    },
    { threshold: 1.0 }, // Déclenche quand la sentinelle est visible à 100%
  )

  for (const elem of pageDelimiter.value || []) {
    observer.observe(elem)
  }
}

const changePage = async (p: number) => {
  emits('change-page', p)
}

onMounted(async () => {
  if (props.infiniteScroll) {
    setInfiniteScroll()
    setIntersectionObserver()
  }
})

onBeforeUnmount(() => {
  if (observer) {
    observer.disconnect()
  }
})

watch(
  () => props.hits,
  (newVal, oldVal) => {
    if (
      props.infiniteScroll
      && newVal?.length
      && newVal.length > (oldVal?.length || 0)
    ) {
      setIntersectionObserver()
    }
  },
)
</script>
