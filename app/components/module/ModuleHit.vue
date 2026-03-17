<template>
  <UCard
    v-if="module"
    :ui="{
      root: ui?.root,
      body: ui?.body,
      header: ui?.header,
      footer: ui?.footer,
    }"
  >
    <template #header>
      <div class="flex items-center gap-4" @click="goToModule">
        <ModuleImage :module="module" />
        <div class="flex flex-col items-start justify-start gap-1">
          <ProseH3
            class="my-0 line-clamp-2 font-heading text-xl leading-6 font-semibold text-primary"
          >
            {{ removeLastWord(module.name) }}
            <span class="text-secondary-500">
              {{ getLastWord(module.name) }}
            </span>
          </ProseH3>
          <UBadge
            v-if="module?.category"
            color="secondary"
            variant="soft"
            size="sm"
            class="rounded-full"
          >
            {{ module.category }}
          </UBadge>
        </div>
      </div>
    </template>
    <div class="flex flex-1 flex-col gap-y-2 pt-2" @click="goToModule">
      <div
        v-if="module?.repository?.name"
        class="flex items-center gap-1 text-sm text-primary"
      >
        <UIcon name="repository" class="" />
        <div class="line-clamp-1">
          {{ module.repository?.name }}
        </div>
      </div>
      <div class="h-full flex-1">
        <p
          v-if="module?.summary"
          class="line-clamp-4 text-sm text-gray-500 dark:text-gray-400"
        >
          {{ module.summary }}
        </p>
      </div>
      <ModuleVersionList :module-grouped="moduleGrouped" />
    </div>
    <div class="flex items-center justify-between">
      <div class="flex items-center">
        <UAvatarGroup v-if="module?.contributors?.length" :max="5" size="sm">
          <UAvatar
            v-for="contributor in module.contributors"
            :key="contributor.name"
            :alt="contributor.name"
            :avatar="{
              name: contributor.name,
            }"
          />
        </UAvatarGroup>
      </div>
      <div v-if="module?.website" class="flex items-center gap-1">
        <NuxtLink :to="module.website" class="" target="_blank">
          <UIcon
            name="github"
            class="mr-1 p-2 text-gray-900 not-only:inline-block"
            width="32"
            height="32"
          />
        </NuxtLink>
      </div>
    </div>
  </UCard>
</template>
<script setup lang="ts">
import type { ModuleGroupedHit } from '~~/models'
import { twMerge } from 'tailwind-merge'
const props = defineProps<{
  moduleGrouped: ModuleGroupedHit
  variant?: 'grid' | 'list'
  ui?: {
    root?: string
    body?: string
    header?: string
    footer?: string
  }
}>()
const module = computed(
  () => props.moduleGrouped.hits[props.moduleGrouped.hits.length - 1] || null
)
const ui = computed(() => {
  const ui = {
    root: 'w-full divide-none  max-sm:ring-0 max-sm:rounded-none max-sm:border-b max-sm:border-default max-md:pb-3 flex flex-col',
    body: 'p-3 sm:p-4 py-0 sm:py-0 pb-4 sm:pb-4 flex-1 flex flex-col gap-3',
    header: 'flex items-center gap-3 p-3 sm:p-4 ',
    footer: 'p-3 sm:p-4',
  }
  if (module.value?.urlKey) {
    ui.root = twMerge(
      ui.root,
      'hover:shadow-lg transition-shadow duration-200 cursor-pointer'
    )
  }
  if (props?.variant === 'list') {
    ui.root = twMerge(
      ui.root,
      'grid grid-cols-1 grid-cols-6 gap-4 p-5 ring-0 shadow-none  hover:shadow-none hover:bg-neutral-50 rounded-none border-b border-neutral-100'
    )
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

const goToModule = () => {
  if (!module.value?.urlKey) return
  navigateTo(`/modules/${module.value?.urlKey}`)
}
</script>
