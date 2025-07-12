<template>
  <div class="search-bar">
    <span class="icon">🔍</span>
    <input type="text" placeholder="Search" class="search-input" />
  </div>
</template>

<script setup lang="ts">
// Search bar component
</script>

<style scoped>
.search-bar {
  display: flex;
  align-items: center;
  background: #fff;
  border-radius: 20px;
  box-shadow: 0 1px 4px rgba(0,0,0,0.06);
  padding: 4px 16px;
  min-width: 240px;
  max-width: 340px;
}
.icon {
  font-size: 18px;
  margin-right: 8px;
  color: #888;
}
.search-input {
  border: none;
  outline: none;
  font-size: 16px;
  background: transparent;
  width: 100%;
  color: #222;
}
</style> 