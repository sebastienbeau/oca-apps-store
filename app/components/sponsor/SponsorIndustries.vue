<template>
  <div
    v-if="sponsor?.sponsorship?.industries?.length > 0"
    class="relative pt-14 pb-1 md:mt-8 md:pt-32 md:pb-10"
  >
    <div
      class="absolute top-0 left-1/2 -z-10 h-[120%] w-screen -translate-x-1/2 -skew-y-3 transform opacity-15"
      :style="{
        backgroundColor: sponsorLevel?.color || '#FD9182',
      }"
    />
    <ProseH2 class="py-4 text-2xl font-bold text-secondary">
      {{ $t('sponsors.industry.title') }}
    </ProseH2>
    <div class=" ">
      <div class="grid gap-4 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3">
        <SponsorIndustryCard
          v-for="industry in sponsor.sponsorship?.industries"
          :key="industry.name"
          :industry="industry"
          :style="{
            backgroundColor: sponsorLevel?.color + '12' || '#FD918220',
          }"
        />
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
