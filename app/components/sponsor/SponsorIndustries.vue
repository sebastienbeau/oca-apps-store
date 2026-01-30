<template>
  <div class="py-14  relative ">
    <div
      class="w-[100vw + 10rem] absolute -left-1/2 -right-1/2 mx-auto top-0 h-[120%] -z-10 -rotate-3 opacity-5 "
      :style="{
        backgroundColor: sponsorLevel?.color || '#FD9182',
      }">
    </div>
    <h3 class="text-secondary font-bold text-2xl py-4">{{ $t('sponsor.industry.title') }} </h3>
    <div class=" ">
      <div class="flex flex-col md:flex-row gap-4 md:max-w-xl">
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