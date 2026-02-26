<template>
  <div class="pt-14 pb-1 md:mt-8 md:pt-32 md:pb-10 relative">
    <div class="w-screen absolute left-1/2 transform -translate-x-1/2 top-0 h-[120%] -skew-y-3 -z-10 opacity-5" :style="{
      backgroundColor: sponsorLevel?.color || '#FD9182',
    }">
    </div>
    <h3 class="text-secondary font-bold text-2xl py-4">{{ $t('sponsors.industry.title') }} </h3>
    <div class=" ">
      <div class="flex flex-col flex-wrap md:flex-row gap-4">
        <template v-for="industry in sponsor.industries" :key="industry.id">
          <SponsorIndustryCard :industry="industry" />
        </template>
      </div>
    </div>


  </div>
</template>
<script setup lang="ts">
import type { Sponsor } from '~/models';
import type { SponsorLevel } from '~/models';
const props = defineProps<{
  sponsor: Sponsor;
  sponsorLevel: SponsorLevel;
}>();

</script>