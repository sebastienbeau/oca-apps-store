<template>

  <UPageCard orientation="horizontal" :ui="{
    root: 'ring-0 relative',
    title: 'flex items-start justify-start md:col-span-1 gap-0  md:pb-4 w-full',
    description: 'pt-12 md:pt-6 w-full',
    container: 'lg:grid-cols-3  md:grid-cols-3 ',
    wrapper: 'md:col-span-2 ',
    body: 'w-full',
    header: { base: 'p-0 relative' }
  }">
    <template #title>
      <img :src="sponsorLevelLogo" alt="Logo" class="h-32 w-auto p-1 ml-0 
" />
      <div class="md:max-w-full">
        <h3 v-if="sponsor.name" class="font-bold text-4xl">
          {{ sponsor.name }}
        </h3>
        <div class="flex  flex-col md:flex-row  ml-auto py-4 gap-2">
          <SponsorContact :sponsor="sponsor" />
        </div>
        <div class="pt-4 md:pt-0">
          <UBadge v-if="sponsor.countries && sponsor.countries.length > 0" v-for="(loc, i) in sponsor.countries"
            :key="i" variant="solid" class="rounded-full gap-1" color="primary">
            {{ loc.label }}
          </UBadge>
        </div>

      </div>
    </template>
    <template #description>
      <p v-if="sponsor.description" class="text-sm flex items-center">
        {{ sponsor.description }}
      </p>
    </template>

    <div v-if="sponsor.logo" class="order-first md:order-last pb-8 md:pb-0 ">
      <img :src="sponsor.logo" alt="Logo" class=" w-auto m-4 ml-0" />
    </div>

    <template #footer>
      <div class="flex flex-wrap justify-start gap-2 py-3">
        <SponsorStats :sponsor="sponsor" />
      </div>
    </template>
  </UPageCard>
</template>

<script setup lang="ts">
import type { Sponsor } from '~~/models';
import type { SponsorLevel } from '~~/models';
const props = defineProps<{
  sponsor: Sponsor;

}>();

const sponsorLevelLogo = computed(() => {
  return props.sponsor?.sponsorLevelInfo?.image || '';
});
</script>