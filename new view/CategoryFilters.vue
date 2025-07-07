
<template>
  <div class="flex flex-wrap justify-center gap-2">
    <button
      v-for="category in categories"
      :key="category"
      :class="[
        'rounded-full transition-colors duration-200',
        activeFilter === category
          ? 'bg-primary text-primary-foreground'
          : 'bg-secondary text-secondary-foreground',
      ]"
      @click="onFilterChange(category)"
    >
      {{ category }}
    </button>
  </div>
</template>

<script setup lang="ts">
import { cn } from '@/lib/utils';

const props = defineProps<{
  categories: string[];
  activeFilter: string;
}>();

const emit = defineEmits<{ (e: 'filter-change', category: string): void }>();

const onFilterChange = (category: string) => {
  emit('filter-change', category);
};
</script>
