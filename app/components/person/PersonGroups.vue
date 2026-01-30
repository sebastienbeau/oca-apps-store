<template>
  <h3 class="font-bold text-2xl py-4">{{ $t('person.psc.title') }}</h3>
  <div class="md:grid  grid-cols-2 gap-2 md:gap-6">
    <div class="flex flex-wrap gap-6 ">
      <template v-for="psc in person.pscList" :key="psc.id">
        <PersonPsc :psc="psc" />
      </template>
    </div>
    <div class="flex flex-wrap gap-2 md:gap-6 ">
      <PersonWorkGroup v-for="group in person.workGroupList" :key="group.id" :group="group" />
    </div>

  </div>

</template>
<script setup lang="ts">
const props = defineProps({
  person: {
    type: Object,
    required: true,
  },
});

</script>