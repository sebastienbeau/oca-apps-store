<template>
  <div v-if="module?.readmeFragments?.context" class="pb-2">
    <ProseH2 class="mb-1 pb-0 text-2xl text-primary">
      {{ t('modules.context.title') }}
    </ProseH2>
    <MDC :value="module.readmeFragments.context" />
  </div>
</template>
<script setup lang="ts">
import type { Module } from '~~/models'
const props = defineProps<{
  module: Module | null
}>()
const { t } = useI18n()
</script>
