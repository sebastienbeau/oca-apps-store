<!-- ~/components/sponsorHit.vue -->
<template>
  <UCard :ui="{
    root: isClickable ? 'hover:shadow-lg transition-shadow duration-300 ease-in-out cursor-pointer' : '',
    header: 'border-b-0 sm:px-4',
    body: 'py-2 sm:py-3 sm:px-4 border-b-0'
  }" @click="onClick">
    <template #header>
      <div class="flex flex-col justify-between items-start">
        <img :src="sponsor.logo" alt="Logo" class="h-16 w-auto m-4 ml-0" />
        <div class="flex items-center gap-1 justify-between w-full">
          <div class="text-xl font-semibold flex-1">
            <nuxt-link v-if="isClickable" :to="`/sponsor/${sponsor.id}`"">
              {{ sponsor.name }}
            </nuxt-link>
            <span v-else>{{ sponsor.name }}</span>
          </div>
          <div>
            <UButton variant=" link" size="sm" :label="sponsor.websiteLabel" icon="website" :to="sponsor.website"
              target="_blank" />
          </div>
        </div>
      </div>
    </template>

    <div class="flex space-x-2">
      <UBadge v-for="(loc, i) in sponsor.countries" :key="i" variant="solid" class="rounded-full" color="primary"
        size="sm">
        {{ loc.label }}
      </UBadge>
    </div>

    <p class="mt-4 text-muted text-sm" v-html="sponsor.shortDescription" />

    <template #footer>
      <div class="grid grid-cols-2 gap-4">
        <div class="flex items-center space-x-1 md:space-x-2">
          <UIcon name="i-heroicons-users" class="text-primary" />
          <span class="text-sm">
            <span class="text-secondary">{{ sponsor.members }}</span>
            Members
          </span>
        </div>
        <div class="flex items-center space-x-1 md:space-x-2">
          <UIcon name="i-heroicons-user-group" class="text-primary" />
          <span class="text-sm">OCA Collaborator index:
            <span class="text-secondary">{{ sponsor.collaboratorIndex }}</span>
          </span>
        </div>
        <div v-if="sponsor?.collaborators?.length > 0" class="flex items-center space-x-1 md:space-x-2">
          <UIcon name="i-heroicons-code-bracket" class="text-primary" />
          <span class="text-sm">
            <span class="text-secondary">{{ sponsor.collaborators?.length }} </span>
            Contributors
          </span>
        </div>
        <div v-if="sponsor?.industries?.length > 0" class="flex items-center space-x-1 md:space-x-2">
          <UIcon name="i-heroicons-building-office" class="text-primary" />
          <span class="text-sm">
            <span class="text-secondary">{{ sponsor?.industries?.length }}</span> Industries
          </span>
        </div>
      </div>
    </template>
  </UCard>
</template>

<script setup lang="ts">
import type { Sponsor } from '~/models';
const props = defineProps<{
  sponsor: Sponsor;
}>();
const isClickable = computed(() => {
  const levelWithpage = [1, 2, 3];
  return levelWithpage.includes(props.sponsor.sponsorLevel.id);
});

const onClick = () => {
  if (isClickable.value) {
    navigateTo(`/sponsor/${props.sponsor.id}`);
  }
};
</script>
