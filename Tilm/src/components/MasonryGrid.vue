<template>
  <masonry-css ref="masonryRef" :cols="{ default: 5, 1200: 4, 900: 3, 600: 2 }" :gap="gap">
    <slot></slot>
  </masonry-css>
</template>

<script setup lang="ts">
import { defineProps, ref, onMounted, watch, nextTick, defineExpose } from 'vue'
import MasonryCss from 'vue-masonry-css'

const props = defineProps({
  gap: { type: Number, default: 16 },
  items: { type: Array, required: true }
})

const masonryRef = ref<{ reDraw: () => void } | null>(null)

const reDraw = () => {
  nextTick(() => {
    if (masonryRef.value && masonryRef.value.reDraw) {
      masonryRef.value.reDraw()
    }
  })
}

// Watch for changes in the items prop to trigger a re-layout
watch(() => props.items.length, () => {
  reDraw()
}, { immediate: true }) // immediate: true to run on initial mount

onMounted(() => {
  reDraw() // Initial layout on mount
})

defineExpose({
  reDraw
})
</script>

<style scoped>
/* No specific styles needed for .masonry-grid here, as vue-masonry-css handles it */
</style>