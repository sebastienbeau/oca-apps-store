<template>
  <UPageCard
    orientation="horizontal"
    :ui="{
      root: 'ring-0 relative',
      title:
        'flex items-start justify-start md:col-span-1 gap-0  md:pb-4 w-full',
      description: 'pt-12 md:pt-6 w-full',
      container: 'lg:grid-cols-3  md:grid-cols-3 ',
      wrapper: 'md:col-span-2 ',
      body: 'w-full',
      header: { base: 'p-0 relative' },
    }"
  >
    <template #title>
      <img :src="sponsorLevelLogo" alt="Logo" class="ml-0 h-32 w-auto p-1" />
      <div class="md:max-w-full">
        <h3 v-if="sponsor.name" class="text-4xl font-bold">
          {{ sponsor.name }}
        </h3>
        <div class="ml-auto flex flex-col gap-2 py-4 md:flex-row">
          <SponsorContact :sponsor="sponsor" />
        </div>
        <div class="pt-4 md:pt-0">
          <UBadge
            v-if="sponsor.countries && sponsor.countries.length > 0"
            v-for="(loc, i) in sponsor.countries"
            :key="i"
            variant="solid"
            class="gap-1 rounded-full"
            color="primary"
          >
            {{ loc.label }}
          </UBadge>
        </div>
      </div>
    </template>
    <template #description>
      <p v-if="sponsor.description" class="flex items-center text-sm">
        {{ sponsor.description }}
      </p>
    </template>

    <div v-if="sponsor.logo" class="order-first pb-8 md:order-last md:pb-0">
      <img :src="sponsor.logo" alt="Logo" class="m-4 ml-0 w-auto" />
    </div>

    <template #footer>
      <div class="flex flex-wrap justify-start gap-2 py-3">
        <SponsorStats :sponsor="sponsor" />
      </div>
    </template>
  </UPageCard>
</template>

<script setup lang="ts">
import type { Sponsor } from '~~/models'
const props = defineProps<{
  sponsor: Sponsor
}>()

const sponsorLevelLogo = computed(() => {
  return props.sponsor?.logoUrls || ''
})
</script>
