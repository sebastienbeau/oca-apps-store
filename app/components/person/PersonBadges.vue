<template>
  <div v-if="person && person.roles" class="flex flex-wrap gap-2 py-4">
      <UBadge v-for="(role, index) in person.roles" :key="index" class=" rounded-full py-0  outline " variant="soft"
        :color="role === 'Board Member' ? 'error' : role === 'Contributor' ? 'primary' : role === 'Member' ? 'neutral' : role === 'Delegate' ? 'warning' : 'gray'">
        {{ role }}
      </UBadge>

    </div>
</template>
<script setup lang="ts">
const props = defineProps({
  person: {
    type: Object,
    required: true,
  },
});

</script>