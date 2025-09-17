<template>
  <header class="airbnb-header">
    <div class="logo">Airbnb</div>
    <nav>
      <router-link to="/">Home</router-link>
      <router-link to="/properties">Properties</router-link>
      <router-link to="/login">Login</router-link>
    </nav>
  </header>
</template>

<script setup>
</script>

<style scoped>
.airbnb-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 2rem;
  background: #fff;
  box-shadow: 0 2px 8px rgba(0,0,0,0.05);
}
.logo {
  font-size: 2rem;
  font-weight: bold;
  color: #ff385c;
  font-family: 'Cereal', 'Avenir', Helvetica, Arial, sans-serif;
}
nav {
  display: flex;
  gap: 1.5rem;
}
nav a {
  color: #222;
  text-decoration: none;
  font-weight: 500;
  font-size: 1rem;
}
nav a.router-link-active {
  color: #ff385c;
}
</style>
