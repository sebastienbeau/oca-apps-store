<template>
  <UCard v-if="moduleGrouped" :ui="ui" @click="onClick">
    <ModuleImage :module="module" size="sm" class="w-12" />
    <div>
      <div class="text-lg font-bold line-clamp-2 leading-5 pb-3">
        <nuxt-link
          v-if="module?.urlKey"
          :to="`/modules/${module.urlKey}`"
          class="hover:underline"
        >
          {{ module?.name }}
        </nuxt-link>
      </div>
      <div class="flex gap-3 items-center">
        <div class="text-muted text-sm flex items-center gap-1">
          <UIcon name="category" class="text-primary" />
          {{ module?.category }}
        </div>
        <ModuleVersionList :module-grouped="moduleGrouped" />
      </div>
      <div class="text-muted text-sm">
        {{ module?.summary }}
      </div>
    </div>
    <div class="flex justify-end">
      <UButton
        v-if="module?.urlKey"
        color="neutral"
        variant="outline"
        size="sm"
        leading-icon="repository"
        :to="`/modules/${module.urlKey}`"
        target="_blank"
      />
    </div>
  </UCard>
</template>
<script lang="ts" setup>
import type { ModuleGroupedHit } from '~~/models'

const props = defineProps<{
  moduleGrouped: ModuleGroupedHit | null
}>()

const modules = computed(() => props.moduleGrouped?.hits || [])
const module = computed(() => modules.value[modules.value.length - 1] || null)
const ui = computed(() => {
  return {
    root: module.value?.urlKey
      ? 'hover:shadow-lg transition-shadow duration-200 cursor-pointer'
      : '',
    body: 'flex items-start gap-3',
  }
})

const onClick = () => {
  if (module.value?.urlKey) {
    navigateTo(`/modules/${module.value.urlKey}`)
  }
}
</script>
