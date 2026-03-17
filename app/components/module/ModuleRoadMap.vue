<template>
  <div
    v-if="module?.readmeFragments?.roadmap"
    class="relative mb-24 pt-12 pb-12 lg:py-16 xl:pt-24 xl:pb-16"
  >
    <ProseH2 class="my-2 text-2xl text-secondary md:text-3xl">
      {{ t('modules.roadmap.title') }}
    </ProseH2>
    <MDC :value="module.readmeFragments.roadmap" />
  </div>
</template>
<script setup lang="ts">
import type { Module } from '~~/models'
const props = defineProps<{
  module: Module | null
}>()
const { t } = useI18n()
</script>
