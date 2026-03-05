<template>
  <UCard :ui="{
    root: 'hover:shadow-lg transition-shadow duration-300 ease-in-out cursor-pointer',
    header: 'border-b-0 sm:px-4',
    body: 'py-2 sm:py-3 sm:px-4 border-b-0'
  }" @click="onClick">
    <template #header>
      <div class="flex flex-col justify-between items-start">
        <img :src="company?.logoUrls?.l" alt="Logo" class="h-16 w-auto m-4 ml-0" />
        <div class="flex items-center gap-1 justify-between w-full">
          <div class="text-xl font-semibold flex-1">
            <nuxt-link :to="`/companies/${company.id}`">
              {{ company.name }}
            </nuxt-link>
          </div>
          <div v-if="company.website?.url">
            <UButton variant="link" size="sm" :label="company.website?.label || company?.website?.url" icon="website"
              :to="company.website.url" target="_blank" />
          </div>
        </div>
      </div>
    </template>

    <div class="flex space-x-2">
      <UBadge v-for="(loc, i) in company.countries" :key="i" variant="solid" class="rounded-full" color="primary"
        size="sm">
        {{ loc.label }}
      </UBadge>
    </div>
    <template #footer>
      <div class="grid grid-cols-2 gap-4">
        <div class="flex items-center space-x-1 md:space-x-2">
          <UIcon name="i-heroicons-users" class="text-primary" />
          <span class="text-sm">
            <span class="text-secondary">{{ company.membersCount }}</span>
            Members
          </span>
        </div>
        <div class="flex items-center space-x-1 md:space-x-2">
          <UIcon name="i-heroicons-user-group" class="text-primary" />
          <span class="text-sm">OCA Collaborator index:
            <span class="text-secondary">{{ company.collaboratorIndex }}</span>
          </span>
        </div>
      </div>
    </template>
  </UCard>
</template>

<script setup lang="ts">
import type { Company } from '~~/models';
const props = defineProps<{
  company: Company;
}>();
const onClick = () => {
  navigateTo(`/companies/${props.company.urlKey}`);
};
</script>
