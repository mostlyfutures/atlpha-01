<template>
  <router-link :to="{ name: 'pin', params: { id: pin.id } }" class="pin-container">
    <div class="pin">
      <div class="overlay">
        <button class="save-button">Save</button>
      </div>
      <picture>
        <source 
          v-if="pin.imageSmallHeic || pin.imageMediumHeic || pin.imageLargeHeic"
          :srcset="`${pin.imageSmallHeic ? pin.imageSmallHeic + ' 300w,' : ''} ${pin.imageMediumHeic ? pin.imageMediumHeic + ' 600w,' : ''} ${pin.imageLargeHeic ? pin.imageLargeHeic + ' 1200w' : ''}`"
          type="image/heic"
          sizes="(max-width: 600px) 300px, (max-width: 1200px) 600px, 1200px"
        >
        <source 
          v-if="pin.imageSmallWebp || pin.imageMediumWebp || pin.imageLargeWebp"
          :srcset="`${pin.imageSmallWebp ? pin.imageSmallWebp + ' 300w,' : ''} ${pin.imageMediumWebp ? pin.imageMediumWebp + ' 600w,' : ''} ${pin.imageLargeWebp ? pin.imageLargeWebp + ' 1200w' : ''}`"
          type="image/webp"
          sizes="(max-width: 600px) 300px, (max-width: 1200px) 600px, 1200px"
        >
        <img 
          :src="pin.image" 
          :alt="pin.title" 
          loading="lazy" 
          :srcset="`${pin.imageSmall ? pin.imageSmall + ' 300w,' : ''} ${pin.imageMedium ? pin.imageMedium + ' 600w,' : ''} ${pin.imageLarge ? pin.imageLarge + ' 1200w' : ''}`"
          sizes="(max-width: 600px) 300px, (max-width: 1200px) 600px, 1200px"
        />
      </picture>
    </div>
    <h3>{{ pin.title }}</h3>
  </router-link>
</template>

<script setup lang="ts">
defineProps({
  pin: {
    type: Object,
    required: true
  }
})
</script>

<style scoped>
.pin-container {
  display: inline-block;
  break-inside: avoid;
  text-decoration: none;
  color: inherit;
  border: 1px solid red; /* Temporary debug border */
}

.pin {
  position: relative;
  border-radius: 16px;
  overflow: hidden;
  cursor: zoom-in;
}

.pin .overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  opacity: 0;
  transition: opacity 0.3s ease;
  display: flex;
  align-items: flex-start;
  justify-content: flex-end;
  padding: 8px;
  box-sizing: border-box;
}

.pin:hover .overlay {
  opacity: 1;
}

.save-button {
  background-color: #e60023;
  color: white;
  border: none;
  padding: 12px 16px;
  border-radius: 24px;
  font-weight: bold;
  cursor: pointer;
  opacity: 0;
  transform: translateY(-10px);
  transition: opacity 0.3s, transform 0.3s;
}

.pin:hover .save-button {
  opacity: 1;
  transform: translateY(0);
}

.pin img {
  width: 100%;
  height: auto;
  display: block;
  border: 1px solid blue; /* Temporary debug border */
}

h3 {
  padding: 8px 4px;
  font-size: 0.9rem;
  font-weight: 600;
  margin-top: 4px;
}
</style>
