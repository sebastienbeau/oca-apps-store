<template>
  <UNavigationMenu
    :items="items"
    variant="link"
    :orientation="props.orientation"
  />
</template>

<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui'

const props = defineProps<{
  items: NavigationMenuItem[]
  orientation?: 'horizontal' | 'vertical'
}>()
</script>
