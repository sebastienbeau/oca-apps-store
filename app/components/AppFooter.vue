<script setup lang="ts">
import type { FooterColumn } from '@nuxt/ui'
const { data: content } = await useAsyncData(`content-footer`, () => {
  return queryCollection('global').all()
})

const columns: FooterColumn[] = [
  {
    label: 'Community',
    children: [
      {
        label: 'Nuxters',
        to: 'https://nuxters.nuxt.com',
        target: '_blank',
      },
      {
        label: 'Video Courses',
        to: 'https://masteringnuxt.com/nuxt3?ref=nuxt',
        target: '_blank',
      },
      {
        label: 'Nuxt on GitHub',
        to: 'https://github.com/nuxt',
        target: '_blank',
      },
    ],
  },
  {
    label: 'Solutions',
    children: [
      {
        label: 'Nuxt Content',
        to: 'https://content.nuxt.com/',
        target: '_blank',
      },
      {
        label: 'Nuxt DevTools',
        to: 'https://devtools.nuxt.com/',
        target: '_blank',
      },
      {
        label: 'Nuxt Image',
        to: 'https://image.nuxt.com/',
        target: '_blank',
      },
      {
        label: 'Nuxt UI',
        to: 'https://ui.nuxt.com/',
        target: '_blank',
      },
    ],
  },
]
</script>

<template>
  <UContainer>
    <USeparator class="my-10" />
    <UFooterColumns :columns="columns">
      <template #left>
        <Logo class="w-24" />
        {{ content }}
      </template>
    </UFooterColumns>
  </UContainer>
</template>
