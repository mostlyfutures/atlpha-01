<template>
  <div class="container mx-auto">
    <MasonryGrid :items="images" :gap="16">
      <template v-slot:default="{ item }">
        <Pin :pin="item" />
      </template>
    </MasonryGrid>
  </div>
</template>

<script setup lang="ts">
import MasonryGrid from './MasonryGrid.vue';
import Pin from './Pin.vue';
import { Pin as PinType } from '../stores/pins';

const props = defineProps<{
  images: PinType[];
}>();
</script>

<style scoped>
.container {
  max-width: 1200px;
  margin-left: auto;
  margin-right: auto;
}
</style>