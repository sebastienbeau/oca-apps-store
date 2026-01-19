<!-- ~/components/sponsorHit.vue -->
<template>
  <UCard class="max-w-xl">
    <template #header>
      <div class="flex flex-col justify-between items-start ml-0 m-4">
        <img :src="sponsor.logo" alt="Logo" class="h-16 w-auto m-4 ml-0" />
        <div class="text-right ">
          <h2 class="text-xl font-bold">{{ sponsor.name }}</h2>
        </div>
      </div>
    </template>

    <div class="flex space-x-2">
      <UBadge v-for="(loc, i) in sponsor.locations" :key="i" variant="solid" class="rounded-full" color="primary">
        {{ loc }}
      </UBadge>
    </div>

    <p class="mt-4 text-gray-700">
      {{ sponsor.description }}
    </p>

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
        <div class="flex items-center space-x-1 md:space-x-2">
          <UIcon name="i-heroicons-code-bracket" class="text-primary" />
          <span class="text-sm">
            <span class="text-secondary">{{ sponsor.collaborators }} </span>
            Contributors
          </span>
        </div>
        <div class="flex items-center space-x-1 md:space-x-2">
          <UIcon name="i-heroicons-building-office" class="text-primary" />
          <span class="text-sm">
            <span class="text-secondary">{{ sponsor.industries }}</span> Industries
          </span>
        </div>
      </div>
    </template>
  </UCard>
</template>

<script setup>
defineProps({
  sponsor: {
    type: Object,
    required: true,
  },
});
</script>
