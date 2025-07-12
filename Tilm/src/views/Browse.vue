<script setup lang="ts">
import { ref, onMounted } from 'vue';
import MasonryGrid from '../components/MasonryGrid.vue';
import images from '../components/images/image_data.ts';

interface ImageData {
  id: number | string;
  title: string;
  author: string;
  description: string;
  url: { small: string; large: string };
  dimensions: { width: number; height: number };
}

const imageData = ref<ImageData[]>(images);

onMounted(() => {
  console.log('[Browse] Images loaded:', images);
  console.log('[Browse] Sample image:', images[0]);
  console.log('[Browse] Images length:', images.length);
  console.log('[Browse] Image data structure check:', {
    hasUrl: !!images[0]?.url,
    hasSmallUrl: !!images[0]?.url?.small,
    hasTitle: !!images[0]?.title,
    hasAuthor: !!images[0]?.author
  });
});
</script>

<template>
  <div class="browse-page">
    <MasonryGrid :images="imageData" />
  </div>
</template>

<style scoped>
.browse-page {
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
}
</style>

