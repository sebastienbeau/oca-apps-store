<template>
  <UButton v-if="person.company"  variant="ghost" class="text-xs text-center mx-auto p-0 text-gray-500 dark:text-gray-400 m-2">
    <span class="mx-auto">{{ person.company }}</span>
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