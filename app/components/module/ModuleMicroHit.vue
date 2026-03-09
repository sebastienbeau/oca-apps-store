<template>
  <div v-if="moduleGrouped" class="flex items-center gap-3 border-b border-accented px-4 py-3 w-full">
    <ModuleImage :module="module" size="sm" class="w-12" />
    <div>
      <div class="text-lg font-bold line-clamp-2 leading-snug">
        <nuxt-link v-if="module?.urlKey" :to="`/modules/${module.urlKey}`" class="hover:underline">
          {{ module?.name }}
        </nuxt-link>
        <span v-else>
          {{ module?.name }}
        </span>
      </div>
      <div class="flex gap-3 items-center">
        <div class="text-muted text-sm">
          <UIcon name="category" />
          {{ module?.category }}
        </div>
        <ModuleVersionList :module-grouped="moduleGrouped" />
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import type { ModuleGroupedHit } from '~~/models'

const props = defineProps<{
  moduleGrouped: ModuleGroupedHit | null
}>()
const modules = computed(() => props.moduleGrouped?.hits || [])
const module = computed(() => modules.value[modules.value.length - 1] || null)
</script>