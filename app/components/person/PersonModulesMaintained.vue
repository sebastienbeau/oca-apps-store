<template>
  <div v-if="total > 0" class="py-22">
    <slot name="header">
      <ProseH2 class="my-2 text-2xl text-primary md:text-3xl">
        {{ t('person.modulesMaintained.title') }}
        <span class="text-primary">
          {{ names[0] }}
        </span> 
        <span class="text-secondary-500 ml-2">
           {{ names[1] }}
        </span>
      </ProseH2>
    </slot>
    <div class="pb-5">
      <UFormField v-if="total > 1" :label="t('modules.usedBy.globalFilter')">
        <UInput
          v-model="searchQuery"
          :placeholder="t('modules.usedBy.globalFilter')"
          icon="search"
          size="xl"
        />
      </UFormField>
    </div>
    <div v-if="loading" class="flex h-64 items-center justify-center">
      <Spinner />
    </div>
    <div
      v-else-if="dependencies"
      class="grid grid-cols-1 gap-5 lg:grid-cols-2 xl:grid-cols-3"
    >
      <ModuleMicroHit
        v-for="item in dependencies.hits"
        :key="item.urlKey"
        :module-grouped="item"
      />
    </div>
    <div v-if="total > 0 && total > pageSize" class="flex justify-center pt-8">
      <UPagination v-model:page="page" :page-size="pageSize" :total="total" />
    </div>
  </div>
</template>
<script lang="ts" setup>
import type { Person } from '~~/models'

const props = defineProps<{
  person: Person | null
}>()

const names = computed(() => {
  const names = props.person?.name.split(' ') || []
  return [names.slice(0, -1).join(' '), names.slice(-1)[0]]
})

const { start, set } = useLoadingIndicator()
const moduleService = useService('modules')
const searchQuery = ref('')
const page = ref(1)
const total = ref(0)
const loading = ref(false)
const { t } = useI18n()
const pageSize = 9

const { data: dependencies, pending } = await useAsyncData(
  'module-maintained-by-' + (props.person?.id || ''),
  async () => {
    if (!props.person) return null
    console.log('ici')
    return await moduleService.getModulesMaintainedBy(
      props.person,
      searchQuery.value,
      page.value,
      pageSize
    )
  },
  {
    server: false,
    watch: [searchQuery, page, () => props.person?.id],
  }
)

total.value = dependencies.value?.total || 0

watch([searchQuery], () => {
  if (searchQuery.value?.length < 3 && searchQuery.value !== '') {
    dependencies.value = null
    return
  }
  page.value = 1
})
watch(pending, () => {
  if (pending.value) {
    start()
  } else {
    set(100)
  }
})
</script>
