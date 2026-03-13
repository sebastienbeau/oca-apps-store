<template>
  <div v-if="total" class="py-10">
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
      class="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
    >
      <ModuleMicroHit
        v-for="item in dependencies.hits"
        :key="item.urlKey"
        :module-grouped="item"
      />
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

const { data: dependencies } = await useAsyncData(
  'module-used-by-' + (props.module?.id || ''),
  async () => {
    if (!props.module?.dependencies?.length) return null

    return await moduleService.getModuleUsedBy(
      props.module,
      searchQuery.value,
      page.value
    )
  },
  {
    server: false,
  }
)
total.value = dependencies.value?.total || 0
const search = async () => {
  try {
    loading.value = true
    dependencies.value = await moduleService.getModuleUsedBy(
      props.module,
      searchQuery.value,
      page.value
    )
  } catch (error) {
    console.error('Error searching modules:', error)
  } finally {
    loading.value = false
  }
}
watch([searchQuery], () => {
  if (searchQuery.value?.length < 3 && searchQuery.value !== '') {
    dependencies.value = null
    return
  }
  page.value = 1
  search()
})
watch(loading, () => {
  if (loading.value) {
    start()
  } else {
    set(100)
  }
})
watch([() => props.module?.version], () => {
  search()
})
</script>
