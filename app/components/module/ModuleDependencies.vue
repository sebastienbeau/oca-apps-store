<template>
  <div v-if="dependencies && dependencies?.length" class="py-10">
    <slot name="header">
      <ProseH2 class="text-secondary text-2xl md:text-3xl my-2">
        {{ t('modules.dependencies.title') }}
      </ProseH2>
    </slot>
    <div v-if="dependencies" class="my-4 grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
      <ModuleHit v-for="item in dependencies" :key="item.urlKey" :module-grouped="item" class="m-1" />
    </div>
  </div>
</template>
<script lang="ts" setup>
import type { Module } from '~~/models';

const props = defineProps<{
  module: Module | null
}>()
const { t } = useI18n()
const { data: dependencies } = await useAsyncData('module-dependencies-' + (props.module?.id || ''), async () => {
  if (!props.module?.dependencies?.length) return null
  const moduleService = useService('modules')
  return await moduleService.getModuleDependencies(props.module)
}, {
  server: false,
})

</script>