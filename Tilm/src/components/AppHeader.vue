<script setup lang="ts">
import { Icon } from '@iconify/vue';
</script>

<template>
  <header class="app-header">
    <div class="header-left">
      <router-link to="/" class="logo">
        <svg height="32" width="32" viewBox="0 0 24 24" fill="#e60023">
          <path d="M0 12c0 5.123 3.2 9.488 7.705 11.245-.272-1.116-.343-2.441.04-3.66.456-1.424 2.938-12.41 2.938-12.41s-.747-.498-.747-2.184c0-2.045 1.188-3.575 2.653-3.575 1.248 0 1.852.938 1.852 2.053 0 1.248-.797 3.12-1.21 4.832-.343 1.424.718 2.58 2.112 2.58 2.53 0 4.45-2.653 4.45-6.512 0-3.422-2.45-5.82-5.98-5.82-4.088 0-6.46 3.04-6.46 6.182 0 1.248.477 2.58 1.06 3.355.12.16.14.272.1.432-.04.16-.24.978-.272 1.116-.06.272-.24.343-.514.213-1.9-.938-3.13-3.64-3.13-5.84C2.35 5.16 5.54 0 12.33 0c6.75 0 11.67 4.71 11.67 11.13 0 6.572-4.15 11.87-9.83 11.87-1.9 0-3.7-.978-4.32-2.053z"></path>
        </svg>
      </router-link>
      <router-link to="/" class="nav-button active">Home</router-link>
      <router-link to="/browse" class="nav-button">Browse</router-link>
      <router-link to="/post" class="nav-button">Post</router-link>
    </div>

    <div class="search-bar">
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="search-icon" viewBox="0 0 16 16">
        <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
      </svg>
      <input type="text" placeholder="Search" />
    </div>

    <div class="header-right">
      <a href="#" class="icon-button">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 16 16"><path d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2zM8 1.918l-.797.161A4.002 4.002 0 0 0 4 6c0 .628-.134 2.197-.459 3.742-.16.767-.376 1.566-.663 2.258h10.244c-.287-.692-.502-1.49-.663-2.258C12.134 8.197 12 6.628 12 6a4.002 4.002 0 0 0-3.203-3.92L8 1.917z"/></svg>
      </a>
      <a href="#" class="icon-button">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 16 16"><path d="M8 15c4.418 0 8-3.134 8-7s-3.582-7-8-7-8 3.134-8 7c0 1.76.743 3.37 1.97 4.6-.097 1.016-.417 2.13-.771 2.966-.079.186.074.394.273.362 2.256-.37 3.597-.938 4.18-1.234A9.06 9.06 0 0 0 8 15z"/></svg>
      </a>
      <a href="#" class="icon-button">
        <Icon icon="ph:wallet" />
      </a>
    </div>
  </header>
</template>

<style scoped>
.app-header {
  display: flex;
  align-items: center;
  padding: 8px 16px;
  background-color: var(--color-background);
  color: var(--color-text);
  position: fixed;
  top: 0;
  left: 0px;
  z-index: 100;
  height: 80px;
  border: 1px solid black;
  width: 100%;
}

.header-left, .header-right {
  display: flex;
  align-items: center;
  flex-shrink: 0;
}

.logo {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  margin-right: 8px;
  cursor: pointer;
}

.logo:hover {
  background-color: #f0f0f0;
}

.nav-button {
  padding: 12px 16px;
  border: none;
  border-radius: 24px;
  font-weight: 600;
  font-size: 16px;
  cursor: pointer;
  text-decoration: none;
  color: var(--color-text);
  background-color: transparent;
}

.nav-button.active {
  background-color: var(--color-heading);
  color: var(--color-background);
}

.search-bar {
  flex-grow: 1;
  margin: 0 16px;
  position: relative;
  display: flex;
  align-items: center;
}

.search-bar input {
  width: 100%;
  padding: 12px 16px 12px 40px;
  border: none;
  border-radius: 24px;
  background-color: #e9e9e9;
  font-size: 16px;
}

.search-bar input:focus {
  outline: none;
  background-color: #ddd;
}

.search-icon {
  position: absolute;
  left: 16px;
  color: #767676;
}

.header-right {
  justify-content: flex-end;
}

.icon-button {
  color: #767676;
  background: none;
  border: none;
  cursor: pointer;
  padding: 8px;
  margin-left: 8px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.icon-button:hover {
  background-color: #f0f0f0;
}

.icon-button svg {
  width: 24px;
  height: 24px;
}


</style>