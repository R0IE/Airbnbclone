<template>
  <div class="property-details-page">
    <h1>{{ property.title }}</h1>
    <div class="property-images-layout">
      <img :src="property.image" class="main-image" />
      <div class="side-images">
        <img v-for="img in property.images" :key="img" :src="img" class="side-image" />
      </div>
    </div>
    <div class="property-summary">
      <h2>{{ property.summary }}</h2>
      <p>{{ property.description }}</p>
      <div class="property-meta">
        <span>{{ property.guests }} guest</span> ·
        <span>{{ property.type }}</span> ·
        <span>{{ property.beds }} beds</span> ·
        <span>{{ property.bath }} bath</span>
      </div>
    </div>
    <div v-if="property.rare" class="rare-find">Rare find! This place is usually booked</div>
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router';
import { ref } from 'vue';

const route = useRoute();
const propertyId = route.params.id;

// Example property data, replace with real fetch
const property = ref({
  title: 'Studio Victor Hugo/Champs Elysees',
  image: 'https://a0.muscache.com/im/pictures/airbnb2.jpg',
  images: [
    'https://a0.muscache.com/im/pictures/airbnb2.jpg',
    'https://a0.muscache.com/im/pictures/airbnb3.jpg',
    'https://a0.muscache.com/im/pictures/airbnb1.jpg',
    'https://a0.muscache.com/im/pictures/airbnb4.jpg',
  ],
  summary: 'Entire rental unit in Paris, France',
  description: '1 guest · Studio · 2 beds · 1 bath',
  guests: 1,
  type: 'Studio',
  beds: 2,
  bath: 1,
  rare: true,
});
</script>

<style scoped>
.property-details-page {
  max-width: 1200px;
  margin: 2rem auto;
  padding: 0 2rem;
}
.property-images-layout {
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
}
.main-image {
  width: 60%;
  border-radius: 18px;
  object-fit: cover;
}
.side-images {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 40%;
}
.side-image {
  width: 100%;
  border-radius: 12px;
  object-fit: cover;
}
.property-summary {
  margin-top: 1rem;
}
.property-meta {
  color: #717171;
  font-size: 1.1rem;
  margin-top: 0.5rem;
}
.rare-find {
  background: #fff0f6;
  color: #d72660;
  border-radius: 12px;
  padding: 0.75rem 1.5rem;
  margin-top: 1.5rem;
  font-weight: 600;
  display: inline-block;
}
</style>
