<template>
  <UButton v-if="module && module?.runboatURL" variant="solid" color="secondary" :href="module?.runboatURL"
    :size="size">
    <UIcon name="runboat" />
    {{ t('modules.runboat.try') }}
    <span class="font-bold">
      {{ t('modules.runboat.name') }}
    </span>
  </UButton>
</template>
<script setup lang="ts">
import type { Module } from '~~/models';
const props = withDefaults(defineProps<{
  module: Module | null
  size?: 'sm' | 'md' | 'lg'
}>(), {
  size: 'md'
})
const { t } = useI18n()
</script>