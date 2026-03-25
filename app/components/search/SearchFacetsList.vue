<template>
  <div v-if="facets && facets.length > 0">
    <UNavigationMenu
      orientation="horizontal"
      variant="pill"
      :items="items"
      class="hidden lg:flex"
      content-orientation="vertical"
      :unmount-on-hide="false"
      :ui="{
        list: 'gap-2',
        link: 'bg-neutral-50 hover:bg-neutral-100 text-neutral-400  rounded-full',
      }"
    >
      <template #item-content="{ item: { facet, component } }">
        <slot name="item-content" :item="{ facet, component }">
          <div class="p-4">
            <div class="pb-4 text-sm font-bold">
              {{ facet.title }}
            </div>
            <component
              :is="component || 'SearchStringFacet'"
              ref="facetComponents"
              v-bind="facet"
              @search-in-facet="
                (query: string) => $emit('search-in-facet', facet.field, query)
              "
              @refine="(query: string) => $emit('refine', facet.field, query)"
              @label-value="
                (value: string) => setLabelValues(facet.field, value)
              "
            />
          </div>
        </slot>
      </template>
    </UNavigationMenu>
    <UDrawer
      v-model:open="mobileOpen"
      should-scale-background
      set-background-color-on-scale
      :title="t('search.filter.label')"
      :ui="{ header: 'flex items-center justify-between' }"
    >
      <slot name="mobile-item-button" :facets="facets" :open="mobileOpen">
        <UButton
          :label="t('search.filter.label')"
          color="neutral"
          trailing-icon="filter"
          variant="outline"
          class="lg:hidden"
          :ui="{ base: 'rounded-full px-4' }"
        />
      </slot>
      <template #header>
        <ProseH2 class="grow font-bold">
          {{ t('search.filter.label') }}
        </ProseH2>
        <UButton
          color="neutral"
          variant="ghost"
          icon="close"
          @click="mobileOpen = false"
        />
      </template>
      <template #body>
        <slot name="mobile-body" :facets="facets" :open="mobileOpen" />
        <UAccordion :items="items">
          <template #default="{ item: { facet } }">
            <slot name="mobile-item-title" :item="{ facet }">
              <div class="flex w-full items-center gap-2">
                <span class="text-base font-medium">
                  {{ facet.title }}
                </span>
                <UBadge
                  v-if="labelValues?.[facet.field]"
                  color="neutral"
                  variant="soft"
                  :label="labelValues[facet.field]?.toString() || ''"
                />
              </div>
            </slot>
          </template>
          <template #body="{ item: { facet, component } }">
            <slot name="mobile-item-content" :item="{ facet, component }">
              <component
                :is="component || 'SearchStringFacet'"
                v-bind="facet"
                class="pb-4"
                @refine="(query: string) => $emit('refine', facet.field, query)"
                @search-in-facet="
                  (query: string) =>
                    $emit('search-in-facet', facet.field, query)
                "
                @label-value="
                  (value: string) => setLabelValues(facet.field, value)
                "
              />
            </slot>
          </template>
        </UAccordion>
      </template>
      <template #footer>
        <slot name="mobile-footer" :facets="facets" :open="mobileOpen">
          <UButton
            :label="t('search.filter.clear_all')"
            size="lg"
            variant="outline"
            block
            @click="mobileOpen = false"
          />
          <UButton
            :label="t('search.filter.apply', { count: results.total })"
            size="lg"
            leading-icon="filter"
            block
            @click="mobileOpen = false"
          />
        </slot>
      </template>
    </UDrawer>
  </div>
</template>

<script lang="ts" setup>
import type { NavigationMenuItem } from '@nuxt/ui'

import type { Facet, FacetWithResult } from '~~/models'

const props = defineProps<{
  facets: Facet[]
  queryFacets: { [field: string]: string }
  results: FacetWithResult
}>()

defineEmits<{
  (
    e: 'refine' | 'init-facet' | 'search-in-facet',
    field: string,
    query: string
  ): void
}>()

const mobileOpen = ref(false)
const labelValues = ref<{ [field: string]: string | string[] }>({})
const { t } = useI18n()

const items = computed<NavigationMenuItem[]>(() => {
  return props.facets.map((facet) => {
    const { results } = props
    let component = resolveComponent('SearchStringFacet')
    const result = results?.facets?.find?.(
      (f: FacetWithResult['facets'][number]) => f.field === facet.field
    )

    if (
      result?.stats &&
      (result.stats.min !== undefined || result.stats.max !== undefined)
    ) {
      component = resolveComponent('SearchNumericFacet')
    }
    let badge
    if (labelValues.value?.[facet.field]) {
      badge = {
        label: labelValues?.value?.[facet.field]?.toString() || '',
        variant: 'subtle',
        color: 'primary',
      }
    }
    return {
      label: facet.title,
      component,
      badge,
      children: [{ label: '' }],
      facet: {
        ...facet,
        items: result?.items || [],
        stats: result?.stats || [],
        selectedOptions: [],
        query: props.queryFacets?.[facet.field] || '',
      } as FacetWithResult,
    }
  })
})

/**
 * Set label value for a facet to display badge on facet title
 * @param field
 * @param value
 */
const setLabelValues = (field: string, value: string) => {
  labelValues.value[field] = value
}
</script>
