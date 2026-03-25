<template>
  <div>
    <NuxtImg
      :class="sizeClasses"
      :src="module?.iconUrl || '/img/oca_modules_logo_vertical.png'"
      :alt="module?.name"
      loading="lazy"
      fetchpriority="low"
      class="rounded"
    />
  </div>
</template>
<script lang="ts" setup>
import type { Module } from '~~/models'

const props = withDefaults(
  defineProps<{
    module: Module | null
    size?: 'sm' | 'md' | 'lg'
  }>(),
  {
    size: 'md',
  }
)
const sizeClasses = computed(() => {
  switch (props.size) {
    case 'sm':
      return 'max-w-12 h-12'
    case 'md':
      return 'max-w-16 h-16'
    case 'lg':
      return 'max-w-48 h-48'
    default:
      return 'max-w-24 h-24'
  }
})
</script>
