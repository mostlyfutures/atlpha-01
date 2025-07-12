<template>
  <div class="screener-background">
    <slot />
  </div>
</template>

<script setup lang="ts">
// ScreenerBackground component - provides a flex grey background wrapper
</script>

<style scoped>
.screener-background {
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  background: #f8f9fa;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  padding: 32px 16px;
  font-family: 'Inter', Arial, sans-serif;
  overflow-y: auto;
  overflow-x: hidden;
}

@media (max-width: 768px) {
  .screener-background {
    padding: 24px 12px;
  }
}
</style> 