<template>
  <div v-if="sponsor" class="max-md:w-full max-md:max-w-full">
    <CompanyHeroBanner :company="sponsor" class="max-md:w-full max-md:max-w-full">
      <template #left>
        <SponsorLogo
          v-if="sponsorLevel"
          :sponsor-level="sponsorLevel"
          size="md"
          class="min-w-24"
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
import type { Sponsor } from '~~/models'
const props = defineProps<{
  sponsor: Sponsor
}>()
const { data: sponsorLevels } = await useAsyncData(() => {
  return queryCollection('sponsorLevels').all()
})
const { $sponsor } = useNuxtApp()
const sponsorLevel = $sponsor.getSponsorLevel(props.sponsor)
</script>
