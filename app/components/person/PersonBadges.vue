<template>
  <div v-if="person && person.roles" class="flex flex-wrap gap-2">
    <UBadge
      v-for="(role, index) in person.roles"
      :key="index"
      class="rounded-full"
      :size="size"
      variant="soft"
      :color="color(role?.id)"
    >
      {{ role?.name }}
    </UBadge>
  </div>
</template>
<script setup lang="ts">
const props = defineProps({
  person: {
    type: Object,
    required: true,
  },
  size: {
    type: String as () => 'xs' | 'sm' | 'md' | 'lg',
    default: 'sm',
  },
})
const color = (id: number) => {
  const colors = {
    4: 'error',
    1: 'primary',
    8: 'secondary',
    7: 'warning',
  }

  return colors?.[id] || 'neutral'
}
</script>
