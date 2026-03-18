<template>
  <UPageCard
    v-if="company"
    orientation="horizontal"
    :ui="{
      root: 'ring-0 relative',
      title:
        'flex items-start justify-start md:col-span-1 gap-0  md:pb-4 w-full font-normal',
      description: 'w-full',
      container: 'lg:grid-cols-3  md:grid-cols-3 ',
      wrapper: 'md:col-span-2 ',
      body: 'w-full',
      header: 'p-0 relative',
    }"
  >
    <template #title>
      <slot name="left" />
      <div class="md:max-w-full">
        <ProseH1
          v-if="company?.name"
          class="mb-0 pt-2 text-5xl font-bold text-primary uppercase"
        >
          {{ company.name }}
        </ProseH1>
        <CompanyContact :company="company" />
        <div
          v-if="company.countries && company.countries.length > 0"
          class="flex items-start gap-3 pt-4 md:pt-0"
        >
          <UBadge
            v-for="(loc, i) in company.countries"
            :key="i"
            variant="solid"
            class="gap-1 rounded-full"
            color="primary"
            size="lg"
            :label="loc.label"
          />
        </div>
      </div>
    </template>
    <template #description>
      <slot name="description" />
    </template>
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
    <template #footer>
      <div class="flex flex-wrap justify-start gap-2 py-3">
        <CompanyStats :company="company" />
      </div>
    </template>
  </UPageCard>
</template>

<script setup lang="ts">
import type { Company } from '~~/models'
const props = defineProps<{
  company: Company
}>()
</script>
