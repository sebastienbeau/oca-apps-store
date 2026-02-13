<template>
  <SponsorHeroBanner v-if="sponsor" :sponsor="sponsor" />
  <SponsorIndustries v-if="sponsor && sponsor.industries?.length > 0" :sponsor="sponsor" />
  <SponsorStories v-if="sponsor && sponsor.stories?.length > 0" :sponsor="sponsor" />
  <SponsorTestimonial v-if="sponsor" :sponsor="sponsor" />

</template>

<script lang="ts" setup>

import type { Sponsor, SponsorLevelInfo } from '~/models';
const sponsorService = useService('sponsors')
const route = useRoute()

const sponsor = ref<Sponsor | null>(null);

const urlParams = useRoute().params;


const getSponsor = async () => {
  const res = await sponsorService.getSponsorById({}, urlParams.handle?.[0] as string)
  return res
}

const { data } = await useAsyncData<Sponsor>(
  `sponsor-${route.fullPath}`,
  getSponsor, {
  watch: [route]
}
)
if (data.value) {
  sponsor.value = data.value
}
sponsor.value = data.value || null;


const { data: sponsorLevels } = await useAsyncData(() => {
  return queryCollection('sponsorLevels').all()
})
const sponsorLevel = computed(() => {
  if (sponsor.value && sponsorLevels.value) {
    return sponsorLevels.value.find((level: any) => level.name.toLowerCase() === sponsor.value?.sponsorLevel.name)
  }
  return null
})

if (sponsor.value && sponsorLevel.value) {
  sponsor.value = {
    ...sponsor.value,
    sponsorLevelInfo: sponsorLevel.value as SponsorLevelInfo
  }
};

</script>