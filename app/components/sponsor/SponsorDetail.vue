<template>
  <div v-if="sponsor">
    <CompanyHeroBanner :company="sponsor">
      <template #left>
        <nuxt-img
          v-if="sponsorLevel"
          :src="sponsorLevel.image"
          :alt="sponsorLevel.title"
          class="ml-0 h-40 w-auto p-1"
        />
      </template>
      <template #description>
        <MDC
          v-if="sponsor.sponsorship?.description"
          :value="sponsor.sponsorship.description"
        />
      </template>
    </CompanyHeroBanner>
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
        level.name.toLowerCase() === props?.sponsor.sponsorship.level.name
    )
  }
  return null
})
</script>
