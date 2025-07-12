<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed, watch, nextTick } from 'vue';

interface ImageData {
  id: number | string;
  title: string;
  author: string;
  description: string;
  url: { small: string; large: string };
  dimensions: { width: number; height: number };
}

interface Props {
  images: ImageData[];
}

const props = defineProps<Props>();

// Debug state
const debugMode = ref(false); // Disabled by default for cleaner view
const debugInfo = ref({
  screenWidth: 0,
  columnCount: 0,
  containerWidth: 0,
  columnWidths: [] as number[],
  imageCount: 0,
  browser: '',
  renderTime: 0
});

const containerRef = ref<HTMLElement>();
const screenWidth = ref(window.innerWidth);
const columns = ref<Array<ImageData[]>>([]);
const isLoading = ref(true);

// Browser detection for compatibility
const detectBrowser = () => {
  const userAgent = navigator.userAgent;
  if (userAgent.includes('Chrome') && !userAgent.includes('Edg')) return 'Chrome';
  if (userAgent.includes('Firefox')) return 'Firefox';
  if (userAgent.includes('Safari') && !userAgent.includes('Chrome')) return 'Safari';
  if (userAgent.includes('Edg')) return 'Edge';
  if (userAgent.includes('OPR') || userAgent.includes('Opera')) return 'Opera';
  return 'Unknown';
};

// Dynamic column calculation - Pinterest-style
const columnCount = computed(() => {
  const width = screenWidth.value;
  let cols;
  
  // Pinterest-like column calculation for full screen usage
  if (width >= 2400) cols = 10;      // Ultra-wide screens
  else if (width >= 2000) cols = 9;   // Very wide screens
  else if (width >= 1800) cols = 8;   // Wide screens
  else if (width >= 1600) cols = 7;   // Large desktops
  else if (width >= 1400) cols = 6;   // Standard desktops
  else if (width >= 1200) cols = 5;   // Small desktops
  else if (width >= 1000) cols = 4;   // Large tablets
  else if (width >= 768) cols = 3;    // Tablets
  else if (width >= 480) cols = 2;    // Mobile landscape
  else cols = 1;                      // Mobile portrait
  
  return cols;
});

// Global resize timeout for debouncing
let resizeTimeout: number | undefined;

const handleResize = () => {
  const startTime = performance.now();
  screenWidth.value = window.innerWidth;
  
  // Debounce resize for better performance
  if (resizeTimeout) {
    clearTimeout(resizeTimeout);
  }
  resizeTimeout = setTimeout(() => {
    distributeImages();
    updateDebugInfo();
    debugInfo.value.renderTime = performance.now() - startTime;
  }, 100);
};

function distributeImages() {
  const startTime = performance.now();
  const cols = columnCount.value;
  columns.value = Array.from({ length: cols }, () => []);
  
  if (props.images && props.images.length > 0) {
    props.images.forEach((img: ImageData, idx: number) => {
      columns.value[idx % cols].push(img);
    });
  }
  
  debugInfo.value.renderTime = performance.now() - startTime;
  console.log(`[MasonryGrid] Distributed ${props.images?.length || 0} images into ${cols} columns in ${debugInfo.value.renderTime.toFixed(2)}ms`);
}

function updateDebugInfo() {
  const container = containerRef.value;
  debugInfo.value = {
    screenWidth: screenWidth.value,
    columnCount: columnCount.value,
    containerWidth: container?.offsetWidth || 0,
    columnWidths: [],
    imageCount: props.images?.length || 0,
    browser: detectBrowser(),
    renderTime: debugInfo.value.renderTime
  };
  
  // Get column widths for debugging
  if (container) {
    const columnElements = container.querySelectorAll('.masonry-column');
    debugInfo.value.columnWidths = Array.from(columnElements).map(col => (col as HTMLElement).offsetWidth);
  }
}

// Watch for changes with debugging
watch(() => props.images, (newImages, oldImages) => {
  console.log('[MasonryGrid] Images prop changed:', {
    oldCount: oldImages?.length || 0,
    newCount: newImages?.length || 0,
    firstImage: newImages?.[0]
  });
  distributeImages();
  updateDebugInfo();
}, { immediate: true });

watch(columnCount, (newCount, oldCount) => {
  console.log(`[MasonryGrid] Column count changed from ${oldCount} to ${newCount}`);
  distributeImages();
  updateDebugInfo();
});

onMounted(async () => {
  console.log('[MasonryGrid] Component mounted');
  debugInfo.value.browser = detectBrowser();
  
  await nextTick();
  distributeImages();
  updateDebugInfo();
  
  // Add resize listener with passive option for better performance
  window.addEventListener('resize', handleResize, { passive: true });
  
  // Mark as loaded after a short delay to ensure images start loading
  setTimeout(() => {
    isLoading.value = false;
  }, 100);
  
  console.log('[MasonryGrid] Setup complete', debugInfo.value);
});

