<template>
  <UHeader
    :ui="{
      root: 'lg:py-2 lg:h-auto',
      left: 'lg:flex-none',
      right: 'lg:flex-none',
      center: 'flex-2',
    }"
  >
    <template #left>
      <Logo />
    </template>
    <UNavigationMenu
      :items="items"
      color="primary"
      :ui="{
        root: 'gap-6 hidden lg:flex max-w-full w-full mx-auto px-4 sm:px-6 lg:px-6 justify-center',
      }"
    />

    <template #right>
      <UButton
        color="neutral"
        variant="soft"
        href="https://odoo-community.org/"
        target="_blank"
        class="lg:btn-lg btn-md hidden text-sm sm:flex md:text-base"
      >
        <UIcon name="external"></UIcon>
        {{ $t('nav.oca.website') }}
      </UButton>
      <UButton
        color="secondary"
        href="https://odoo-community.org/get-involved/become-a-sponsor"
        target="_blank"
        class="lg:btn-lg btn-md hidden text-sm sm:flex md:text-base"
      >
        <UIcon name="sponsor"></UIcon>
        {{ $t('nav.sponsors.become') }}
      </UButton>
      <UColorModeButton>
        <template #fallback>
          <UButton loading variant="ghost" color="neutral" />
        </template>
      </UColorModeButton>
      <UTooltip text="Open on GitHub" :kbds="['meta', 'G']">
        <UButton
          color="neutral"
          variant="ghost"
          to="https://github.com/oca"
          target="_blank"
          icon="i-simple-icons-github"
          aria-label="GitHub"
        />
      </UTooltip>
    </template>
    <template #body>
      <UNavigationMenu
        :items="items"
        orientation="vertical"
        class="-mx-2.5"
        :ui="{
          list: '',
          item: 'border-b border-default',
          linkLabel: 'py-2',
        }"
      />
      <div class="flex flex-col gap-4 justify-center pt-4">
        <UButton
          color="neutral"
          variant="soft"
          href="https://odoo-community.org/"
          target="_blank"
          class="lg:hidden btn-xl block max-md:w-full mx-auto text-center"
        >
          <UIcon name="external"></UIcon>
          {{ $t('nav.oca.website') }}
        </UButton>
        <UButton color="secondary" to="/become-sponsor" size="xl" block>
          <UIcon name="vaadin:diamond"></UIcon>
          {{ $t('nav.sponsors.become') }}
        </UButton>
        
      </div>
      <LocaleSwitcher />
    </template>
    <template #bottom> </template>
  </UHeader>
</template>

<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui'
const { locale } = useI18n()
const localePath = useLocalePath()
const { t } = useI18n()
const items: NavigationMenuItem[] = [
  {
    label: t('nav.site.home'),
    icon: 'home',
    to: localePath('/'),
  },
  {
    label: t('nav.modules.title'),
    icon: 'module',
    to: localePath('/modules'),
    children: [
      {
        label: t('nav.modules.all.title'),
        description: t('nav.modules.all.description'),
        to: localePath('/modules'),
        icon: 'module',
      },
      {
        label: t('nav.modules.categories.title'),
        description: t('nav.modules.categories.description'),
        to: localePath('/categories'),
        icon: 'category',
      },
    ],
  },
  {
    label: t('nav.community.title'),
    icon: 'community',
    to: localePath('/community'),
    children: [
      {
        label: t('nav.community.members.title'),
        description: t('nav.community.members.description'),
        to: localePath('/community'),
        icon: 'person',
      },
      {
        label: t('nav.community.integrators.title'),
        description: t('nav.community.integrators.description'),
        to: localePath('/integrators'),
        icon: 'company',
      },
    ],
  },
  {
    label: t('nav.sponsors.title'),
    icon: 'sponsor',
    to: localePath('/sponsors'),
  },
]

const scrolled = ref(false)
const onWindowScroll = () => {
  scrolled.value = window.scrollY > 0
}
onMounted(() => {
  window.addEventListener('scroll', onWindowScroll)
})
onUnmounted(() => {
  window.removeEventListener('scroll', onWindowScroll)
})
</script>
