import { createRouter, createWebHistory } from 'vue-router';
import Home from './pages/Home.vue';
import Login from './pages/Login.vue';
import Properties from './pages/Properties.vue';
import PropertyDetails from './pages/PropertyDetails.vue';

const routes = [
  { path: '/', component: Home },
  { path: '/login', component: Login },
  { path: '/properties', component: Properties },
  { path: '/property/:id', component: PropertyDetails },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