onUnmounted(() => {
  console.log('[MasonryGrid] Component unmounted');
  window.removeEventListener('resize', handleResize);
  if (resizeTimeout) {
    clearTimeout(resizeTimeout);
  }
});
</script>

<template>
  <div class="masonry-wrapper">
    <!-- Debug Panel (only shows when debugMode is true) -->
    <div v-if="debugMode" class="debug-panel">
      <h3>Masonry Debug Info</h3>
      <div class="debug-grid">
        <div>Screen Width: {{ debugInfo.screenWidth }}px</div>
        <div>Columns: {{ debugInfo.columnCount }}</div>
        <div>Container Width: {{ debugInfo.containerWidth }}px</div>
        <div>Images: {{ debugInfo.imageCount }}</div>
        <div>Browser: {{ debugInfo.browser }}</div>
        <div>Render Time: {{ debugInfo.renderTime.toFixed(2) }}ms</div>
        <div>Loading: {{ isLoading }}</div>
      </div>
      <div v-if="debugInfo.columnWidths.length" class="column-widths">
        Column Widths: {{ debugInfo.columnWidths.map(w => w + 'px').join(', ') }}
      </div>
    </div>

    <!-- Loading State -->
    <div v-if="isLoading" class="loading-state">
      <div class="loading-spinner"></div>
      <p>Loading images...</p>
    </div>

    <!-- Empty State -->
    <div v-else-if="!props.images || props.images.length === 0" class="empty-state">
      <p>No images to display</p>
      <p class="debug-text">Check console for debugging information</p>
    </div>

    <!-- Masonry Grid -->
    <div 
      v-else
      ref="containerRef" 
      class="masonry-container"
      :class="`browser-${debugInfo.browser.toLowerCase()}`"
    >
      <div 
        v-for="(col, colIdx) in columns" 
        :key="`col-${colIdx}`" 
        class="masonry-column"
        :style="{ '--column-index': colIdx }"
      >
        <div 
          v-for="(img, imgIdx) in col" 
          :key="`img-${img.id}-${imgIdx}`" 
          class="masonry-card"
          :data-column="colIdx"
          :data-position="imgIdx"
        >
          <img 
            :src="img.url.small" 
            :alt="img.title" 
            loading="lazy"
            class="masonry-image"
            @load="console.log(`Image loaded: ${img.title}`)"
            @error="(e) => {
              console.error(`Failed to load image: ${img.title}`, e);
              const target = e.target as HTMLImageElement;
              if (target) {
                target.src = 'https://via.placeholder.com/400x600/f0f0f0/666666?text=Image+Not+Found';
              }
            }"
          />
          <div class="card-overlay">
            <h3 class="card-title">{{ img.title }}</h3>
            <p class="card-author">{{ img.author }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Cross-browser reset and base styles */
* {
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
}

.masonry-wrapper {
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  overflow-y: auto;
  overflow-x: hidden;
  background-color: #f8f9fa;
}

/* Debug Panel */
.debug-panel {
  position: fixed;
  top: 100px;
  right: 20px;
  background: rgba(0, 0, 0, 0.9);
  color: white;
  padding: 15px;
  border-radius: 8px;
  font-family: monospace;
  font-size: 12px;
  z-index: 1000;
  max-width: 300px;
  backdrop-filter: blur(10px);
}

.debug-panel h3 {
  margin: 0 0 10px 0;
  font-size: 14px;
  color: #4CAF50;
}

.debug-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 5px;
  margin-bottom: 10px;
}

.column-widths {
  font-size: 10px;
  opacity: 0.8;
  word-break: break-all;
}

/* Loading and Empty States */
.loading-state,
.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 50vh;
  color: #666;
}

.loading-spinner {
  width: 40px;
  height: 40px;
  border: 4px solid #f3f3f3;
  border-top: 4px solid #333;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.debug-text {
  font-size: 12px;
  opacity: 0.6;
}

/* Masonry Container - Pinterest-style full screen */
.masonry-container {
  display: -webkit-box;
  display: -moz-box;
  display: -ms-flexbox;
  display: -webkit-flex;
  display: flex;
  
  -webkit-box-orient: horizontal;
  -webkit-box-direction: normal;
  -webkit-flex-direction: row;
  -moz-flex-direction: row;
  -ms-flex-direction: row;
  flex-direction: row;
  
  -webkit-box-align: start;
  -webkit-align-items: flex-start;
  -moz-align-items: flex-start;
  -ms-align-items: flex-start;
  align-items: flex-start;
  
  -webkit-box-pack: start;
  -webkit-justify-content: flex-start;
  -moz-justify-content: flex-start;
  -ms-justify-content: flex-start;
  justify-content: flex-start;
  
  /* Pinterest-style spacing */
  gap: 8px;
  width: 100%;
  max-width: none; /* Remove width constraint */
  margin: 0;
  padding: 8px; /* Minimal padding like Pinterest */
  
  /* Prevent horizontal scrolling */
  overflow-x: hidden;
  box-sizing: border-box;
}

