<script setup lang="ts">
import { ref, onMounted } from 'vue';
import images from '../components/images/image_data.js';

interface ImageData {
  id: number | string;
  title: string;
  author: string;
  description: string;
  url: { small: string; large: string };
  dimensions: { width: number; height: number };
}

const maxColumns = 8;
const columns = ref<Array<ImageData[]>>(Array.from({ length: maxColumns }, () => []));

function distributeImages() {
  for (let i = 0; i < maxColumns; i++) columns.value[i] = [];
  images.forEach((img: ImageData, idx: number) => {
    columns.value[idx % maxColumns].push(img);
  });
}

onMounted(() => {
  distributeImages();
});
</script>

<template>
  <div class="masonry-container">
    <div v-for="(col, colIdx) in columns" :key="colIdx" class="masonry-column">
      <div v-for="img in col" :key="img.id" class="masonry-card">
        <img :src="img.url.small" :alt="img.title" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.masonry-container {
  display: flex;
  gap: 16px;
  width: 100vw;
  padding: 24px 0;
  box-sizing: border-box;
  align-items: flex-start;
  justify-content: center;
}
.masonry-column {
  flex: 1 1 0;
  display: flex;
  flex-direction: column;
  gap: 16px;
  min-width: 120px;
}
.masonry-card img {
  width: 100%;
  border-radius: 16px;
  display: block;
  box-shadow: 0 2px 8px rgba(0,0,0,0.07);
}
@media (max-width: 1400px) {
  .masonry-container { gap: 12px; }
  .masonry-column { min-width: 100px; }
}
@media (max-width: 1100px) {
  .masonry-container { gap: 8px; }
  .masonry-column { min-width: 80px; }
}
@media (max-width: 900px) {
  .masonry-container { gap: 6px; }
  .masonry-column { min-width: 60px; }
}
@media (max-width: 700px) {
  .masonry-container { flex-wrap: wrap; }
  .masonry-column { min-width: 40px; }
}
@media (max-width: 600px) {
  .masonry-container { gap: 4px; padding: 8px 0; }
  .masonry-column { min-width: 0; }
}
</style>

