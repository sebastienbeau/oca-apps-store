<template>

  <UCard :ui="{
    root: ui?.root,
    body: ui?.body,
    header: ui?.header,
    footer: ui?.footer,
  }" v-if="module">
    <template #header>
      <div class="flex items-center gap-5" @click="goToModule">
        <ModuleImage :module="module" />
        <div class="flex flex-col justify-start items-start gap-1">
          <ProseH3 class="font-semibold font-heading text-primary text-xl my-0">
            {{ module.name }}
          </ProseH3>
          <UBadge v-if="module?.category" color="secondary" variant="soft" size="sm" class="rounded-full">
            {{ module.category }}
          </UBadge>
        </div>
      </div>
    </template>
    <Icon name="nuxt" />
    <div class="flex flex-1 flex-col gap-y-3 pt-4" @click="goToModule">
      <div v-if="module?.repository?.name" class="flex items-center gap-2 text-sm text-primary">
        <Icon name="repository" class="" />
        <div class="line-clamp-1">
          {{ module.repository?.name }}
        </div>
      </div>
      <p v-if="module?.summary" class="text-gray-500 dark:text-gray-400 text-sm flex-1 line-clamp-4">
        {{ module.summary }}
      </p>
      <ModuleVersionList :module-grouped="moduleGrouped" />
    </div>

    <div class="flex items-center justify-between">
      <div class="flex items-center">
        <UAvatarGroup v-if="module?.contributors?.length" :max="5" size="sm">
          <UAvatar v-for="contributor in module.contributors" :key="contributor.name" :alt="contributor.name" :avatar="{
            name: contributor.name
          }" />
          />
        </UAvatarGroup>
      </div>
      <div v-if="module?.website" class="flex items-center gap-1">
        <NuxtLink :to="module.website" class="" target="_blank">
          <UIcon name="line-md:github" class=" text-gray-900 not-only:inline-block p-2 mr-1" width="32" height="32" />
        </NuxtLink>
      </div>
    </div>
  </UCard>
</template>
<script setup lang="ts">
import type { ModuleGroupedHit } from '~~/models';
import { twMerge } from 'tailwind-merge'
import type Module from 'module';
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
const module = computed(() => props.moduleGrouped.hits[props.moduleGrouped.hits.length - 1] || null)
const ui = computed(() => {
  const ui = {
    root: 'w-full divide-none  max-sm:ring-0 max-sm:rounded-none max-sm:border-b max-sm:border-default max-md:pb-3 flex flex-col',
    body: 'p-3 sm:p-4 py-0 sm:py-0 pb-4 sm:pb-4 flex-1 flex flex-col gap-3',
    header: 'flex items-center gap-3 p-3 sm:p-4 ',
    footer: 'p-3 sm:p-4',
  }
  if (module.value?.urlKey) {
    ui.root = twMerge(ui.root, 'hover:shadow-lg transition-shadow duration-200 cursor-pointer')
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


const goToModule = () => {
  if (!module.value?.urlKey) return
  navigateTo(`/modules/${module.value?.urlKey}`)
}

</script>