/* Browser-specific optimizations */
.browser-firefox .masonry-container {
  gap: 6px;
}

.browser-safari .masonry-container {
  -webkit-transform: translateZ(0);
}

.browser-opera .masonry-container {
  gap: 7px;
}

.masonry-column {
  -webkit-box-flex: 1;
  -webkit-flex: 1;
  -moz-flex: 1;
  -ms-flex: 1;
  flex: 1;
  
  display: -webkit-box;
  display: -moz-box;
  display: -ms-flexbox;
  display: -webkit-flex;
  display: flex;
  
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -webkit-flex-direction: column;
  -moz-flex-direction: column;
  -ms-flex-direction: column;
  flex-direction: column;
  
  gap: 8px; /* Match Pinterest's tight spacing */
  min-width: 0;
  width: 100%;
}

.masonry-card {
  position: relative;
  background: white;
  border-radius: 16px;
  overflow: hidden;
  
  /* Cross-browser box-shadow */
  -webkit-box-shadow: 0 1px 4px rgba(0, 0, 0, 0.12);
  -moz-box-shadow: 0 1px 4px rgba(0, 0, 0, 0.12);
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.12);
  
  /* Cross-browser transitions */
  -webkit-transition: all 0.2s ease;
  -moz-transition: all 0.2s ease;
  -o-transition: all 0.2s ease;
  transition: all 0.2s ease;
  
  cursor: pointer;
  break-inside: avoid;
  page-break-inside: avoid;
  
  /* Prevent flex item shrinking issues */
  -webkit-flex-shrink: 0;
  -moz-flex-shrink: 0;
  -ms-flex-shrink: 0;
  flex-shrink: 0;
}

.masonry-card:hover {
  -webkit-transform: translateY(-2px);
  -moz-transform: translateY(-2px);
  -ms-transform: translateY(-2px);
  -o-transform: translateY(-2px);
  transform: translateY(-2px);
  
  -webkit-box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  -moz-box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.masonry-image {
  width: 100%;
  height: auto;
  display: block;
  border-radius: 16px;
  
  /* Image loading optimization */
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
  
  /* Prevent image dragging */
  -webkit-user-drag: none;
  -khtml-user-drag: none;
  -moz-user-drag: none;
  -o-user-drag: none;
  user-drag: none;
}

.card-overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: -webkit-linear-gradient(top, transparent, rgba(0, 0, 0, 0.7));
  background: -moz-linear-gradient(top, transparent, rgba(0, 0, 0, 0.7));
  background: -o-linear-gradient(top, transparent, rgba(0, 0, 0, 0.7));
  background: linear-gradient(to bottom, transparent, rgba(0, 0, 0, 0.7));
  color: white;
  padding: 12px;
  opacity: 0;
  
  -webkit-transition: opacity 0.2s ease;
  -moz-transition: opacity 0.2s ease;
  -o-transition: opacity 0.2s ease;
  transition: opacity 0.2s ease;
}

.masonry-card:hover .card-overlay {
  opacity: 1;
}

.card-title {
  font-size: 13px;
  font-weight: 600;
  margin: 0 0 4px 0;
  line-height: 1.2;
}

.card-author {
  font-size: 11px;
  margin: 0;
  opacity: 0.9;
}

/* Responsive breakpoints - Pinterest-style */
@media screen and (max-width: 2400px) {
  .masonry-container {
    gap: 7px;
    padding: 7px;
  }
  .masonry-column {
    gap: 7px;
  }
}

@media screen and (max-width: 1800px) {
  .masonry-container {
    gap: 6px;
    padding: 6px;
  }
  .masonry-column {
    gap: 6px;
  }
}

@media screen and (max-width: 1200px) {
  .masonry-container {
    gap: 5px;
    padding: 5px;
  }
  .masonry-column {
    gap: 5px;
  }
}

@media screen and (max-width: 768px) {
  .masonry-container {
    gap: 4px;
    padding: 4px;
  }
  .masonry-column {
    gap: 4px;
  }
}

@media screen and (max-width: 480px) {
  .masonry-container {
    gap: 2px;
    padding: 2px;
  }
  .masonry-column {
    gap: 2px;
  }
  
  .debug-panel {
    position: relative;
    right: auto;
    top: auto;
    margin: 10px;
    font-size: 10px;
  }
}

/* Firefox-specific fixes */
@-moz-document url-prefix() {
  .masonry-container {
    gap: 6px;
  }
}

/* Safari-specific fixes */
@media screen and (-webkit-min-device-pixel-ratio: 0) {
  .masonry-container {
    -webkit-transform: translateZ(0);
  }
}

/* Edge/IE compatibility */
@supports (-ms-ime-align: auto) {
  .masonry-container {
    display: -ms-flexbox;
    -ms-flex-direction: row;
    -ms-flex-align: start;
    -ms-flex-pack: start;
  }
  
  .masonry-column {
    -ms-flex: 1;
    -ms-flex-direction: column;
  }
}
</style>