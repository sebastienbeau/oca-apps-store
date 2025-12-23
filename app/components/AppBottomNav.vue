<template>
    <div
        class="fixed inset-x-0 bottom-0 z-50 border-t border-gray-200 bg-white px-3 lg:hidden dark:border-gray-600 dark:bg-gray-700"
    >
        <div id="NavbarBottom" />
        <UNavigationMenu collapsed :ui="ui" :items="items" />
    </div>
</template>

<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui'

const { t } = useI18n()
const localePath = useLocalePath()

const items = computed<NavigationMenuItem[]>(() => {
    return [
        {
            label: t('home'),
            icon: 'home',
            to: localePath('/'),
        },

        {
            label: t('search.title'),
            icon: 'search',
            onSelect: () => {
                navigateTo({
                    path: localePath('/search'),
                    query: {
                        focused: 'true',
                    },
                })
            },
        },
    ]
})
const ui = computed(() => ({
    root: 'block md:flex md:justify-center',
    list: 'flex-1 w-full flex justify-around ',
    item: 'pt-2 pb-0',
    link: 'flex flex-col items-center gap-0.5 justify-center text-xs py-1 relative',
    label: 'border',
    linkTrailing: 'absolute top-0 -mr-5',
    linkTrailingBadge: 'border',
}))
</script>
