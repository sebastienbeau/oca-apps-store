<template>
  <div v-if="module?.readmeFragments?.install" class="">
    <ProseH2 class="text-secondary text-2xl md:text-3xl my-2">
      {{ t('modules.install.title') }}
    </ProseH2>
    <ProseP v-html="module.readmeFragments.install" class="pt-3 prose" />
  </div>
</template>
<script lang="ts" setup>
import type { Module } from '~~/models'
const { t } = useI18n()
const props = defineProps<{
  module: Module | null
}>()
</script>
