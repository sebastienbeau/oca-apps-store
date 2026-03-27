<template>
  <div v-if="sponsorLevel">
    <nuxt-img
      :src="sponsorLevel.image"
      :alt="sponsorLevel.title"
      :sizes="imageWidth"
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
  sm: '80px',
  md: '96px',
  lg: '126px',
}
const imageWidth = computed(() => {
  return widths[props.size || 'md'] || widths['md']
})
</script>
