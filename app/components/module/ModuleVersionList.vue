<template>
  <div v-if="versions.length > 0" class="flex flex-wrap gap-1">
    <UBadge
      v-for="hit in versions"
      :key="hit.version"
      :color="selectedModule?.version == hit.version ? 'secondary' : 'info'"
      :variant="variant(hit)"
      :size="size"
      class="rounded-full"
      :class="{
        'cursor-pointer': selectedModule,
      }"
      @click="$emit('select', hit.version)"
    >
      {{ hit.version }}
    </UBadge>
  </div>
</template>
<script lang="ts" setup>
import type { ModuleGroupedHit, Module } from '~~/models'

const props = withDefaults(
  defineProps<{
    moduleGrouped: ModuleGroupedHit
    selectedModule?: Module
    size: 'sm' | 'md' | 'lg'
  }>(),
  {
    size: 'md',
  }
)
const emits = defineEmits<{
  (e: 'select', version: string): void
}>()

const versions = computed(() => {
  return props.moduleGrouped.hits
    ?.reduce((acc: { version: string }[], hit) => {
      if (hit.version && !acc.find((v) => v.version === hit.version)) {
        acc.push({ version: hit.version })
      }
      return acc
    }, [])
    .sort((a, b) => parseFloat(a.version) - parseFloat(b.version))
})
const variant = (hit: Module) => {
  if (!props.selectedModule) {
    return 'subtle'
  }
  if (props.selectedModule?.version == hit.version) {
    return 'solid'
  } else {
    return 'outline'
  }
}
</script>
