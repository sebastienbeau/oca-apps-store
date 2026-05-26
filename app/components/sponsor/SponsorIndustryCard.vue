<template>
  <div :style="style" class="rounded-none rounded-tr-2xl rounded-bl-2xl">
    <UPageFeature
      icon="industries"
      :title="industry.name"
      :description="industry.description"
      :ui="{
        root: 'ring-0  p-3 rounded-sm shadow hover:shadow-lg transition-shadow duration-300 ',
        wrapper: 'pl-0 pr-3 py-3',
        leading: 'pl-0 pr-3 py-3 sm:p-4 ',
        title: 'sm:p-0 relative border-0',
      }"
    />
  </div>
</template>
<script setup lang="ts">
const props = defineProps({
  industry: {
    type: Object,
    required: true,
  },
  style: {
    type: Object,
    required: false,
  },
})
</script>
