<template>
  <div class="py-10">
    <slot name="header">
      <ProseH2 class="text-primary text-2xl md:text-3xl my-2">
        {{ t('modules.usedBy.title') }}
      </ProseH2>
    </slot>
    <UCard class="my-4 ring-0">

      <template #header>
        <UFormField :label="t('modules.usedBy.globalFilter')">
          <UInput v-model="searchQuery" :placeholder="t('modules.usedBy.globalFilter')" icon="search" size="xl" />
        </UFormField>
      </template>
      <div v-if="loading" class="h-64 flex justify-center items-center">
        <Spinner />
      </div>
      <div v-else-if="dependencies">
        <ModuleMicroHit v-for="item in dependencies.hits" :key="item.urlKey" :module-grouped="item" class="m-1" />
      </div>
    </UCard>
  </div>
</template>
<script lang="ts" setup>
import type { header } from '#build/ui';
import type { Module } from '~~/models';

const props = defineProps<{
  module: Module | null
}>()
const { start, set } = useLoadingIndicator()
const moduleService = useService('modules')
const searchQuery = ref('')
const page = ref(1)
const loading = ref(false)
const { t } = useI18n()

const { data: dependencies } = await useAsyncData('module-used-by-' + (props.module?.id || ''), async () => {
  if (!props.module?.dependencies?.length) return null

  return await moduleService.getModuleUsedBy(props.module, searchQuery.value, page.value)
}, {
  server: false,
})
const search = async () => {
  try {
    loading.value = true
    dependencies.value = await moduleService.getModuleUsedBy(props.module, searchQuery.value, page.value)
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
</script>