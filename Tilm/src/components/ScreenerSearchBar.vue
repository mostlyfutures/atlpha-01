<template>
  <div class="screener-search-bar" :class="{ 'focused': isFocused }">
    <span class="search-icon">🔍</span>
    <input 
      v-model="searchValue"
      type="text" 
      :placeholder="placeholderText"
      class="search-input"
      @focus="handleFocus"
      @blur="handleBlur"
      @input="handleInput"
    />
    <button 
      v-if="searchValue" 
      class="clear-button" 
      @click="clearSearch"
      type="button"
    >
      ✕
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue';

interface Props {
  modelValue?: string;
  placeholder?: string;
}

interface Emits {
  (e: 'update:modelValue', value: string): void;
  (e: 'search', value: string): void;
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: '',
  placeholder: 'Search by symbol or name'
});

const emit = defineEmits<Emits>();

const searchValue = ref(props.modelValue);
const isFocused = ref(false);

const placeholderText = computed(() => {
  return isFocused.value ? '' : props.placeholder;
});

function handleFocus() {
  isFocused.value = true;
}

function handleBlur() {
  isFocused.value = false;
}

function handleInput() {
  emit('update:modelValue', searchValue.value);
}

function clearSearch() {
  searchValue.value = '';
  emit('update:modelValue', '');
  emit('search', '');
}

// Watch for external modelValue changes
watch(() => props.modelValue, (newValue: string) => {
  searchValue.value = newValue;
});
</script>

<style scoped>
.screener-search-bar {
  display: flex;
  align-items: center;
  background: #ffffff;
  border: 2px solid #e2e8f0;
  border-radius: 12px;
  padding: 12px 16px;
  min-width: 320px;
  max-width: 480px;
  transition: all 0.2s ease;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.screener-search-bar.focused {
  border-color: #3730a3;
  box-shadow: 0 0 0 3px rgba(55, 48, 163, 0.1);
}

.search-icon {
  font-size: 18px;
  margin-right: 12px;
  color: #64748b;
  flex-shrink: 0;
}

.search-input {
  border: none;
  outline: none;
  font-size: 16px;
  background: transparent;
  width: 100%;
  color: #1e293b;
  font-weight: 500;
}

.search-input::placeholder {
  color: #94a3b8;
  font-weight: 400;
}

.clear-button {
  background: none;
  border: none;
  color: #64748b;
  font-size: 16px;
  cursor: pointer;
  padding: 4px;
  border-radius: 4px;
  margin-left: 8px;
  flex-shrink: 0;
  transition: all 0.2s ease;
}

.clear-button:hover {
  background: #f1f5f9;
  color: #475569;
}

@media (max-width: 640px) {
  .screener-search-bar {
    min-width: 280px;
    padding: 10px 14px;
  }
  
  .search-input {
    font-size: 15px;
  }
}
</style> 