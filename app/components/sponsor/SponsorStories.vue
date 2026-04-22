<template>
  <div class="pt-48">
    <ProseH2 class="py-4 text-2xl font-bold text-secondary">
      {{ sponsor.name }} {{ $t('sponsors.stories.title') }}
    </ProseH2>

    <div
      v-if="sponsor.sponsorship?.stories?.length > 0"
      class="grid grid-cols-1 gap-6 py-8 md:grid-cols-4 lg:grid-cols-4"
    >
      <template
        v-for="(story, index) in sponsor.sponsorship?.stories"
        :key="index"
      >
        <UBlogPost
          :ui="{
            root: 'ring-1 rounded-sm shadow hover:shadow-lg transition-shadow duration-300 ',
            title: 'text-highlighted text-md font-semibold',
            description: 'text-sm text-dimmed line-clamp-5 mb-4',
            body: 'pt-2',
          }"
          :title="story.title"
          :to="story.relativeUrl"
          :description="story.teaser"
          orientation="vertical"
          reverse
          :image="story.coverUrl"
        />
      </template>
    </div>
  </div>
</template>
<script setup lang="ts">
import type { Sponsor } from '~~/models'
const props = defineProps<{
  sponsor: Sponsor
}>()
</script>
