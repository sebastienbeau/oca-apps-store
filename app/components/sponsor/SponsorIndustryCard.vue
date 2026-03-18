<template>
  <div :style="style" class="rounded-none rounded-tr-2xl rounded-bl-2xl">
    <UPageCard
      icon="industries"
      :title="industry.name"
      :description="industry.description"
      :ui="{
        root: 'ring-0  lg:p-3 bg-transparent',
        container: 'p-3 sm:p-4',
        body: 'p-0 sm:p-0',
        header: 'sm:p-0 relative border-0',
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
