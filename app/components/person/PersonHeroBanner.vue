<template>
  <template v-if="person">
    <UPageCard orientation="horizontal" reverse :ui="{
      root: 'ring-0 relative',
      container: 'lg:grid-cols-4 ',
      wrapper: 'col-span-2 ',
      body: 'p-0',
      header: 'p-0 relative'
    }">
      <template #title v-if="person?.name && names.length > 0">
        <ProseH1 class="text-primary">
          {{ names[0] }}
          <span class="text-secondary-500"> {{ names[1] }}</span>
        </ProseH1>
        <PersonBadges v-if="person.roles && person.roles.length > 0" :person="person" />
      </template>
      <template #description >
        <div class="text-sm flex items-center" v-if="person.username">
          <UIcon name="line-md:github" class=" text-gray-900 not-only:inline-block p-2 mr-1" width="16" height="16" />
          <span class=" text-gray-500 dark:text-gray-400"> {{ person.username }}</span>
        </div>
        <div class="flex flex-row ml-auto py-4 gap-4 justify-start items-center ">
          <div>
            <PersonCountry :person="person"></PersonCountry>
          </div>
          <div>
            <PersonCompany :person="person"></PersonCompany>
          </div>

        </div>
      </template>
      <template v-if="avatar.src">
        <NuxtImg :src="avatar.src" :alt="avatar.alt || person.name"
        class=" col-span-1 max-h-48 object-cover rounded-full mx-auto" />
      </template>
      <template v-else>
        <div class=" rounded-full md:mx-auto flex items-center md:justify-center">
          <UAvatar :alt="person.name" size="md" class="min-h-48 min-w-48 "/>
        </div>
      </template>
      <template #footer>
        <div class="flex flex-wrap justify-start gap-4">
          <PersonStats :person="person" />
        </div>
      </template>
    </UPageCard>
    <div v-if="displayCompanyContact" class="md:absolute md:top-44 md:left-2/3 md:w-1/5 ">
      <PersonCompanyContact :person="person" />
    </div>
  </template>
</template>

<script setup lang="ts">
import type { Person } from '~~/models'

const props = defineProps<{
  person: Person
}>()
const names = computed(() => {
  const names = props.person?.name.split(' ') || []
  return [names.slice(0, -1).join(' '), names.slice(-1)[0]]
})

const avatar = computed(() => {
  if (props.person.avatarUrl) {
    return {
      src: props.person.avatarUrl,
      alt: props.person.name,
    }
  } else {
    return {
      src: null,
      alt: props.person.name,
    }
  }
})

const displayCompanyContact = computed(() => {
  if (props.person?.contact?.address || props.person?.contact?.email || props.person?.contact?.phone) {
    return true
  }
})
</script>
