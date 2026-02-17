<template>
	<UHeader :ui="{ root: 'lg:py-2 lg:h-auto' }">
		<template #left>
			<Logo />
		</template>
		<UNavigationMenu :items="items" color="primary" :ui="{
			root: 'gap-6 hidden lg:flex w-full max-w-(--ui-container) mx-auto px-4 sm:px-6 lg:px-6 '
		}" />

		<template #right>
			<UColorModeButton />
			<UButton color="secondary" to="/become-sponsor" class="lg:btn-lg btn-md text-sm md:text-base">
				<UIcon name="vaadin:diamond"></UIcon>
				{{ $t('nav.sponsors.become') }}
			</UButton>

			<UTooltip text="Open on GitHub" :kbds="['meta', 'G']">
				<UButton color="neutral" variant="ghost" to="https://github.com/nuxt/ui" target="_blank"
					icon="i-simple-icons-github" aria-label="GitHub" />
			</UTooltip>
		</template>
		<template #body>
			<UNavigationMenu :items="items" orientation="vertical" class="-mx-2.5" />
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
		to: localePath('/'),
	},
	{
		label: t('nav.modules.title'),
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
				icon: 'category',
				to: localePath('/categories/modules'),
			},
		],
	},
	{
		label: t('nav.community.title'),
		to: localePath('/community'),
		children: [
			{
				label: t('nav.community.members.title'),
				description: t('nav.community.members.description'),
				to: localePath('/community'),
				icon: 'person',
			},
			{
				label: t('nav.community.contributors.title'),
				description: t('nav.community.contributors.description'),
				to: localePath('/community'),
				icon: 'sponsor',
			},
		],
	},
	{
		label: t('nav.sponsors.title'),
		to: localePath('/sponsors'),
	}
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
