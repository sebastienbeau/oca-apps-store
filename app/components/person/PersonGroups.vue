<template>
 
  <div v-if="person" class=" gap-2 md:gap-4">
    <div class="md:py-6"  v-if="person?.pscList && person.pscList.length > 0" >
      <h3 class="font-bold text-2xl text-primary-500 text-center pb-8">{{ $t('person.psc.title') }}</h3>
      <div  class="flex flex-wrap gap-6 justify-center ">
 
       <template v-for="psc in person.pscList" :key="psc.id">
          <PersonPsc :psc="psc" />
        </template>

      </div>
    </div>
    <div v-if="person?.workGroupList && person.workGroupList.length > 0" class="md:py-6">
      <h3 class="font-bold text-2xl text-center text-primary-500 pb-8">{{ $t('person.work_group.title') }}</h3>
      <div class="flex flex-wrap gap-2 md:gap-6 md:justify-center">
        <PersonWorkGroup
          v-for="group in person.workGroupList"
          :key="group.id"
          :group="group"
        />
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
const props = defineProps({
  person: {
    type: Object,
    required: true,
  },
})
</script>
