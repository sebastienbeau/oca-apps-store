<template>
  <UFormField v-if="options.length > 0" :label="t('search.sort.label')" size="xs">
    <USelect :model-value="value" :items="options" label-key="label" value-key="value" color="muted" size="sm"
      variant="outline" @update:model-value="(val) => emits('change', val)" />
  </UFormField>
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
const { t } = useI18n()
const emits = defineEmits<{
  (e: 'change', value: string): void
}>()
</script>