<template>
  <div
    v-if="module?.readmeFragments?.context"
    class="mb-14 flex justify-end py-10 md:mb-20 md:py-16"
  >
    <div class="w-full lg:max-w-[75vw] xl:max-w-[75vw] 2xl:max-w-none">
      <ProseH2 class="my-2 text-2xl text-secondary md:text-3xl">
        {{ t('modules.context.title') }}
      </ProseH2>
      <MDC :value="module.readmeFragments.context" />
    </div>
  </div>
</template>
<script setup lang="ts">
import type { Module } from '~~/models'
const props = defineProps<{
  module: Module | null
}>()
const { t } = useI18n()
</script>
