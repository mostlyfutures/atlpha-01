import { defineStore } from 'pinia'

export interface Pin {
  id: number;
  title: string;
  image: string;
  category?: string; // Added category property
}

export const usePinsStore = defineStore('pins', {
  state: () => ({
    allPins: [] as Pin[],
    displayedPins: [] as Pin[],
    pinsPerPage: 15, // Number of pins to load at a time
  }),
  actions: {
    fetchPins() {
      if (this.allPins.length > 0) return; // Fetch only once

      const imageModules = import.meta.glob('/public/images/*', { eager: true, query: '?url', import: 'default' });
      const imageFiles = Object.keys(imageModules).map(path => path.split('/').pop() as string);

      const data: Pin[] = imageFiles.map((file, index) => ({
        id: index + 1,
        title: file.replace(/\.(jpg|jpeg|png|gif|heic)$/i, '').replace(/_/g, ' '),
        image: `/images/${file}`,
        category: 'Nature' // Assign a dummy category for now
      }));

      this.allPins = data;
      this.displayedPins = this.allPins.slice(0, this.pinsPerPage);
    },
    loadMorePins() {
      const currentCount = this.displayedPins.length;
      if (currentCount >= this.allPins.length) return; // No more pins to load

      const nextPins = this.allPins.slice(currentCount, currentCount + this.pinsPerPage);
      this.displayedPins.push(...nextPins);
    },
    addPin(pin: Omit<Pin, 'id'>) {
      const newPin = { ...pin, id: Date.now() };
      this.allPins.unshift(newPin);
      this.displayedPins.unshift(newPin);
    }
  }
})
