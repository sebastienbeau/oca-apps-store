

<template>
  <div class="relative" >
    <div class=" overflow-hidden background-style" :class="`${backgroundImg}-image`">
      <UPageCTA :title="sponsorship?.title || 'Become a Gold Sponsor'"
        description="We've built a strong, lasting partnership. Their trust is our driving force, propelling us towards shared success."
        variant="soft" class=" " :links="links" :ui="{
          root: 'w-full bg-transparent',
          container: ' ',
          wrapper: 'flex flex-row',
          header: 'mr-8',
          title: 'text-left',
          description: 'text-left',
          links: 'justify-end',
        }">

      </UPageCTA>
    </div>

  </div>

</template>
<script setup lang="ts">

  const props = defineProps<{
  sponsorship: {
    level: string | "gold"
    title: string | "Become a Gold Sponsor"
    description: string | "We've built a strong, lasting partnership. Their trust is our driving force, propelling us towards shared success."
    links: [{
      label: string | 'Become a Sponsor',
      color: string | 'primary',
      variant: string | 'solid',
      trailingIcon: string | 'ion:rocket-outline',
    }]

  }
}>()
const links = ref([

  {
    label: 'Become a Sponsor',
    color: 'primary',
    variant: 'solid',
    trailingIcon: 'ion:rocket-outline',
  }
])
const backgroundImg = computed(() => {
  return [
    `${props.sponsorship?.level || "gold"}`,
  ]
})
</script>
<style scoped >
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
  }

.platinum-image::before {
  background-color: #fafbfa;
}
.gold-image::before {
  background-color: #fffbf5;
}
.silver-image::before {
  background-color: #fafbfa;
}
.bronze-image::before {
  background-color: #faf7f0;
}


</style>
