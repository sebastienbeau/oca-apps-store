<template>
  <NuxtLink :to="localePath('/')" class="flex items-center space-x-2">
    <UColorModeImage
      light="/oca-logo.png"
      dark="/oca-logo-light.png"
      class="max-w-24"
    />
  </NuxtLink>
</template>

<script setup lang="ts">
const localePath = useLocalePath()
</script>
