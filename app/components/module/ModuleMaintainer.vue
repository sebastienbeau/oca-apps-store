<template>
  <div class="relative pt-12 pb-12 mb-24 lg:py-16 xl:pt-24 xl:pb-16">
    <div class="w-screen absolute left-1/2 transform -translate-x-1/2 -top-10 h-[120%] -skew-y-3 -z-10 bg-muted " />
    <ProseH2 class="text-2xl md:text-3xl my-2">
      {{ t('modules.maintainer.title') }}
    </ProseH2>
    {{ module?.maintainer }}
    <ProseP v-html="module?.maintainer" class="pt-3 prose" />
    <div class="flex gap-2 py-2">

    </div>
  </div>
</template>
<script lang="ts" setup>
import type { Module } from '~~/models';
const { t } = useI18n()
const props = defineProps<{
  module: Module | null
}>()

</script>