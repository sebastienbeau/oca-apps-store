<template>
  <div class="relative py-8">
    <div class="w-[100vw+10rem] absolute -left-1/2 -right-1/2 mx-auto top-0 h-full -z-10   bg-primary-500" />
    <img src="/img/oca_logo_bckg_white.png" alt="Illustration"
      class="z-10 w-full absolute -left-100 top-0 opacity-10 h-full object-none object-left" />
    <UPageCTA :title="$t('sponsors.testimonial.title')" :description="sponsor.descriptionWhyOca"
      orientation="horizontal"
      :ui="{
        root: 'ring-0 bg-primary-500',
        header: 'flex flex-col justify-center ',
        container: 'md:flex lg:flex',
        title: 'text-white sm:text-6xl font-extralight py-10',
        description: 'text-white mx-auto text-lg mt-4',
      }">
      <template #description>
        <div class="md:grid md:grid-cols-10">
          <div class="md:col-span-1">
            <icon name="fe:quote-left" class="text-white text-6xl mb-4" />
          </div>
          <div class="md:col-span-9">
            <p class="text-white text-lg">{{ sponsor.descriptionWhyOca }}</p>
          </div>
        </div>
        <div class="mt-6 w-full ml-auto">
          <UUser name="John Doe" description="Software Engineer" size="xl"
            :ui="{ root: 'justify-end mr-8 mt-8', name: 'text-white', description: 'line-clamp-1' }" :avatar="{
              src: 'https://i.pravatar.cc/150?u=john-doe2',
              icon: 'i-lucide-image'
            }" />
        </div>
      </template>

    </UPageCTA>
  </div>

</template>
<script setup lang="ts">
const props = defineProps<{
  sponsor: Sponsor;
}>();
</script>