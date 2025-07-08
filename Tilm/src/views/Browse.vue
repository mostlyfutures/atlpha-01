<script setup lang="ts">
import { ref, onMounted } from 'vue';

// Define image type
interface ImageData {
  id: string;
  url_small: string;
}

// Sample image data (from image_data.js)
const images: ImageData[] = [
  { id: "2835973", url_small: "https://images.pexels.com/photos/2835973/pexels-photo-2835973.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=350" },
  { id: "358457", url_small: "https://images.pexels.com/photos/358457/pexels-photo-358457.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=450" },
  { id: "167699", url_small: "https://images.pexels.com/photos/167699/pexels-photo-167699.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=500" },
  { id: "3225517", url_small: "https://images.pexels.com/photos/3225517/pexels-photo-3225517.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=400" },
  { id: "210186", url_small: "https://images.pexels.com/photos/210186/pexels-photo-210186.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=300" },
  { id: "1054218", url_small: "https://images.pexels.com/photos/1054218/pexels-photo-1054218.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=350" },
  { id: "2440061", url_small: "https://images.pexels.com/photos/2440061/pexels-photo-2440061.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=450" },
  { id: "1528640", url_small: "https://images.pexels.com/photos/1528640/pexels-photo-1528640.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=500" },
  { id: "1287145", url_small: "https://images.pexels.com/photos/1287145/pexels-photo-1287145.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=300" },
  { id: "2662116", url_small: "https://images.pexels.com/photos/2662116/pexels-photo-2662116.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=400" },
  { id: "147411", url_small: "https://images.pexels.com/photos/147411/pexels-photo-147411.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=350" },
  { id: "2387418", url_small: "https://images.pexels.com/photos/2387418/pexels-photo-2387418.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=450" },
  { id: "933054", url_small: "https://images.pexels.com/photos/933054/pexels-photo-933054.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=500" },
  { id: "206359", url_small: "https://images.pexels.com/photos/206359/pexels-photo-206359.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=300" },
  { id: "1647962", url_small: "https://images.pexels.com/photos/1647962/pexels-photo-1647962.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=400" }
];

const maxColumns = 8;
const columns = ref<Array<ImageData[]>>(Array.from({ length: maxColumns }, () => []));

function distributeImages() {
  // Clear columns
  for (let i = 0; i < maxColumns; i++) columns.value[i] = [];
  images.forEach((img, idx) => {
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
        <img :src="img.url_small" alt="" />
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

