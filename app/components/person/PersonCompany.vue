<template>
  <UButton v-if="person.company" variant="ghost"
    class="text-xs text-center mx-auto p-0 text-gray-500 dark:text-gray-400 m-2">
    <UIcon name="carbon:location-company" class=" text-gray-500 not-only:inline-block p-2 mr-0" width="16"
      height="16" />
    <span class="mx-auto underline">{{ person.company }}</span>
  </UButton>
</template>
<script setup lang="ts">
const props = defineProps({
  person: {
    type: Object,
    required: true,
  },
});

</script>