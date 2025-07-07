<script setup lang="ts">
import { RouterView } from 'vue-router'
import TumblrHeader from './components/AppHeader.vue'
</script>

<template>
  <div class="app-container">
    <!-- Persistent header at the top -->
    <TumblrHeader />
    
    <!-- Main content area -->
    <main class="main-content">
      <RouterView />
    </main>
  </div>
</template>

<style scoped>
.app-container {
  min-height: 100vh;
}

.main-content {
  padding-top: 80px; /* Height of the fixed app header */
}
</style>
