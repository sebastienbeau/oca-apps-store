<template>
  <UCard
    :ui="{
      root: ui?.root,
      body: ui?.body,
      header: ui?.header,
      footer: ui?.footer,
    }"
  >
    <template #header>
      <div class="fit flex max-w-full items-center gap-4">
        <USkeleton class="h-16 min-w-16" />
        <div
          class="flex flex-col items-start justify-start gap-2 overflow-hidden"
        >
          <USkeleton class="h-4 w-64" />
          <USkeleton class="h-4 w-40" />
          <div class="flex flex-wrap items-center gap-2">
            <USkeleton class="h-4 w-16 rounded-full" />
            <USkeleton class="h-4 w-24" />
          </div>
        </div>
      </div>
    </template>
    <div class="flex flex-1 flex-col gap-y-1 pt-2">
      <USkeleton class="h-4 w-full" />
      <USkeleton class="h-4 w-1/2" />
    </div>
    <div class="flex flex-col gap-2">
      <USkeleton class="h-4 w-16" />
      <USkeleton class="h-6 w-6 rounded-full" />
    </div>
  </UCard>
</template>
<script setup lang="ts">
import { twMerge } from 'tailwind-merge'

const props = defineProps<{
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
    root: 'w-full divide-none  max-sm:ring-0 max-sm:rounded-none max-sm:border-b max-sm:border-default max-md:pb-3 flex flex-col [&_mark]:bg-secondary-200 [&_mark]:text-highlighted xl:min-h-64',
    body: 'p-3 sm:p-4 py-0 sm:py-0 pb-4 sm:pb-4 flex-1 flex flex-col gap-3',
    header: 'flex items-center gap-3 p-3 sm:p-4 ',
    footer: 'p-3 sm:p-4',
  }

  if (props?.variant === 'list') {
    ui.root = twMerge(
      ui.root,
      'grid grid-cols-1 grid-cols-7 gap-4 p-4 ring-0 shadow-none  hover:shadow-none hover:bg-elevated rounded-none border-b border-neutral-100 dark:border-muted xl:min-h-38'
    )
    ui.header = twMerge(ui.header, 'col-span-3 flex-col items-start gap-2')
    ui.body = twMerge(ui.body, 'col-span-4')
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
