<template>
  <div
    v-if="person"
    class="mx-auto grid grid-cols-1 gap-2 md:grid-cols-1 md:gap-10 md:px-8"
    :class="displayGrid"
  >
    <!-- <div class="md:py-4"  v-if="person?.pscList && person.pscList.length > 0" >

      <h3 class="text-3xl text-primary text-center md:text-start pb-6">
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

    <div
      v-if="person?.workGroupList && person.workGroupList.length > 0"
      class="md:py-4"
    >
      <h3 class="pb-6 text-center text-4xl font-bold text-primary">
        {{ $t('person.work_group.title')
        }}<span class="block text-secondary">{{
          $t('person.work_group.title_emphasis')
        }}</span>
      </h3>
      <div
        class="align-stretch flex flex-wrap justify-center gap-2 md:justify-center md:gap-6"
      >
        <template v-for="group in person.workGroupList" :key="group.id">
          <div class="min-h-64 w-full md:w-1/3">
            <PersonWorkGroup :group="group" />
          </div>
        </template>
        <div class="w-full">
          <UEmpty
            :title="t('community.person.cta.groupsAllDescription')"
            variant="naked"
            :ui="{
              title: 'text-xl',
              root: 'min-h-36 ',
            }"
            :actions="[
              {
                label: t('community.person.cta.ctaGroupsInfoLabel'),
                icon: 'lucide:info',
                color: 'secondary',
                to: 'https://odoo-community.org/working-groups',
                target: '_blank',
              },
            ]"
          >
          </UEmpty>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
const { t } = useI18n()
const props = defineProps({
  person: {
    type: Object,
    required: true,
  },
})

const displayGrid = computed(() => {
  if (
    props.person.pscList.length < 2 &&
    props.person.pscList.length > 0 &&
    props.person.workGroupList.length < 2 &&
    props.person.workGroupList.length > 0
  ) {
    return 'grid grid-cols-1 md:grid-cols-2 md:px-8 mx-auto'
  } else {
    return 'grid-cols-1'
  }
})

// const cartSize = computed(() => {
//   if (props.person.pscList.length < 2 && props.person.pscList.length > 0 && props.person.workGroupList.length < 2 && props.person.workGroupList.length > 0) {
//     return 'md:w-full'
//   } else {
//     return 'w-full md:w-1/3'
//   }
// })
</script>
