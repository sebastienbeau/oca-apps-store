<template>
  <div>
    <slot name="items" :items="transformedItems" :change="refine">
      <div v-if="transformedItems?.length" class="flex flex-col gap-2">
        <UCheckbox
          v-for="item in transformedItems"
          :key="item.value"
          :label="item?.label || item?.value"
          :description="item?.count?.toString()"
          :model-value="values.includes(item?.value)"
          :ui="{
            root: 'min-w-48 pr-2',
            wrapper: 'flex justify-between items-start',
          }"
          @change="refine(item?.value)"
        />
      </div>
      <div v-if="values?.length > 0" class="flex justify-end">
        <UButton
          color="neutral"
          variant="link"
          size="xs"
          label="Reset"
          @click="reset"
        />
      </div>
    </slot>
  </div>
</template>

<script lang="ts" setup>
import { UButton } from '#components'
import type { FacetWithResult } from './SearchFacetsList.vue'

const emit = defineEmits<{
  (e: 'refine' | 'init-facet', query: string): void
  // eslint-disable-next-line @typescript-eslint/unified-signatures
  (e: 'labelValue', value: string): void
}>()
const router = useRouter()
const route = useRoute()
const props = defineProps<FacetWithResult>()
const parseQueryToValues = (query?: string): string[] => {
  if (!query) return []
  const match = query.match(/:=\[(.*)\]/)
  if (match && match[1]) {
    return match[1].split(',').map(v => v.replace(/'/g, '').trim())
  }
  return []
}
const transformedItems = computed(() => {
  if (props.transformItems) {
    return props.transformItems(props.items)
  }
  return props.items
})

const reset = () => {
  values.value = []
  refine()
}

const refine = (value?: string) => {
  if (value && values.value.includes(value)) {
    values.value = values.value.filter(v => v !== value)
  }
  else if (value) {
    values.value.push(value)
  }
  let query = ''
  if (values.value.length > 0) {
    query = `${props.field}:=[${values.value.map(i => `'${i}'`).join(',')}]`
  }
  if (values?.value?.length > 1) {
    emit('labelValue', values.value?.length?.toString())
  }
  else {
    emit('labelValue', values.value?.[0] || '')
  }
  emit('refine', query)
  // router.push({ query: { ...router.currentRoute.value.query, [props.field]: values.value } })
}

const values = ref<string[]>(parseQueryToValues(props.query))
if (values.value.length === 0 && route.query[props.field]) {
  if (Array.isArray(route.query[props.field])) {
    values.value = route.query[props.field] as string[]
  }
  else if (typeof route.query[props.field] === 'string') {
    values.value = [route.query[props.field] as string]
  }
}
if (!props.query && values.value.length > 0) {
  emit(
    'init-facet',
    `${props.field}:=[${values.value.map(i => `'${i}'`).join(',')}]`,
  )
}
</script>
