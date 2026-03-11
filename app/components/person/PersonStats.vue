<template>


  <div v-if="person?.collaboratorIndex" class="flex items-center gap-1 ">
    <UIcon name="award" color="primary" />
    <span class="">OCA Collaborator index: </span>
    <span class="text-error">{{ person.collaboratorIndex }}</span>
  </div>

  <div v-if="person?.modulesMaintained" class="flex items-center gap-1 ">
    <UIcon name="module" color="primary" />
    <span class="text-error">{{ person.modulesMaintained }}</span>
    <span class=""> Modules maintained</span>
  </div>
  <div v-if="person?.translations" class="flex items-center gap-1 ">
    <UIcon name="translation" class="" color="primary" />
    <span class="text-error">{{ person.translations }}</span>
    <span class=""> Translations</span>
  </div>
  <div v-if="person?.psc" class="flex items-center gap-1  mb-2">
    <UIcon name="psc" color="primary" />
    <span class="text-error">{{ person.psc }}</span>
    <span class="">PSC</span>
  </div>


</template>
<script setup lang="ts">
import type { Person } from '~~/models';

const props = defineProps<{
  person: Person
}>()
</script>