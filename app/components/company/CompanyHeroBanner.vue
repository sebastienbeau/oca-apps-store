<template>
  <UPageCard
    v-if="company"
    orientation="horizontal"
    :ui="{
      root: 'ring-0 relative',
      title:
        'flex items-start justify-start md:col-span-1 gap-0  md:pb-4 w-full',
      description: 'pt-12 md:pt-6 w-full',
      container: 'lg:grid-cols-3  md:grid-cols-3 ',
      wrapper: 'md:col-span-2 ',
      body: 'w-full',
      header: 'p-0 relative',
    }"
  >
    <template #title>
      <div class="md:max-w-full">
        <ProseH3 v-if="company?.name" class="text-4xl font-bold">
          {{ company.name }}
        </ProseH3>
        <div
          v-if="company.countries && company.countries.length > 0"
          class="pt-4 md:pt-0"
        >
          <UBadge
            v-for="(loc, i) in company.countries"
            :key="i"
            variant="solid"
            class="gap-1 rounded-full"
            color="primary"
            :label="loc.label"
          />
        </div>
      </div>
    </template>
    <slot name="description" />
    <div
      v-if="company?.logoUrls?.l"
      class="order-first pb-8 md:order-last md:pb-0"
    >
      <nuxt-img
        :src="company.logoUrls?.l"
        :alt="company.logoUrls?.alt"
        class="m-4 ml-0 w-auto"
      />
    </div>
  </UPageCard>
</template>

<script setup lang="ts">
import type { Company } from '~~/models'
const props = defineProps<{
  company: Company
}>()
</script>
