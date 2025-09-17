<template>
  <router-link :to="`/property/${id}`" class="property-card-link">
    <div class="property-card">
      <img :src="image" alt="Property" class="property-image" />
      <div class="property-info">
        <div class="property-title">{{ title }}</div>
        <div class="property-details">
          <span class="property-date">Jan 16 – 18 · Individual host</span><br>
          <span class="property-price">€ 188 for 2 nights</span>
          <span class="property-rating"> · ★ 4.84</span>
        </div>
      </div>
    </div>
  </router-link>
</template>

<script setup>
const props = defineProps({
  id: Number,
  image: String,
  title: String,
  location: String,
  price: Number
});
</script>

<style scoped>
.property-card {
  background: #fff;
  border-radius: 16px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.07);
  overflow: hidden;
  transition: box-shadow 0.2s;
  width: 100%;
  min-width: 220px;
  max-width: 340px;
  margin: 1rem 0.5rem;
  display: flex;
  flex-direction: column;
}
.property-card:hover {
  box-shadow: 0 8px 24px rgba(0,0,0,0.15);
}
.property-image {
  width: 100%;
  height: 200px;
  object-fit: cover;
}
.property-info {
  padding: 1rem 1rem 0.5rem 1rem;
}
.property-title {
  font-size: 1.1rem;
  font-weight: 600;
  margin-bottom: 0.2rem;
  color: #222;
}
.property-details {
  font-size: 0.98rem;
  color: #222;
  margin-bottom: 0.1rem;
}
.property-date {
  color: #717171;
}
.property-price {
  color: #222;
  font-weight: 400;
}
.property-rating {
  color: #222;
  font-weight: 400;
}
.property-title {
  font-size: 1.2rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
}
.property-location {
  color: #717171;
  font-size: 1rem;
  margin-bottom: 0.5rem;
}
.property-price {
  color: #ff385c;
  font-weight: bold;
  font-size: 1.1rem;
}
</style>
