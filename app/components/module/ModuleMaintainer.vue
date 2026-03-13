<template>
  <div class="relative mb-24 pt-12 pb-12 lg:py-16 xl:pt-24 xl:pb-16">
    <div
      class="absolute -top-10 left-1/2 -z-10 h-[120%] w-screen -translate-x-1/2 -skew-y-3 transform bg-muted"
    />
    <ProseH2 class="my-2 text-2xl md:text-3xl">
      {{ t('modules.maintainer.title') }}
    </ProseH2>

    {{ module?.maintainer }}
    <div class="flex gap-2 py-2"></div>
  </div>
</template>
<script lang="ts" setup>
import type { Module } from '~~/models'
const { t } = useI18n()
const props = defineProps<{
  module: Module | null
}>()
</script>
