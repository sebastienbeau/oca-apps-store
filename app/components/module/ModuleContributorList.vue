<template>
  <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-x-8 gap-y-4">
    <div v-for="user in contributors" :key="user.name" class="flex justify-between items-start gap-2">
      <UUser :name="user.name" :description="user?.company" :avatar="{
        src: user?.avatar,
        alt: user.name,
      }" size="md">
      </UUser>
      <UButton v-if="user?.email" size="sm" variant="link" icon="i-ph-envelope" :href="`mailto:${user.email}`"
        target="_blank" />
    </div>
    <div class="flex justify-end">
      <UButton v-if="hasMore" variant="solid" size="md"
        :label="t('modules.contributors.showAll', { count: module.contributors.length })" @click="toggleMax" />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Module } from '~~/models';

const props = defineProps<{
  module: Module
}>()
const { t } = useI18n()
const max = ref<number | null>(5)
const contributors = computed(() => {
  if (max.value) {
    return props.module?.contributors?.slice(0, max.value) || []
  }
  return props.module?.contributors || []
})
const toggleMax = () => {
  if (max.value) {
    max.value = null
  } else {
    max.value = 5
  }
}
const hasMore = computed(() => {
  return props.module?.contributors && props.module.contributors.length > 5
})
</script>
