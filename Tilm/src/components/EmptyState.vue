<template>
  <div class="empty-state">
    <div class="empty-icon">📊</div>
    <h3 class="empty-title">{{ title }}</h3>
    <p class="empty-description">{{ description }}</p>
  </div>
</template>

<script setup lang="ts">
interface Props {
  title?: string;
  description?: string;
}

const props = withDefaults(defineProps<Props>(), {
  title: 'No Data Available',
  description: 'Enter a symbol and search for price information.'
});
</script>

<style scoped>
.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 48px 24px;
  text-align: center;
  position: relative;
  top: 100px;
}

.empty-icon {
  font-size: 3em;
  margin-bottom: 16px;
  opacity: 0.6;
}

.empty-title {
  color: #2d3748;
  font-size: 1.3em;
  font-weight: 600;
  margin: 0 0 8px 0;
}

.empty-description {
  color: #718096;
  font-size: 1em;
  margin: 0;
  max-width: 300px;
  line-height: 1.5;
}
</style> 