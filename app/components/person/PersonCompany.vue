<template>
  <div
    v-if="person.company"
    variant="ghost"
    class="flex gap-0.5 items-center text-sm text-center mx-auto p-0 text-gray-700 dark:text-gray-400 my-2"
  >
    <UIcon name="company" class="text-gray-500 not-only:inline-block size-4" />
    <span class="mx-auto">{{ person.company }}</span>
  </div>
</template>
<script setup lang="ts">
const props = defineProps({
  person: {
    type: Object,
    required: true,
  },
})
</script>
