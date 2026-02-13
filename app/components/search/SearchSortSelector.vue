<template>
  <USelect :model-value="value" :items="options" label-key="label" value-key="value" size="md" variant="outline"
    @update:model-value="(val) => emits('change', val)" class="rounded-full" />
</template>
<script lang="ts" setup>
const props =
  withDefaults(defineProps<{
    options?: { label: string; value: string }[],
    value?: string

  }>(), {
    options: () => [],
    value: '',
  })
const emits = defineEmits<{
  (e: 'change', value: string): void
}>()
</script>