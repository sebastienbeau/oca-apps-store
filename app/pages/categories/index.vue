<template>
  <div class="pb-24">
    <UPageSection :title="$t('categories.title')" :ui="{ container : 'lg:py-6 xl:py-6 pt-16', wrapper: 'pt-20'}"  >
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

    <div v-if="categories?.hits?.length" class="px-4 sm:px-6 lg:px-8">
      <div class="flex justify-end pb-4">
        <UFieldGroup>
          <UButton
            color="neutral"
            :variant="displayMode === 'list' ? 'subtle' : 'outline'"
            leading-icon="i-mdi-view-list"
            @click="displayMode = 'list'"
          />
          <UButton
            color="neutral"
            :variant="displayMode === 'grid' ? 'subtle' : 'outline'"
            leading-icon="i-mdi-view-grid"
            @click="displayMode = 'grid'"
          />
        </UFieldGroup>
      </div>
      
      <UPageGrid
        v-if="displayMode === 'grid'"
        :ui="{
          base: 'xl:grid-cols-4 py-10',
        }"
      >
        <UPageCard
          v-for="category in categories?.hits"
          :key="category.id"
          :title="category.name"
          :href="`/${category.urlKey}`"
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
              :to="`/${category.urlKey}`"
              :label="$t('category.explore')"
            />
          </template>
        </UPageCard>
      </UPageGrid>
      
      <div v-else class="space-y-4 py-10 lg:max-w-4xl mx-auto ">
        <UCard
          v-for="category in categories?.hits"
          :key="category.id"
          :ui="{
            body: 'p-4 sm:p-4 flex max-md:flex-col max-md:items-start md:justify-between  ',
          }"
        >
          <div class="flex items-center gap-3">
            <UIcon name="category" class="size-6 text-secondary" />
            <nuxt-link
              :to="`/${category.urlKey}`"
              class="text-lg font-normal text-primary hover:text-primary-600 transition-colors"
            >
              {{ category.name }}
            </nuxt-link>
          </div>
          <div class="max-md:py-4 w-full text-right md:w-auto">
            <UButton
              variant="outline"
              size="sm"
              :to="`/${category.urlKey}`"
              :label="$t('category.explore')"
            />

          </div>
        </UCard>
      </div>
    </div>
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

const displayMode = useCookie<'grid' | 'list'>('categories_display_mode', {
  default: () => 'list',
})
</script>
