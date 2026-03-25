<template>
 
  <div v-if="person" class=" gap-2 md:gap-10 grid grid-cols-1 md:grid-cols-1 md:px-8 mx-auto" :class="displayGrid">
    <!-- <div class="md:py-4"  v-if="person?.pscList && person.pscList.length > 0" >

      <h3 class="text-3xl text-primary-500 text-center md:text-start pb-6">
        <span class="block text-secondary"> (PSC)</span>
        {{ $t('person.psc.title') }} 
        </h3>
      <div  class="flex flex-wrap gap-6 justify-center  md:justify-start">
 
       <template v-for="psc in person.pscList" :key="psc.id">
        <div :class="cartSize" class="min-h-64">
          <PersonPsc :psc="psc" />
        </div>
        </template>

      </div>
    </div> -->
 
    <div v-if="person?.workGroupList && person.workGroupList.length > 0" class="md:py-4">
      <h3 class=" text-4xl text-center  font-bold text-primary-500 pb-6 ">{{ $t('person.work_group.title') }}<span class="block text-secondary ">{{ $t('person.work_group.title_emphasis') }}</span></h3>
      <div class="flex flex-wrap gap-2 md:gap-6 md:justify-center justify-center">
        <template v-for="group in person.workGroupList" :key="group.id">
          <div :class="cartSize"class="w-full md:w-1/4 min-h-64">
            <PersonWorkGroup :group="group"/>
          </div>
        </template>
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

const displayGrid = computed(() => {
  if (props.person.pscList.length < 2 && props.person.pscList.length > 0 && props.person.workGroupList.length < 2 && props.person.workGroupList.length > 0) {
    return 'grid grid-cols-1 md:grid-cols-2 md:px-8 mx-auto'
  } else {
    return 'grid-cols-1'
  }
})

const cartSize = computed(() => {
  if (props.person.pscList.length < 2 && props.person.pscList.length > 0 && props.person.workGroupList.length < 2 && props.person.workGroupList.length > 0) {
    return 'md:w-full'
  } else {
    return 'w-full md:w-1/4'
  }
})
</script>
