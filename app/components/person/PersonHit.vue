<template>
  <UCard :ui="{
    root: ui?.root,
    body: ui?.body,
    header: ui?.header,
    footer: ui?.footer,
  }" @click="goToPerson">
    <template #header>
      <div class="flex-1">
        <UUser :name="person.name" size="lg" :avatar="avatar" :ui="{
          description: 'items-center flex gap-0.5'
        }">
          <template #description v-if="person.username">
            <UButton variant="ghost" :to="`https://github.com/${person.username}`" leading-icon="line-md:github"
              size="sm" :label="person.username" target="_blank" :ui="{
                base: 'p-0 sm:p-0 hover:bg-transparent hover:underline gap-0.5',
                label: 'text-gray-500 dark:text-gray-600 text-sm',
              }" />
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
    <div class="grid grid-cols-2 pt-4 text-xs">
      <PersonStats :person="person" v-if="hasStatisticalInfo" class="space-y-2" />
    </div>
    <template #footer>
      <div class="flex justify-end ">
        <UButton color="neutral" variant="outline" label="View more" size="sm" trailing class="ml-auto "
          :to="`/community/${person.urlKey}`" />
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
    root: 'w-full shadow cursor-pointer justify-start flex flex-col',
    header: ' flex items-center gap-3 p-3 sm:p-4',
    body: 'p-3 sm:p-4 py-0 sm:py-0 flex-1 h-full grow border-b-0',
    footer: 'p-3 sm:p-4 ',
  }
  if (props?.variant === 'list') {
    ui.root = twMerge(ui.root, 'grid grid-cols-1 grid-cols-6 gap-4 p-5 ring-0 divide-none shadow-none rounded-none border-b border-neutral-100')
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
const avatar = computed(() => {
  if (props.person.avatarUrl) {
    return {
      src: props.person.avatarUrl,
      alt: props.person.name,
    }
  }
  else {
    return {
      src: null,
      alt: props.person.name,
    }
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
