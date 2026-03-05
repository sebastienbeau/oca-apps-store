<template>
    <UDrawer v-model:open="open" :handle="true" direction="top" :ui="{
        content: 'max-h-[95vh]',
        body: 'overflow-auto',
        footer: 'px-4 pt-2 border-t border-t-default',
    }" @close="searchTerm = ''">
        <div class="flex justify-end">
            <UButton icon="search" class="rounded-full md:hidden" color="neutral" variant="soft" />
            <UInput :placeholder="typewriterPlaceholder" color="neutral" variant="soft" icon="search" :ui="{
                base: 'rounded-full text-left',
                leadingIcon: 'text-gray-900',
            }" class="hidden md:flex" size="lg" @update:model-value="open = true" />
        </div>
        <template #header>
            <UForm @submit="goToSearchPage">
                <UInput v-model="searchTerm" :placeholder="typewriterPlaceholder" color="neutral" variant="ghost"
                    icon="search" :ui="{ root: 'w-full pb-1 border-b border-b-default' }" size="lg" :loading="loading"
                    :autofocus="true">
                    <template #trailing>
                        <UButton icon="close" color="neutral" variant="soft" class="rounded-full"
                            @click="open = false" />
                    </template>
                </UInput>
            </UForm>
        </template>
        <template v-if="searchTerm" #body>
            <div v-if="categories.length > 0 || modules.length > 0" class="grid grid-cols-1 md:grid-cols-4">
                <div v-if="categories.length > 0" class="px-5 pt-4" :class="modules.length > 0
                        ? 'md:col-span-1 md:border-r md:border-r-default'
                        : 'col-span-full'
                    ">
                    <div class="mb-1">
                        {{ t('search.autocomplete.category') }}
                    </div>
                    <CategoryMicroHit v-for="category in categories" :key="category.id" :category="category"
                        class="py-2 border-b border-b-default cursor-pointer" @click="open = false" />
                </div>
                <div v-if="modules.length > 0"
                    class="col-span-3 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 md:gap-2 px-5 pt-4">
                    <div class="col-span-full mb-1">
                        {{ t('search.autocomplete.module') }}
                    </div>
                    <template v-for="module in modules" :key="module.id">
                        <ModuleHit :module="module" class="hidden md:block w-full h-full" @click="open = false" />
                        <ModuleMicroHit :module="module"
                            class="md:hidden w-full cursor-pointer py-2 border-b border-b-default"
                            @click="open = false" />
                    </template>
                </div>
            </div>
            <div v-else class="col-span-full py-20">
                <div class="text-sm text-muted text-center">
                    {{ t('search.autocomplete.noresults') }}
                </div>
            </div>
        </template>
        <template v-if="
            !loading &&
            searchTerm &&
            (categories.length > 0 || modules.length > 0)
        " #footer>
            <div class="flex justify-end">
                <UButton :label="t('search.autocomplete.seeall')" variant="outline" color="neutral" size="sm"
                    @click="goToSearchPage" />
            </div>
        </template>
    </UDrawer>
</template>

<script setup lang="ts">
import type { Category, Module } from '~~/models'
const router = useRouter()
const route = useRoute()
const routeQuery = route.query
const open = ref(routeQuery?.focused === 'true')
const searchTerm = ref('')
const { start, finish } = useLoadingIndicator()
const categoryService = useService('categories')
const moduleService = useService('modules')
const { t } = useI18n()
const localePath = useLocalePath()
const loading = ref(false)
const modules = ref<Module[]>([])
const categories = ref<Category[]>([])
let timer: NodeJS.Timeout | null = null
watch(searchTerm, async (newTerm) => {
    if (newTerm == '') {
        modules.value = []
        categories.value = []
        return
    }
    start()
    loading.value = true
    try {
        modules.value =
            (await moduleService.autocompleteSearch(newTerm, 5))?.hits || []
        categories.value =
            (await categoryService.autocompleteSearch(newTerm, 5))?.hits || []
        if (timer) {
            clearTimeout(timer)
        }
        timer = setTimeout(() => {
            saveQuery(newTerm)
        }, 2000)
    } catch (error) {
        console.error('Error searching modules:', error)
        modules.value = []
        categories.value = []
    } finally {
        loading.value = false
        finish()
    }
})
const saveQuery = (term: string) => {
    moduleService.saveSearchTerm(term)
}
watch(
    () => route.query,
    (newQuery) => {
        if (newQuery?.focused === 'true') {
            open.value = true
            router.push({ query: { ...newQuery, focused: undefined } })
        }
    }
)
/** Typewritter effect */
const typewriterTexts = [
    t('search.autocomplete.placeholder1'),
    t('search.autocomplete.placeholder2'),
]
const typewriterIndex = ref(0)
const typewriterPlaceholder = ref(typewriterTexts[0])
let charIndex = 0
let typing = true

function typeWriterEffect() {
    const currentText = typewriterTexts[typewriterIndex.value] || ''
    if (typing) {
        if (charIndex < currentText.length) {
            typewriterPlaceholder.value = currentText.slice(0, charIndex + 1)
            charIndex++
            setTimeout(typeWriterEffect, 40)
        } else {
            typing = false
            setTimeout(typeWriterEffect, 8000)
        }
    } else {
        if (charIndex > 0) {
            typewriterPlaceholder.value = currentText.slice(0, charIndex - 1)
            charIndex--
            setTimeout(typeWriterEffect, 30)
        } else {
            typing = true
            typewriterIndex.value =
                (typewriterIndex.value + 1) % typewriterTexts.length
            setTimeout(typeWriterEffect, 400)
        }
    }
}

const goToSearchPage = () => {
    open.value = false
    const router = useRouter()
    if (router.currentRoute.value.name === 'search') {
        // Already on search page, just update the query
        router.push({ query: { q: searchTerm.value } })
        return
    }
    navigateTo(localePath({ name: 'search', query: { q: searchTerm.value } }))
    open.value = false
    searchTerm.value = ''
}

onMounted(() => {
    typeWriterEffect()
})
</script>
