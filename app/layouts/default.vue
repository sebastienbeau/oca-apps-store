<template>
  <div class="subpixel-antialiased">
    <AppHeader />
    <UContainer class="">
      <slot />
      <AppBottomNav />
    </UContainer>
    <AppFooter />
  </div>
</template>

<script setup lang="ts"></script>
