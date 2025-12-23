<template>
    <NuxtLink :to="localePath('/')" class="flex items-center space-x-2">
        <img src="/oca-logo.png" alt="Logo" class="max-w-24" />
    </NuxtLink>
</template>

<script setup lang="ts">
const localePath = useLocalePath()
</script>
