<template>
  <div
    v-if="sponsor?.sponsorship?.industries?.length > 0"
    class="relative pt-14 pb-1 md:mt-8 md:pt-32 md:pb-10"
  >
    <div
      class="absolute top-0 left-1/2 -z-10 h-[120%] w-screen -translate-x-1/2 -skew-y-3 transform opacity-5"
      :style="{
        backgroundColor: sponsorLevel?.color || '#FD9182',
      }"
    />
    <h3 class="py-4 text-2xl font-bold text-secondary">
      {{ $t('sponsors.industry.title') }}
    </h3>
    <div class=" ">
      <div class="flex flex-col flex-wrap gap-4 md:flex-row">
        <template
          v-for="industry in sponsor.sponsorship?.industries"
          :key="industry.name"
        >
          <SponsorIndustryCard :industry="industry" />
        </template>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import type { Sponsor, SponsorLevelInfo } from '~~/models'
const props = defineProps<{
  sponsor: Sponsor
  sponsorLevel: SponsorLevelInfo
}>()
</script>
