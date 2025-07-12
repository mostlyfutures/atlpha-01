<template>
  <div class="error-message">
    <div class="error-icon">⚠️</div>
    <p class="error-text">{{ message }}</p>
  </div>
</template>

<script setup lang="ts">
interface Props {
  message: string;
}

const props = defineProps<Props>();
</script>

<style scoped>
.error-message {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 32px;
  text-align: center;
}

.error-icon {
  font-size: 2em;
  margin-bottom: 16px;
}

.error-text {
  color: #e53e3e;
  font-weight: 600;
  font-size: 1.1em;
  margin: 0;
  max-width: 400px;
}
</style> 