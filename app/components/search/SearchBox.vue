<template>
  <UInput
    v-model="value"
    :placeholder="typewriterPlaceholder"
    color="neutral"
    size="lg"
    trailing-icon="search"
    class="w-full"
  />
</template>

<script setup lang="ts">
const { t } = useI18n()
const props = defineProps<{
  icon?: string
  placeholder?: string[]
}>()
const value = defineModel({
  type: String,
  default: '',
})
/** Typewritter effect */
const typewriterTexts = props?.placeholder || []
const typewriterIndex = ref(0)
const typewriterPlaceholder = ref(typewriterTexts[0])
let charIndex = 0
let typing = true

function typeWriterEffect() {
  const currentText = typewriterTexts[typewriterIndex.value] || ''
  if (typing) {
    if (charIndex < currentText.length) {
      typewriterPlaceholder.value = currentText.slice(0, charIndex + 1)
      charIndex++
      setTimeout(typeWriterEffect, 40)
    } else {
      typing = false
      setTimeout(typeWriterEffect, 8000)
    }
  } else {
    if (charIndex > 0) {
      typewriterPlaceholder.value = currentText.slice(0, charIndex - 1)
      charIndex--
      setTimeout(typeWriterEffect, 30)
    } else {
      typing = true
      typewriterIndex.value =
        (typewriterIndex.value + 1) % typewriterTexts.length
      setTimeout(typeWriterEffect, 400)
    }
  }
}

onMounted(() => {
  typeWriterEffect()
})
</script>
