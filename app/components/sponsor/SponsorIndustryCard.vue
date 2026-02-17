<template>
  <UCard reverse class="" :ui="{
    root: 'ring-0 bg-gray-100 rounded-0 p-4 min-w-1/2',
    body: 'sm:px-0 sm:py-2 bg-transparent',
    header: 'sm:p-0 relative border-0',
  }">
    <template #header>
      <h3 class="text-primary font-bold text-sm">
        <icon name="streamline:industry-innovation-and-infrastructure"
          class="inline-block mr-2 text-xl align-middle text-gray-600"></icon>
        {{ industry.name }}
      </h3>
    </template>
    <template #default>
      <div class=" ">
        <div class="space-y-1 text-sm text-gray-500">
          {{ industry.description }}
        </div>
      </div>
    </template>
  </UCard>
</template>
<script setup lang="ts">
const props = defineProps({
  industry: {
    type: Object,
    required: true,
  },
});
</script>