<template>

  <div class="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-4 gap-6 py-14">
    <template v-for="(story, index) in sponsor.stories" :key="index">
      <UBlogPost :ui="{
        root: 'ring-1 rounded-sm shadow-md hover:shadow-lg transition-shadow duration-300 ',
        wrapper: 'mx-auto ',
        body: 'pt-2',
      }" :title="story.title" :to="story.relativeUrl" :description="story.teaser" orientation="vertical" reverse
        :image="story.coverUrl">

      </UBlogPost>
    </template>
  </div>
</template>
<script setup lang="ts">
import type { Sponsor } from '~~/models';
const props = defineProps<{
  sponsor: Sponsor;
}>();
</script>