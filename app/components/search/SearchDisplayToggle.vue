<template>
  <UFieldGroup class="hidden sm:flex">
    <UButton
      color="neutral"
      :variant="value === 'list' ? 'subtle' : 'outline'"
      leading-icon="list"
      @click="value = 'list'"
    />
    <UButton
      color="neutral"
      :variant="value === 'grid' ? 'subtle' : 'outline'"
      leading-icon="grid"
      @click="value = 'grid'"
    />
  </UFieldGroup>
</template>
<script lang="ts" setup>
const value = defineModel({
  type: String as () => 'grid' | 'list',
  default: 'grid',
})
</script>
