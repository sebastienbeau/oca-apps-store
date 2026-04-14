<template>
  <UNavigationMenu
    :items="items"
    :ui="{
      root: 'my-0 py-0',
      link: 'first:pl-0',
      linkLabel: 'font-normal text-primary',
    }"
  />
</template>
<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui'
import type { Company } from '~~/models'
const props = defineProps<{
  company: Company
}>()
const items = computed<NavigationMenuItem[]>(() => {
  const menuItems: NavigationMenuItem[] = []
  if (props.company?.email) {
    menuItems.push({
      label: props.company.email,
      icon: 'email',
      to: `mailto:${props.company.email}`,
    })
  }
  if (props.company?.phone) {
    menuItems.push({
      label: props.company.phone,
      icon: 'phone',
    })
  }
  if (props.company?.website.url) {
    menuItems.push({
      label: props.company.website.label,
      icon: 'website',
      to: props.company.website.url,
      target: '_blank',
    })
  }
  return menuItems
})
</script>
