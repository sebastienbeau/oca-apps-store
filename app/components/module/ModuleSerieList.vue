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
    limit?: number
  }>(),
  {
    size: 'md',
  }
)
const emits = defineEmits<{
  (e: 'select', serie: string): void
}>()

/**
 * Extract the series from the moduleGrouped hits,
 * ensuring uniqueness and sorting them in descending order.
 * If there are more than 5 series, only return the top 5 and
 * indicate how many additional series there are with a "+X" format.
 */
const series = computed(() => {
  const series = props.moduleGrouped?.hits
    ?.reduce((acc: { serie: string }[], hit) => {
      if (hit.serie && !acc.find((v) => v.serie === hit.serie)) {
        acc.push({ serie: hit.serie })
      }
      return acc
    }, [])
    .sort((a, b) => parseFloat(b.serie) - parseFloat(a.serie))
  if (props.limit && series?.length > props.limit) {
    const remaining = series.length - props.limit
    return series.slice(0, props.limit).concat({ serie: `+${remaining}` })
  }
  return series
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
