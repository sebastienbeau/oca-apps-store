<template>
  <UCard :ui="{
    root: ui?.root,
    body: ui?.body,
    header: ui?.header,
    footer: ui?.footer,
  }" @click="goToPerson">
    <template #header>
      <div class="flex-1">
        <UUser :name="person.name" size="lg" :avatar="{
          src: 'https://avatars.githubusercontent.com/u/1?v=4'
        }" :ui="{
          description: 'items-center flex gap-0.5'
        }">
          <template #description>
            <UIcon name="line-md:github" class=" text-gray-900 not-only:inline-block p-2" width="16" height="16" />
            <span class=" text-gray-500 dark:text-gray-400"> {{ person.username }}</span>
          </template>
        </UUser>
      </div>
      <div :class="{
        'flex flex-col items-end': variant === 'grid',
        'inline-flex flex-row items-center gap-1': variant == 'list',
      }">
        <PersonCountry :person="person" />
        <PersonCompany :person="person" />
      </div>
    </template>
    <PersonBadges :person="person" />
    <PersonStats :person="person" v-if="hasStatisticalInfo" class="space-y-2" />
    <template #footer>
      <div class="flex justify-end ">
        <UButton color="neutral" variant="outline" label="View more" size="sm" trailing class="ml-auto "
          :to="`/community/${person.username}`" />
      </div>
    </template>
  </UCard>
</template>
<script setup lang="ts">
import type { Person } from '~/models'
import { twMerge } from 'tailwind-merge'
const props = defineProps<{
  person: Person
  variant?: 'grid' | 'list'
  ui?: {
    root?: string
    body?: string
    header?: string
    footer?: string
  }
}>()

const ui = computed(() => {
  const ui = {
    root: 'w-full shadow divide-none cursor-pointer',
    body: 'p-3 sm:p-4 py-0 sm:py-0',
    header: 'flex flex-1 items-center gap-3 p-3 sm:p-4 ',
    footer: 'p-3 sm:p-4',
  }
  if (props?.variant === 'list') {
    ui.root = twMerge(ui.root, 'grid grid-cols-1 grid-cols-6 gap-4 p-5 ring-0 shadow-none rounded-none border-b border-neutral-100')
    ui.header = twMerge(ui.header, 'col-span-2 flex-col items-start gap-2')
    ui.body = twMerge(ui.body, 'col-span-3')
    ui.footer = twMerge(ui.footer, '')
  }
  return {
    root: twMerge(ui.root, props.ui?.root || ''),
    body: twMerge(ui.body, props.ui?.body || ''),
    header: twMerge(ui.header, props.ui?.header || ''),
    footer: twMerge(ui.footer, props.ui?.footer || ''),
  }
})
const hasStatisticalInfo = computed(() => {
  if (props.person.collaboratorIndex == '' && props.person.translations == '' && props.person.modulesMaintained == '' && props.person.psc == '') {
    return false
  }
  else {
    return true
  }
})

const goToPerson = () => {
  if (props?.person?.username) {
    navigateTo(`/community/${props.person.username}`)
  }
}
</script>
