<template>
  <div
    class="fixed inset-x-0 bottom-0 z-50 border-t border-default bg-white px-3 lg:hidden dark:bg-muted"
  >
    <div id="NavbarBottom" />
    <UNavigationMenu :items="items" :ui="ui" class="w-full" />
  </div>
</template>

<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui'
const { t } = useI18n()
const localePath = useLocalePath()
const items: NavigationMenuItem[] = [
  {
    label: 'Home',
    icon: 'home',
    to: localePath('/'),
  },
  {
    label: t('nav.modules.title'),
    to: localePath('/modules'),
    icon: 'module',
  },
  {
    label: t('nav.community.title'),
    to: localePath('/community'),
    icon: 'community',
  },
  {
    label: t('nav.sponsors.title'),
    to: localePath('/sponsors'),
    icon: 'sponsor',
  },
]
const ui = {
  root: 'justify-around gap-2 w-full py-1 ',
  item: 'py-0',
  link: 'flex-col gap-1 px-5',
  linkLeadingIcon: 'size-7',
  linkLabel: 'text-[12px]/3 font-normal',
}
</script>
