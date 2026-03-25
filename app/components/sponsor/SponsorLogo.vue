<template>
  <div v-if="sponsorLevel">
    <img
      :src="sponsorLevel.image"
      :alt="sponsorLevel.title"
      :width="imageWidth"
    />
  </div>
</template>
<script lang="ts" setup>
import type { SponsorLevelsCollectionItem } from '@nuxt/content'
const props = defineProps<{
  sponsorLevel: SponsorLevelsCollectionItem
  size?: 'sm' | 'md' | 'lg'
}>()
const widths = {
  sm: 50,
  md: 80,
  lg: 126,
}
const imageWidth = computed(() => {
  return widths[props.size || 'md'] || widths['md']
})
</script>
