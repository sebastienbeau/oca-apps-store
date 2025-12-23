<template>
  <div>
    <UFormField :label="title">
      <URadioGroup v-model="values" :items="ranges" description-key="count" />
    </UFormField>
    <USlider
      v-model="values"
      :min="stats?.min"
      :max="stats?.max"
      class="my-4"
    />
    <div class="flex gap-1 justify-between">
      <UFormField label="Min">
        <UInput v-model="values[0]" :min="stats?.min" size="xs" />
      </UFormField>
      <UFormField label="Max">
        <UInput v-model="values[1]" :max="stats?.max" size="xs" />
      </UFormField>
    </div>
    <UButton
      class="w-full mt-4"
      color="primary"
      label="Apply"
      @click="refine(values.join('..'))"
    />
  </div>
</template>

<script lang="ts" setup>
import { UButton } from '#components'
import type { FacetWithResult } from './SearchFacetsList.vue'

const emit = defineEmits(['refine', 'labelValue'])
const props = defineProps<FacetWithResult>()

const values = ref<number[]>([props.stats?.min || 0, props.stats?.max || 100])

const refine = (query: string) => {
  emit('refine', values.value, `${props.field}:=[${query}]`)
}

const ranges = computed(() => {
  if (props.stats) {
    const size = 5
    const step = (props.stats.max - props.stats.min) / size
    const ranges = []
    for (let i = 0; i < size; i++) {
      const start = Math.round(props.stats.min + i * step)
      const end = Math.round(start + step)
      ranges.push({
        label: `${formatCurrency(start)} - ${formatCurrency(end)}`,
        value: [start, end],
        count: 0,
      })
    }
    return ranges
  }

  return []
})

const label = computed(() => {
  if (
    values.value?.[0] !== props.stats?.min
    || values.value?.[1] !== props.stats?.max
  ) {
    return `${formatCurrency(values.value?.[0])} - ${formatCurrency(values.value?.[1])}`
  }
  return ''
})

watch(
  () => props?.stats,
  (newVal) => {
    if (newVal?.min && values.value?.[0] > newVal.min) {
      values.value[0] = newVal.min
    }
    if (newVal?.max && values.value?.[1] < newVal.max) {
      values.value[1] = newVal.max
    }
  },
  { immediate: true },
)
</script>
