<template>
  <div class="">

    <div v-if="module" class="relative py-16 lg:py-20 xl:py-24 -mt-15">
      <div
        class="w-screen absolute left-1/2 transform -translate-x-1/2 h-full top-0 -z-[5] bg-primary-500 bg-linear-to-r from-primary-500 via-primary-600  to-secondary-900/50  overflow-hidden">
        <UIcon name="i-solar-bug-bold"
          class="hidden absolute -right-20 top-5 xl:right-10 xl:top-10 2xl:right-20 2xl:top-10 md:flex size-64 text-white opacity-15 -rotate-45 border" />
      </div>
      <div class="flex gap-16 items-center md:px-10 relative ">
        <div class="w-full md:w-10/12">
          <ProseH2 class="text-secondary text-2xl md:text-3xl my-2">
            {{ t('modules.bugTracker.title') }}
          </ProseH2>
          <ProseP v-html="module.bugTracker.instructions" class="pt-3 text-white prose" />
          <div class="flex justify-end py-3">
            <UButton v-if="module?.bugTracker?.url" :href="module.bugTracker.url" variant="solid" size="lg"
              color="secondary" target="_blank" class="mt-4" :label="t('modules.bugTracker.goTo')" />
          </div>
        </div>

      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import type { Module } from '~~/models';

const props = defineProps<{
  module: Module | null
}>()

const { t } = useI18n()
</script>