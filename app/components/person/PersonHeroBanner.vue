<template>
  <UPageCard orientation="horizontal" reverse :ui="{
    root: 'ring-0 relative',
    container: 'lg:grid-cols-4 ',
    wrapper: 'col-span-2 ',
    body: { base: 'p-0' },
    header: { base: 'p-0 relative' }
  }">
    <template #title>

      <h3 class="font-bold text-4xl">
        {{ person.name }} <span class="text-secondary-500">Beau</span>
      </h3>
      <PersonBadges v-if="person.roles" :person="person" />
    </template>
    <template #description>
      <p class="text-sm flex items-center">
        <UIcon name="line-md:github" class=" text-gray-900 not-only:inline-block p-2 mr-1" width="16" height="16" />
        <span class=" text-gray-500 dark:text-gray-400"> {{ person.username }}</span>
      </p>
      <div class="flex ml-auto py-4 gap-2">
        <PersonCountry :person="person"></PersonCountry>
        <PersonCompany :person="person"></PersonCompany>
      </div>
    </template>
    <img src="https://akretion.com/content/media/file/seb2.jpg" alt="Sébastien Beau"
      class=" col-span-1 max-h-48 object-cover rounded-full mx-auto" />

    <template #footer>
      <div class="flex flex-wrap justify-start gap-2">
        <PersonStats :person="person" />
      </div>
    </template>
  </UPageCard>
  <div class="md:absolute md:top-36 md:left-2/3 md:w-1/4 ">
    <PersonCompanyContact :person="person" />
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  person: {
    type: Object,
    required: true,
  },
});

</script>