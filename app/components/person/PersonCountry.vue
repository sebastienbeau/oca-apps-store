<template>
  <UBadge
    v-if="person && person.country?.label"
    color="primary"
    variant="solid"
    size="sm"
    class="rounded-full px-4"
  >
    {{ person.country?.label }}
  </UBadge>
</template>
<script setup lang="ts">
import type { Person } from '~~/models'
const props = defineProps<{
  person: Person
}>()
</script>
