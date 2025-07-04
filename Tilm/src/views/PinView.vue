<template>
  <div>
    <TumblrHeader />
    <div class="container">
      <div class="pin-details" v-if="pin">
        <img :src="pin.image" :alt="pin.title" />
        <h2>{{ pin.title }}</h2>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { usePinsStore } from '../stores/pins'
import TumblrHeader from '../components/AppHeader.vue'

const route = useRoute()
const pinsStore = usePinsStore()

const pin = computed(() => {
  return pinsStore.allPins.find(p => p.id === Number(route.params.id))
})
</script>

<style scoped>
.container {
  padding: 1rem;
}

.pin-details img {
  max-width: 100%;
  border-radius: 0.5rem;
}
</style>
