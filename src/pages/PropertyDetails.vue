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


  import { onMounted } from 'vue';
  import { supabase } from '../supabase.js';

  const property = ref(null);

  onMounted(async () => {
    const { data, error } = await supabase.from('houses').select('*').eq('id', propertyId).single();
    if (data) {
      property.value = {
        ...data,
        images: Array.isArray(data.images) ? data.images : [],
        image: Array.isArray(data.images) && data.images.length ? data.images[0] : '',
        title: data.name || 'Property',
        summary: data.address || '',
        description: `Guests: ${data.guests} · Bedrooms: ${data.bedrooms} · Beds: ${data.beds} · Bathrooms: ${data.bathrooms}`,
        guests: data.guests,
        type: data.type || '',
        beds: data.beds,
        bath: data.bathrooms,
        rare: false
      };
    }
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
