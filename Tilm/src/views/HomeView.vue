<script setup lang="ts">
import TumblrHeader from '../components/AppHeader.vue'
import MasonryGrid from '../components/MasonryGrid.vue'
import Pin from '../components/Pin.vue'
import { usePinsStore } from '../stores/pins'
import { storeToRefs } from 'pinia'
import { onMounted, onUnmounted, ref, watch } from 'vue'

const pinsStore = usePinsStore()
const { displayedPins } = storeToRefs(pinsStore)
const masonryGridRef = ref<{ reDraw: () => void } | null>(null)

// Fetch initial pins when the component is mounted
pinsStore.fetchPins()

watch(displayedPins, () => {
  if (masonryGridRef.value) {
    masonryGridRef.value.reDraw()
  }
}, { deep: true })

const handleScroll = () => {
  const buffer = 200; // Pixels from bottom to trigger load
  const isAtBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - buffer;

  if (isAtBottom) {
    pinsStore.loadMorePins();
  }
};

onMounted(() => {
  window.addEventListener('scroll', handleScroll);
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
});
</script>

<template>
  <main class="main-content">
    <TumblrHeader />
    <div class="banner-container">
      <img src="/images/IMG_3121.JPG" alt="Park with trees" class="banner-image">
    </div>
    <div class="container">
      <MasonryGrid :items="displayedPins" ref="masonryGridRef">
        <Pin v-for="pin in displayedPins" :key="pin.id" :pin="pin" />
      </MasonryGrid>
    </div>
  </main>
</template>

<style scoped>
.main-content {
  padding-top: 80px; /* Height of the fixed app header */
}

.banner-container {
  width: 100%;
  overflow: hidden;
  margin-bottom: 1rem;
}

.banner-image {
  width: 100%;
  height: auto;
  max-height: 350px;
  object-fit: cover;
  display: block;
}

.container {
  padding: 1rem;
  width: 100%;
}
</style>
