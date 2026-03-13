<template>
  <div v-if="sponsor">
    <SponsorHeroBanner :sponsor="sponsor" />
    <SponsorIndustries
      v-if="sponsorLevel"
      :sponsor="sponsor"
      :sponsor-level="sponsorLevel"
    />
    <SponsorStories
      v-if="sponsor.sponsorship?.stories?.length > 0"
      :sponsor="sponsor"
    />
    <SponsorTestimonial :sponsor="sponsor" />
  </div>
</template>
<script lang="ts" setup>
import type { Sponsor, SponsorLevelInfo } from '~~/models'
const props = defineProps<{
  sponsor: Sponsor
}>()
const { data: sponsorLevels } = await useAsyncData(() => {
  return queryCollection('sponsorLevels').all()
})
const sponsorLevel = computed<SponsorLevelInfo | null>(() => {
  if (sponsorLevels.value) {
    return sponsorLevels.value.find(
      (level: any) =>
        level.name.toLowerCase() === props?.sponsor.sponsorship.level
    )
  }
  return null
})
</script>
