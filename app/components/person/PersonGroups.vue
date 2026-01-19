<template>
<h3 class="font-bold text-2xl">{{ $t('person.psc.title') }}</h3>
  <div class="md:grid md:grid-cols-2 grid-cols-1">
     <div class="grid md:grid-cols-2 gap-2 grid-cols-1">
      <template v-for="psc in person.pscList" :key="psc.id">
        <PersonPsc :psc="psc" />
      </template>
     </div>
      <div class="md:grid md:grid-cols-2 gap-2 grid-cols-1 ">
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