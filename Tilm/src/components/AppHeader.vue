<script setup lang="ts">
import { Icon } from '@iconify/vue';
import { ref, onMounted, onUnmounted, nextTick } from 'vue';

const showMobileMenu = ref(false);
const isHeaderVisible = ref(true); // Start visible
let hideTimeout: number | null = null;
let showTimeout: number | null = null;

const handleMouseMove = (event: MouseEvent) => {
  // Clear any existing timeouts to prevent conflicts
  if (hideTimeout) {
    clearTimeout(hideTimeout);
    hideTimeout = null;
  }
  if (showTimeout) {
    clearTimeout(showTimeout);
    showTimeout = null;
  }

  // Show header if cursor is in the top 100px of the screen
  if (event.clientY <= 100) {
    if (!isHeaderVisible.value) {
      isHeaderVisible.value = true;
    }
  } else {
    // Add a small delay before hiding to prevent flickering
    if (isHeaderVisible.value) {
      hideTimeout = setTimeout(() => {
        isHeaderVisible.value = false;
      }, 150);
    }
  }
};

const handleMouseLeave = () => {
  // Hide header when mouse leaves the window
  if (hideTimeout) {
    clearTimeout(hideTimeout);
  }
  hideTimeout = setTimeout(() => {
    isHeaderVisible.value = false;
  }, 300);
};

onMounted(() => {
  // Show header initially for 3 seconds
  showTimeout = setTimeout(() => {
    isHeaderVisible.value = false;
  }, 3000);

  document.addEventListener('mousemove', handleMouseMove);
  document.addEventListener('mouseleave', handleMouseLeave);
});

onUnmounted(() => {
  // Clean up timeouts and event listeners
  if (hideTimeout) clearTimeout(hideTimeout);
  if (showTimeout) clearTimeout(showTimeout);
  
  document.removeEventListener('mousemove', handleMouseMove);
  document.removeEventListener('mouseleave', handleMouseLeave);
});
</script>

<template>
  <header class="app-header" :class="{ 'header-visible': isHeaderVisible }">
    <!-- Mobile menu button -->
    <button class="mobile-menu-btn" @click="showMobileMenu = !showMobileMenu">
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 16 16">
        <path fill-rule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"/>
      </svg>
    </button>

    <div class="header-left">
      <router-link to="/profile" class="logo">
        <svg height="32" width="32" viewBox="0 0 24 24" fill="#e60023">
          <path d="M0 12c0 5.123 3.2 9.488 7.705 11.245-.272-1.116-.343-2.441.04-3.66.456-1.424 2.938-12.41 2.938-12.41s-.747-.498-.747-2.184c0-2.045 1.188-3.575 2.653-3.575 1.248 0 1.852.938 1.852 2.053 0 1.248-.797 3.12-1.21 4.832-.343 1.424.718 2.58 2.112 2.58 2.53 0 4.45-2.653 4.45-6.512 0-3.422-2.45-5.82-5.98-5.82-4.088 0-6.46 3.04-6.46 6.182 0 1.248.477 2.58 1.06 3.355.12.16.14.272.1.432-.04.16-.24.978-.272 1.116-.06.272-.24.343-.514.213-1.9-.938-3.13-3.64-3.13-5.84C2.35 5.16 5.54 0 12.33 0c6.75 0 11.67 4.71 11.67 11.13 0 6.572-4.15 11.87-9.83 11.87-1.9 0-3.7-.978-4.32-2.053z"></path>
        </svg>
      </router-link>
      <nav class="nav-buttons">
        <router-link to="/" class="nav-button active">
          <Icon icon="material-symbols:home" width="20" height="20" />
        </router-link>
        <router-link to="/browse" class="nav-button">Browse</router-link>
        <router-link to="/post" class="nav-button">
          <Icon icon="mdi:plus" width="20" height="20" />
        </router-link>
      </nav>
    </div>

    <div class="search-bar">
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="search-icon" viewBox="0 0 16 16">
        <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
      </svg>
      <input type="text" placeholder="Search" />
    </div>

    <div class="header-right">
      <a href="#" class="icon-button">
        <Icon icon="mdi:bookshelf" width="20" height="20" />
      </a>
      <router-link to="/wallet" class="icon-button">
        <Icon icon="ph:wallet" width="20" height="20" />
      </router-link>
    </div>

    <!-- Mobile menu overlay -->
    <div v-if="showMobileMenu" class="mobile-menu-overlay" @click="showMobileMenu = false">
      <div class="mobile-menu">
        <router-link to="/" class="mobile-nav-item" @click="showMobileMenu = false">
          <Icon icon="material-symbols:home" width="20" height="20" />
          <span>Home</span>
        </router-link>
        <router-link to="/browse" class="mobile-nav-item" @click="showMobileMenu = false">Browse</router-link>
        <router-link to="/post" class="mobile-nav-item" @click="showMobileMenu = false">
          <Icon icon="mdi:plus" width="20" height="20" />
          <span>Post</span>
        </router-link>
        <router-link to="/wallet" class="mobile-nav-item" @click="showMobileMenu = false">Wallet</router-link>
      </div>
    </div>
  </header>
</template>

<style scoped>
.app-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 16px;
  background-color: rgba(69, 68, 68, 0.95);
  color: var(--color-text);
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  height: 80px;
  border-bottom: 1px solid #e0e0e0;
  width: 100%;
  box-sizing: border-box;
  min-width: 320px;
  flex-wrap: nowrap;
  backdrop-filter: blur(10px);
  
  /* Smooth auto-hide functionality */
  transform: translateY(-100%);
  transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  will-change: transform;
}

