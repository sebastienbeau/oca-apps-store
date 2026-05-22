<template>
  <div class="subpixel-antialiased">
    <AppHeader />
    <UContainer class="max-md:overflow-x-hidden">
      <slot />
      <AppBottomNav />
    </UContainer>
    <AppFooter />
  </div>
</template>

<script setup lang="ts"></script> 
