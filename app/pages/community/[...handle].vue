<template>
  <div class="py-8">
    <PersonHeroBanner :person="person" />
  </div>
  <div class="py-8 relative ">
    <div class="w-[100vw+10rem] absolute -left-1/2 -right-1/2 mx-auto top-0 h-[120%] -z-10 -rotate-3"
      style="background-color: #fffbf5 " />
    <div class="d-block mx-w-sm mx-auto">
      <PersonGroups :person="person" />
    </div>



  </div>

</template>
<script lang="ts" setup>
import { persons } from '~/data/persons';
const person = ref()
const urlParams = useRoute().params;
person.value = persons.find((person) =>
  person.username === urlParams.handle?.[0]
);


</script>
<style scoped>
.background-style::before {
  content: "";
  position: absolute;
  top: 0;
  left: -50%;
  right: -50%;
  bottom: 0;
  background-position: center;
  background-repeat: no-repeat;
  z-index: -1;
  background-color: #fffbf5;

}
</style>
