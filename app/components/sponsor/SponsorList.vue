<template>
  <UPageGrid class="lg:grid-cols-2 xl:grid-cols-2">
    <SponsorHit v-for="sponsor in sponsors" :key="sponsor.id" :sponsor="sponsor" />
  </UPageGrid>
</template>
<script lang="ts" setup>
import type { Sponsor } from '~~/models';

const props = defineProps<{
  sponsors: Sponsor[];
}>();

</script>