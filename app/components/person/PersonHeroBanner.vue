<template>
  <template v-if="person">
    <UPageCard
      orientation="horizontal"
      reverse
      :ui="{
        root: 'ring-0 relative',
        container: 'lg:grid-cols-4 ',
        wrapper: 'col-span-2 ',
        body: 'p-0',
        header: 'p-0 relative',
      }"
    >
      <template #title v-if="person?.name && names.length > 0">
        <ProseH1 class="text-primary">
          {{ names[0] }} 
          <span class="text-secondary-500"> {{ names[1] }}</span>
        </ProseH1>
        <PersonBadges
          v-if="person.roles && person.roles.length > 0"
          :person="person"
        />
        
      </template>
      <template #description>
        <div class="flex items-center text-sm md:py-4" v-if="person.githubUsers && person.githubUsers.length > 0">
          <UIcon
            name="line-md:github"
            class="mr-1 p-2 text-gray-900 not-only:inline-block"
            width="16"
            height="16"
          />
          <span class="text-gray-500 dark:text-gray-400">
            {{ person.githubUsers[0] }}</span
          >
        </div>
        <div
          class="ml-auto flex flex-row items-center justify-start gap-4 py-4"
        >
          <div>
            <PersonCountry :person="person"></PersonCountry>
          </div>
          <div>
            <PersonCompany :person="person"></PersonCompany>
          </div>
        </div>
      </template>
      <template v-if="avatar?.src">
        <NuxtImg
          :src="avatar.src"
          :alt="avatar.alt || person.name"
          class="col-span-1 mx-auto max-h-48 rounded-full object-cover"
        />
      </template>
      <template v-else>
        <div
          class="flex items-center rounded-full md:mx-auto md:justify-center"
        >
          <UAvatar :alt="person.name" size="md" class="min-h-48 min-w-48" />
        </div>
      </template>
      <template #footer>
        <div class="flex flex-wrap justify-start gap-4">
          <PersonStats :person="person" />
        </div>
      </template>
    </UPageCard>
    <div
      v-if="displayCompanyContact"
      class="md:absolute md:top-44 md:left-2/3 md:w-1/5"
    >
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
  if (props.person.logoUrls) {
    return {
      src: props.person.logoUrls.l,
      alt: props.person.logoUrls.alt || props.person.name,
    }
  } else {
    return {
      src: null,
      alt: props.person.name,
    }
  }
})

const displayCompanyContact = computed(() => {
  if (
    props.person?.contact?.address ||
    props.person?.contact?.email ||
    props.person?.contact?.phone
  ) {
    return true
  }
})
</script>
