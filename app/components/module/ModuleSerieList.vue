<template>
  <div v-if="series.length > 0" class="flex flex-wrap gap-1">
    <UBadge
      v-for="hit in series"
      :key="hit.serie"
      :color="selectedModule?.serie == hit.serie ? 'secondary' : 'info'"
      :variant="variant(hit)"
      :size="size"
      class="rounded-full"
      :class="{
        'cursor-pointer': selectedModule,
      }"
      @click="$emit('select', hit.serie)"
    >
      {{ hit.serie }}
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
  (e: 'select', serie: string): void
}>()

const series = computed(() => {
  return props.moduleGrouped?.hits
    ?.reduce((acc: { serie: string }[], hit) => {
      if (hit.serie && !acc.find((v) => v.serie === hit.serie)) {
        acc.push({ serie: hit.serie })
      }
      return acc
    }, [])
    .sort((a, b) => parseFloat(a.serie) - parseFloat(b.serie))
})
const variant = (hit: Module) => {
  if (!props.selectedModule) {
    return 'subtle'
  }
  if (props.selectedModule?.serie == hit.serie) {
    return 'solid'
  } else {
    return 'outline'
  }
}
</script>
