<template>
  <UBadge v-if="person && person.country" color="neutral" variant="outline" size="sm" class=" rounded-full px-6">
    {{ person.country }}
  </UBadge>
</template>
<script setup lang="ts">
const props = defineProps({
  person: {
    type: Object,
    required: true,
  },
});

</script>