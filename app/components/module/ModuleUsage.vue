<template>
  <div v-if="module?.readmeFragments?.usage" class="relative flex justify-end py-10 md:py-16 mb-14 md:mb-20">
    <div style="background-image: url(/logo-bg.png); "
      class="hidden md:block w-screen absolute bg-no-repeat bg-bottom-left max-lg:bg-size-[150px] opacity-20 left-1/2 transform -translate-x-1/2 h-[130%] top-0 -z-10" />

    <div class="w-full md:max-w-[85vw] lg:max-w-[70vw] xl:max-w-[75vw] 2xl:max-w-none">
      <ProseH2 class="text-secondary text-2xl md:text-3xl my-2">
        {{ t('modules.usage.title') }}
      </ProseH2>
      <ProseP v-html="module?.readmeFragments?.usage" class="pt-3 prose" />
      <div class="text-right">
        <ModuleRunboat :module="module" size="lg" />
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import type { Module } from '~~/models';
const props = defineProps<{
  module: Module | null
}>()
const { t } = useI18n()
</script>