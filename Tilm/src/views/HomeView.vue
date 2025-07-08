<script setup lang="ts">
import { onMounted } from 'vue';
import { usePinsStore } from '../stores/pins';

const pinsStore = usePinsStore();

onMounted(() => {
  pinsStore.fetchPins();
});
</script>

<template>
  <main class="main-content">
    <!-- Masonry Grid Layout -->
    <ImageGrid :images="pinsStore.displayedPins" />
  </main>
</template>

<style scoped>
.main-content {
  /* Remove padding-top since it's now handled in App.vue */
}
</style>
