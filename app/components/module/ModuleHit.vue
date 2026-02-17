<template>
  <NuxtLink :to="module.urlKey">
    <UCard :ui="{
      root: ui?.root,
      body: ui?.body,
      header: ui?.header,
      footer: ui?.footer,
    }">
      <template #header>
        <div class="flex items-center gap-5">
          <img class="max-h-18" src="/img/oca_modules_logo_vertical.png" alt="OCA Logo" />
          <div>
            <h3 class="font-semibold text-gray-900 text-xl">
              {{ module.name }}
            </h3>
            <UBadge color="secondary" variant="soft" size="sm" class="rounded-full">
              {{ module.category }}
            </UBadge>
          </div>
        </div>
      </template>

      <div class="space-y-3">
        <div class="flex items-center gap-2 text-sm text-primary">
          <UIcon name="qlementine-icons:anchor-top-left-16" class=""></UIcon>
          <span class=""> {{ module.technicalName }}</span>
        </div>
        <p class="text-gray-500 dark:text-gray-400 text-sm">
          {{ module.description }}
        </p>

        <div class="flex flex-wrap gap-2">
          <UBadge v-for="version in module.supportedVersions" :key="version" color="info" variant="subtle" size="sm"
            class="rounded-full">
            {{ version }}
          </UBadge>
        </div>
      </div>

      <template #footer>
        <div class="flex items-center justify-between">
          <div class="flex items-center">
            <UAvatarGroup v-for="contributor in module.contributors" size="xs" max="2">
              <ULink :to="contributor.github" target="_blank" class="hover:ring-info transition" raw>
                <UAvatar :src="contributor.avatar" alt="Contributor" />
              </ULink>
            </UAvatarGroup>
            <span class="ml-2 text-sm text-gray-500 dark:text-gray-400">
              +{{ module.contributors.length }}
            </span>
          </div>
          <div class="flex items-center gap-1">
            <UIcon :name="icon" class="text-gray-500 dark:text-gray-400" />
            <NuxtLink :to="module.repository.url" class="">
              <UIcon name="line-md:github" class=" text-gray-900 not-only:inline-block p-2 mr-1" width="32"
                height="32" />
            </NuxtLink>
          </div>
        </div>
      </template>
    </UCard>
  </NuxtLink>
</template>
<script setup lang="ts">
import type { Module } from '~/models';
import { twMerge } from 'tailwind-merge'
const props = defineProps<{
  module: Module
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
    root: 'w-full divide-none hover:shadow-lg transition-shadow duration-200 cursor-pointer',
    body: 'p-3 sm:p-4 py-0 sm:py-0',
    header: 'flex flex-1 items-center gap-3 p-3 sm:p-4 ',
    footer: 'p-3 sm:p-4',
  }
  if (props?.variant === 'list') {
    ui.root = twMerge(ui.root, 'grid grid-cols-1 grid-cols-6 gap-4 p-5 ring-0 shadow-none  hover:shadow-none hover:bg-neutral-50 rounded-none border-b border-neutral-100')
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
</script>
