<template>
  <div>
    <MDC
      v-if="module.readmeFragments?.contributors"
      :value="module.readmeFragments.contributors"
    />
  </div>
</template>

<script setup lang="ts">
import type { Module } from '~~/models'

const props = defineProps<{
  module: Module
}>()
</script>
