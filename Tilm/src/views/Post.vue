<template>
  <div>
    <TumblrHeader />
    <div class="container">
      <h1>Create a New Pin</h1>
      <form @submit.prevent="createPin">
        <div>
          <label for="title">Title</label>
          <input type="text" id="title" v-model="title" />
        </div>
        <div>
          <label for="image">Image URL</label>
          <input type="text" id="image" v-model="image" />
        </div>
        <button type="submit">Create Pin</button>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { usePinsStore } from '../stores/pins'
import { useRouter } from 'vue-router'
import TumblrHeader from '../components/AppHeader.vue'

const title = ref('')
const image = ref('')
const pinsStore = usePinsStore()
const router = useRouter()

const createPin = () => {
  pinsStore.addPin({
    title: title.value,
    image: image.value
  })
  router.push('/')
}
</script>

<style scoped>
.container {
  padding: 1rem;
}

form div {
  margin-bottom: 1rem;
}

label {
  display: block;
  margin-bottom: 0.5rem;
}

input {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 0.25rem;
}

button {
  background-color: #de1b1b;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 0.25rem;
  cursor: pointer;
}
</style>
