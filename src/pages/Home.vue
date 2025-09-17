<template>
  <div class="home-container">
    <SearchBar />
    <div class="property-listing-section">
      <div class="property-listing-header">
        <h2>Popular homes in Paris</h2>
        <span class="arrow-group">
          <button class="arrow-btn" @click="scrollLeft" aria-label="Scroll left">
            <svg width="28" height="28" viewBox="0 0 28 28"><circle cx="14" cy="14" r="14" fill="#f7f7f7"/><path d="M16.5 9l-5 5 5 5" stroke="#222" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg>
          </button>
          <button class="arrow-btn" @click="scrollRight" aria-label="Scroll right">
            <svg width="28" height="28" viewBox="0 0 28 28"><circle cx="14" cy="14" r="14" fill="#f7f7f7"/><path d="M11.5 9l5 5-5 5" stroke="#222" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg>
          </button>
        </span>
      </div>
      <div class="property-grid" ref="scrollContainer">
        <PropertyCard
          v-for="property in properties"
          :key="property.id"
          :image="property.image"
          :title="property.title"
          :location="property.location"
          :price="property.price"
        />
      </div>
    </div>
  </div>
</template>
<script setup>
import SearchBar from '../components/SearchBar.vue';
import PropertyCard from '../components/PropertyCard.vue';

import { ref } from 'vue';
const properties = [
  {
    id: 1,
    image: 'https://a0.muscache.com/im/pictures/airbnb1.jpg',
    title: 'Room in 11th Arrondissement',
    location: 'Paris, France',
    price: 168
  },
  {
    id: 2,
    image: 'https://a0.muscache.com/im/pictures/airbnb2.jpg',
    title: 'Apartment in 16th Arrondissement',
    location: 'Paris, France',
    price: 236
  },
  {
    id: 3,
    image: 'https://a0.muscache.com/im/pictures/airbnb3.jpg',
    title: 'Room in 8th Arrondissement',
    location: 'Paris, France',
    price: 247
  },
  {
    id: 4,
    image: 'https://a0.muscache.com/im/pictures/airbnb4.jpg',
    title: 'Room in 11th Arrondissement',
    location: 'Paris, France',
    price: 188
  },
  {
    id: 5,
    image: 'https://a0.muscache.com/im/pictures/airbnb5.jpg',
    title: 'Hotel in 17th Arrondissement',
    location: 'Paris, France',
    price: 102
  },
  {
    id: 6,
    image: 'https://a0.muscache.com/im/pictures/airbnb6.jpg',
    title: 'Room in 15th Arrondissement',
    location: 'Paris, France',
    price: 174
  },
  {
    id: 7,
    image: 'https://a0.muscache.com/im/pictures/airbnb7.jpg',
    title: 'Apartment in Le Marais',
    location: 'Paris, France',
    price: 343
  }
];

const scrollContainer = ref(null);
function scrollLeft() {
  if (scrollContainer.value) {
    scrollContainer.value.scrollBy({ left: -400, behavior: 'smooth' });
  }
}
function scrollRight() {
  if (scrollContainer.value) {
    scrollContainer.value.scrollBy({ left: 400, behavior: 'smooth' });
  }
}
</script>
<style scoped>
.home-container {
  max-width: 1200px;
  margin: 2rem auto;
  padding: 0 2rem;
}
.headline {
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 2rem;
  color: #222;
  text-align: left;
}
.property-listing-section {
  margin: 2rem 0;
  width: 90vw;
  position: relative;
  left: 50%;
  right: 50%;
  transform: translateX(-50%);
}
.property-listing-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 0.5rem;
}
.property-listing-header h2 {
  font-size: 1.5rem;
  font-weight: 700;
  margin: 0;
  display: flex;
  align-items: center;
}
.arrow-group {
  display: flex;
  gap: 0.25rem;
  margin-left: 0.5rem;
}
.arrow-btn {
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
  outline: none;
  display: flex;
  align-items: center;
}
.property-grid {
  display: flex;
  gap: 2rem;
  overflow-x: auto;
  padding: 1rem 0;
  scroll-behavior: smooth;
  scrollbar-width: thin;
  scrollbar-color: transparent transparent;
  width: 100vw;
  margin-left: calc(-50vw + 50%);
  margin-right: calc(-50vw + 50%);
}

/* Hide scrollbar for Chrome, Safari and Opera */
.property-grid::-webkit-scrollbar {
  height: 8px;
  background: transparent;
}
.property-grid::-webkit-scrollbar-thumb {
  background: transparent;
}
</style>
