
<template>
  <UCard :ui="{
    base: 'w-full',
    body: { base: 'flex flex-col gap-3' },
    header: { base: '' },
    footer: { base: '' },
  }">
    <template #header>
      <div class="flex items-center gap-3">
        <UAvatar src="https://avatars.githubusercontent.com/u/1?v=4" alt="Avatar" size="md" />
        <div>
          <h3 class="font-medium text-gray-900 dark:text-white">
            {{ person.name }}
          </h3>
          <p class="text-sm flex items-center">
            <UIcon name="line-md:github" class=" text-gray-900 not-only:inline-block p-2 mr-1" width="16" height="16" />
            <span class=" text-gray-500 dark:text-gray-400"> {{ person.username }}</span>
          </p>
        </div>
        <div class="flex flex-col ml-auto text-center">
          <PersonCountry :person="person"></PersonCountry>
          <PersonCompany :person="person"></PersonCompany>
        </div>
      </div>
    </template>

    <PersonBadges :person="person" />

    <UDivider class="my-3" />
    <div class="space-y-2 ">
      <PersonStats :person="person" />
    </div>

    <template #footer>
      <div class="flex justify-end ">
        <UButton color="neutral" variant="outline" label="View more" trailing class="ml-auto " />
      </div>

    </template>
  </UCard>
</template>
<script setup>
import { icon } from '#build/ui/prose';

const props = defineProps({
  person: {
    type: Object,
    required: true,
  },
});
</script>
