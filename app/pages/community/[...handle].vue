<template>
    <div class="py-8">
        <PersonHeroBanner :person="person" />
    </div>
    <div class="py-8 relative ">
        <div class="background-style">
            <div class="d-block mx-w-sm mx-auto">
                <PersonGroups :person="person" />
            </div>


        </div>
    </div>

</template>
<script lang="ts" setup>
import { persons } from '~/data/persons';
const person = ref()
const urlParams = useRoute().params;
console.log(useRoute().params);
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