.app-header.header-visible {
  transform: translateY(0);
}

.mobile-menu-btn {
  display: none;
  background: none;
  border: none;
  cursor: pointer;
  padding: 8px;
  border-radius: 50%;
  color: var(--color-text);
  flex-shrink: 0;
  transition: all 0.2s ease;
}

.mobile-menu-btn:hover {
  background-color: #f0f0f0;
  transform: scale(1.05);
}

.header-left, .header-right {
  display: flex;
  align-items: center;
  flex-shrink: 0;
  flex-basis: auto;
}

.header-left {
  flex: 0 1 auto;
  min-width: 0;
}

.header-right {
  flex: 0 0 auto;
  justify-content: flex-end;
  gap: 4px;
}

.logo {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 8px;
  cursor: pointer;
  flex-shrink: 0;
  transition: all 0.2s ease;
}

.logo:hover {
  background-color: #f0f0f0;
  transform: scale(1.1);
}

.nav-buttons {
  display: flex;
  align-items: center;
  gap: 4px;
  flex-wrap: nowrap;
}

.nav-button {
  padding: 8px 12px;
  border: none;
  border-radius: 20px;
  font-weight: 600;
  font-size: 14px;
  cursor: pointer;
  text-decoration: none;
  color: var(--color-text);
  background-color: transparent;
  white-space: nowrap;
  transition: all 0.2s ease;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  gap: 4px;
}

.nav-button:hover {
  background-color: #f0f0f0;
  transform: translateY(-1px);
}

.nav-button.active {
  background-color: var(--color-heading);
  color: var(--color-background);
}

.nav-button.active:hover {
  background-color: var(--color-heading);
  opacity: 0.9;
}

.search-bar {
  flex: 1 1 auto;
  margin: 0 16px;
  position: relative;
  display: flex;
  align-items: center;
  min-width: 200px;
  max-width: 600px;
  transition: all 0.2s ease;
}

.search-bar:hover {
  transform: scale(1.02);
}

.search-bar input {
  width: 100%;
  padding: 10px 16px 10px 36px;
  border: none;
  border-radius: 20px;
  background-color: #f0f0f0;
  font-size: 14px;
  flex: 1;
  cursor: text;
  transition: all 0.2s ease;
}

.search-bar input:hover {
  background-color: #e8e8e8;
}

.search-bar input:focus {
  outline: none;
  background-color: #e0e0e0;
  box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.25);
}

.search-icon {
  position: absolute;
  left: 12px;
  color: #767676;
  flex-shrink: 0;
  pointer-events: none;
}

.icon-button {
  color: #767676;
  background: none;
  border: none;
  cursor: pointer;
  padding: 8px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  transition: all 0.2s ease;
  flex-shrink: 0;
}

.icon-button:hover {
  background-color: #f0f0f0;
  color: var(--color-text);
  transform: scale(1.1);
}

.icon-button svg {
  width: 20px;
  height: 20px;
}

.mobile-menu-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1000;
  display: none;
  cursor: pointer;
}

.mobile-menu {
  position: absolute;
  top: 80px;
  left: 0;
  right: 0;
  background-color: var(--color-background);
  border-bottom: 1px solid #e0e0e0;
  padding: 16px;
  cursor: default;
}

.mobile-nav-item {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 16px;
  text-decoration: none;
  color: var(--color-text);
  border-radius: 8px;
  margin-bottom: 8px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
}

.mobile-nav-item:hover {
  background-color: #f0f0f0;
  transform: translateX(4px);
}

/* Tablet styles */
@media (max-width: 768px) {
  .app-header {
    padding: 8px 12px;
  }
  
  .search-bar {
    margin: 0 12px;
    min-width: 150px;
    max-width: 300px;
  }
  
  .nav-button {
    padding: 6px 10px;
    font-size: 13px;
  }
  
  .logo {
    width: 36px;
    height: 36px;
    margin-right: 6px;
  }
  
  .icon-button svg {
    width: 18px;
    height: 18px;
  }
}

/* Mobile styles */
@media (max-width: 640px) {
  .app-header {
    flex-wrap: nowrap;
  }
  
  .mobile-menu-btn {
    display: flex;
    order: -1;
    margin-right: 8px;
  }
  
  .nav-buttons {
    display: none;
  }
  
  .search-bar {
    margin: 0 8px;
    min-width: 120px;
    max-width: 200px;
    flex: 1 1 auto;
  }
  
  .search-bar input {
    padding: 8px 12px 8px 32px;
    font-size: 13px;
  }
  
  .header-right {
    gap: 2px;
    flex: 0 0 auto;
  }
  
  .icon-button {
    padding: 6px;
  }
  
  .mobile-menu-overlay {
    display: block;
  }
}

/* Very small screens */
@media (max-width: 480px) {
  .app-header {
    padding: 8px;
    height: 70px;
  }
  
  .search-bar {
    margin: 0 6px;
    min-width: 100px;
    max-width: 150px;
  }
  
  .search-bar input {
    padding: 6px 10px 6px 28px;
    font-size: 12px;
  }
  
  .search-icon {
    left: 8px;
    width: 14px;
    height: 14px;
  }
  
  .logo {
    width: 32px;
    height: 32px;
  }
  
  .logo svg {
    width: 24px;
    height: 24px;
  }
  
  .icon-button svg {
    width: 16px;
    height: 16px;
  }
}

/* Extra small screens */
@media (max-width: 360px) {
  .search-bar {
    min-width: 80px;
  }
  
  .search-bar input::placeholder {
    font-size: 11px;
  }
  
  .header-right .icon-button:nth-child(2) {
    display: none;
  }
}
</style>