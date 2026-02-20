<template>
  <div class="flex flex-col  gap-4">
    <div v-for="user in module?.contributors" :key="user.name" class="flex justify-between items-start gap-2">
      <UUser :name="user.name" :description="user?.company" :avatar="{
        src: user?.avatar,
        alt: user.name,
      }" size="md">
        <template #actions>
          HELLO
        </template>
      </UUser>
      <UButton v-if="user?.email" size="sm" variant="link" icon="i-ph-envelope" :href="`mailto:${user.email}`"
        target="_blank" />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Module } from '~/models';

const props = defineProps<{
  module: Module
}>()

</script>
