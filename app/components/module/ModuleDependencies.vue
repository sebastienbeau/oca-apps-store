<template>
  <div v-if="dependencies && dependencies?.length" class="py-10">
    <slot name="header">
      <ProseH2 class="my-2 text-2xl text-secondary md:text-3xl">
        {{ t('modules.dependencies.title') }}
      </ProseH2>
    </slot>
    <div
      v-if="dependencies"
      class="my-4"
      :class="
        displayMode === 'list'
          ? 'flex flex-col gap-3 sm:gap-4'
          : 'grid grid-cols-1 gap-4 lg:grid-cols-2 xl:grid-cols-3'
      "
    >
      <ModuleHit
        v-for="item in dependencies"
        :key="item.urlKey"
        :module-grouped="item"
        class="m-1"
      />
    </div>
  </div>
</template>
<script lang="ts" setup>
import type { Module } from '~~/models'

const props = defineProps<{
  module: Module | null
}>()
const { t } = useI18n()
const dependenciesList = computed(() => props.module?.dependencies || [])
const { data: dependencies } = await useAsyncData(
  'module-dependencies-' + (props.module?.id || ''),
  async () => {
    if (!props.module?.dependencies?.length) return null
    const moduleService = useService('modules')
    return await moduleService.getModulesList(props.module)
  },
  {
    server: false,
    watch: [dependenciesList],
  }
)
</script>
