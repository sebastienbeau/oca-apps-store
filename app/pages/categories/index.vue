<template>
  <div class="pb-24">
    <UPageSection :title="$t('categories.title')">
      <template #description>
        <p class="text-lg">
          {{ $t('nav.modules.categories.description') }}
        </p>
        <div class="flex justify-center py-10">
          <UFormField class="w-full max-w-xl" size="xl">
            <UInput
              v-model="searchTerms"
              icon="search"
              :placeholder="$t('categories.search.placeholder')"
              :ui="{
                base: 'rounded-full',
              }"
              class="w-full rounded-full shadow-xl shadow-primary-50"
            />
          </UFormField>
        </div>
      </template>
    </UPageSection>

    <UPageGrid
      v-if="categories?.hits?.length"
      :ui="{
        base: 'xl:grid-cols-4 py-10',
      }"
    >
      <UPageCard
        v-for="category in categories?.hits"
        :key="category.id"
        :title="category.name"
        :href="`/categories/${category.urlKey}`"
        :ui="{
          container: 'p-3 sm:p-4',
          leadingIcon: 'text-secondary',
          title: 'text-primary font-normal flex items-center gap-1',
          footer: 'flex-1 text-right w-full',
        }"
      >
        <template #title>
          <UIcon name="category" class="size-6 text-secondary" />
          <span class="">{{ category.name }}</span>
        </template>
        <template #footer>
          <UButton
            variant="outline"
            size="sm"
            :to="category.urlKey"
            :label="$t('category.explore')"
          />
        </template>
      </UPageCard>
    </UPageGrid>
    <UEmpty
      v-else
      :title="$t('categories.empty.title')"
      :description="$t('categories.empty.description')"
    />
  </div>
</template>

<script setup lang="ts">
const searchTerms = ref('')
const searchTermsDebounced = refDebounced(searchTerms, 300)
const categoryService = useService('categories')
const { data: categories } = useAsyncData(
  () => {
    if (!searchTermsDebounced.value) {
      return categoryService.getAll()
    }
    return categoryService.search({
      q: searchTermsDebounced.value,
      query_by: 'name',
    })
  },
  {
    watch: [() => searchTermsDebounced.value],
  }
)
</script>
