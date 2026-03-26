<template>
  <div v-if="total > 0" class="py-10">
    <slot name="header">
      <ProseH2 class="my-2 text-2xl text-primary md:text-3xl">
        {{ t('modules.usedBy.title') }}
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
import type { Module } from '~~/models'

const props = defineProps<{
  module: Module | null
}>()
const { start, set } = useLoadingIndicator()
const moduleService = useService('modules')
const searchQuery = ref('')
const page = ref(1)
const total = ref(0)
const loading = ref(false)
const { t } = useI18n()
const pageSize = 9

const { data: dependencies, pending } = await useAsyncData(
  'module-used-by-' + (props.module?.id || ''),
  async () => {
    if (!props.module) return null

    return await moduleService.getModuleUsedBy(
      props.module,
      searchQuery.value,
      page.value,
      pageSize
    )
  },
  {
    server: false,
    watch: [searchQuery, page, () => props.module?.id],
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
