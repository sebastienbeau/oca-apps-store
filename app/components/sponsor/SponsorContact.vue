<template>


  <div class="flex flex-col md:flex-row md:items-center gap-2 w-full text-primary-500 ">
    <div class="flex md:items-center gap-1">
      <UIcon name="mail" class="text-gray-500" />
      <ULink v-if="sponsor.email" :to="`mailto:${sponsor.email}`" class="text-sm text-primary-500 hover:underline">
        {{ sponsor.email }}
      </ULink>
    </div>
    <div v-if="sponsor.phone" class="flex items-center gap-2">
      <UIcon name="phone" class="text-primary-500 " />
      <p class="text-sm">{{ sponsor.phone }}</p>
    </div>

    <div v-if="sponsor.website" class="flex items-center gap-1">
      <UIcon name="website" class="text-gray-500" />
      <ULink :to="sponsor.website" target="_blank" class="text-sm text-primary-500  hover:underline">
        {{ sponsor.websiteLabel }}
      </ULink>
    </div>

  </div>


</template>
<script setup lang="ts">
import type { Sponsor } from '~~/models';
const props = defineProps<{
  sponsor: Sponsor;
}>();
</script>