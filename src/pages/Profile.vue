<template>
  <div class="profile-container">
    <div class="profile-tabbar">
  <span class="profile-tab" :class="{ active: mainTab === 'today' }" @click="handleTabClick('today')">Today</span>
  <span class="profile-tab" :class="{ active: mainTab === 'calendar' }" @click="handleTabClick('calendar')">Calendar</span>
  <span class="profile-tab" :class="{ active: mainTab === 'listings' }" @click="handleTabClick('listings')">Listings</span>
  <span class="profile-tab" :class="{ active: mainTab === 'messages' }" @click="handleTabClick('messages')">Messages</span>
    </div>
    <main class="profile-main">
      <div v-if="mainTab === 'today'">
        <div class="profile-tabs">
          <button class="profile-tab-btn" :class="{ active: activeTab === 'today' }" @click="activeTab = 'today'">Today</button>
          <button class="profile-tab-btn" :class="{ active: activeTab === 'upcoming' }" @click="activeTab = 'upcoming'">Upcoming</button>
        </div>
        <transition name="slide-right" mode="out-in">
          <div v-if="activeTab === 'today' || activeTab === 'upcoming'" :key="activeTab" class="profile-reservation">
            <img src="/src/Images/Upcoming.avif" alt="No reservations" class="profile-reservation-img" />
            <div class="profile-reservation-text">
              <h2>You don’t have<br>any reservations</h2>
            </div>
          </div>
        </transition>
      </div>
      <div v-else-if="mainTab === 'calendar'" class="profile-calendar">
        <h2 class="calendar-title">Your 30-day calendar</h2>
        <div v-if="houses.length === 0" style="margin-left:2rem; color:#888; font-size:1.2rem;">No listings to show calendar.</div>
        <div v-else>
          <div class="calendar-select-row">
            <label for="calendarListingSelect">Select listing:</label>
            <select id="calendarListingSelect" v-model="selectedListingId">
              <option v-for="house in houses" :key="house.id" :value="house.id">{{ house.name }}</option>
            </select>
          </div>
          <div v-if="selectedListing">
            <div class="calendar-listing-block">
              <div class="calendar-listing-name">{{ selectedListing.name }}</div>
              <div class="calendar-grid">
                <div v-for="day in 30" :key="day" :class="['calendar-day', isBooked(selectedListing, day) ? 'booked' : '']">
                  {{ day }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-else-if="mainTab === 'listings'" class="profile-listings">
        <div class="profile-listings-header">
          <span class="profile-listings-title">Your listings</span>
          <button class="plus-btn-modern" @click="router.push('/become-a-host')" title="Add new listing">
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="16" cy="16" r="16" fill="#ff385c"/>
              <path d="M16 10v12M10 16h12" stroke="#fff" stroke-width="2" stroke-linecap="round"/>
            </svg>
          </button>
        </div>
        <div v-if="houses.length === 0" style="margin-left:2rem; color:#888; font-size:1.2rem;">No houses listed yet.</div>
        <div class="listing-grid">
          <div v-for="house in houses" :key="house.id" class="listing-card-modern" @click="goToDetails(house.id)">
            <div class="listing-image-modern">
              <img v-if="house.images && house.images.length" :src="house.images[0]" alt="House image" />
              <div v-else class="listing-image-placeholder">No image</div>
            </div>
            <div class="listing-name-modern">{{ house.name }}</div>
          </div>
        </div>
      </div>
      <div v-else-if="mainTab === 'messages'" class="profile-messages">
        <h1>Messages</h1>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted, computed, watch } from 'vue';
import { useRouter } from 'vue-router';
import { supabase } from '../supabase.js';

const activeTab = ref('today');
const mainTab = ref('today');
const router = useRouter();
const houses = ref([]);
const selectedListingId = ref(null);
const selectedListing = computed(() => houses.value.find(h => h.id === selectedListingId.value));
const bookings = ref({});

function isBooked(house, day) {
  if (!bookings.value[house.id]) return false;
  return bookings.value[house.id].includes(day);
}

function initCalendarBookings() {
  houses.value.forEach(house => {
    bookings.value[house.id] = Array.from({length: 7}, () => Math.floor(Math.random() * 30) + 1);
  });
  if (houses.value.length && !selectedListingId.value) selectedListingId.value = houses.value[0].id;
}

onMounted(() => {
  initCalendarBookings();
});

watch(mainTab, (tab) => {
  if (tab === 'calendar') {
    initCalendarBookings();
  }
});

onMounted(() => {
  if (mainTab.value === 'listings') fetchListings();
});

async function fetchListings() {
  const { data, error } = await supabase.from('houses').select('*').order('created_at', { ascending: false });
  if (error) {
    console.error('Error fetching houses:', error.message);
    houses.value = [];
  } else {
    houses.value = data || [];
  }
}

function handleTabClick(tab) {
  if (tab === 'calendar' && houses.value.length === 0) {
    router.push('/become-a-host');
  } else {
    mainTab.value = tab;
    if (tab === 'listings') fetchListings();
  }
}

function goToDetails(id) {
  router.push(`/property/${id}`);
}
</script>
/* Listing card styles */
.profile-listings-title {
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 2rem;
  text-align: left;
  margin-left: 0;
   position: relative;
}
 .plus-btn {
   background: #ff385c;
   color: #fff;
   border: none;
   border-radius: 50%;
   width: 44px;
   height: 44px;
   display: flex;
   align-items: center;
   justify-content: center;
   font-size: 2rem;
   font-weight: 700;
   cursor: pointer;
   box-shadow: 0 2px 8px rgba(0,0,0,0.10);
   transition: background 0.2s;
   margin-left: 1rem;
 }
 .plus-btn:hover {
   background: #e03150;
 }
.listing-card {
  background: #e1e1e1;
  border-radius: 20px;
  width: 420px;
  height: 400px;
  position: relative;
  margin-bottom: 1.5rem;
  margin-left: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
}
.listing-status {
  position: absolute;
  top: 18px;
  left: 18px;
  background: #fff;
  border-radius: 20px;
  padding: 0.2rem 1.2rem;
  font-size: 1rem;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}
.listing-dot {
  width: 10px;
  height: 10px;
  background: orange;
  border-radius: 50%;
  display: inline-block;
}
.listing-image {
  width: 100%;
  height: 320px;
  background: #d6d6d6;
  border-radius: 16px;
  margin-top: 40px;
}
.listing-info {
  padding: 1rem 1.2rem 0.5rem 1.2rem;
  text-align: left;
}
.listing-desc {
  font-size: 1.1rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
}
.listing-type {
  color: #717171;
  font-size: 1rem;
}

<style scoped>
/* Calendar select styles */
.calendar-select-row {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.5rem;
}
select#calendarListingSelect {
  padding: 0.5rem 1.2rem;
  border-radius: 8px;
  border: 1px solid #ddd;
  font-size: 1.05rem;
}
/* Calendar styles */
.profile-calendar {
  margin-top: 2rem;
}
.calendar-title {
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
}
.calendar-listing-block {
  margin-bottom: 2.5rem;
}
.calendar-listing-name {
  font-size: 1.15rem;
  font-weight: 600;
  margin-bottom: 0.7rem;
}
.calendar-grid {
  display: grid;
  grid-template-columns: repeat(10, 1fr);
  gap: 0.5rem;
}
.calendar-day {
  background: #e0e0e0;
  border-radius: 8px;
  padding: 0.7rem 0;
  text-align: center;
  font-size: 1rem;
  color: #222;
  box-shadow: 0 1px 4px rgba(0,0,0,0.04);
  transition: background 0.2s;
}
.calendar-day.booked {
  background: #ff385c;
  color: #fff;
  font-weight: 700;
}
.profile-container {
  min-height: 80vh;
  background: #fff;
}
.profile-tabbar {
  display: flex;
  gap: 2.5rem;
  justify-content: center;
  align-items: center;
  padding: 2.5rem 0 0.5rem 0;
  font-size: 1.15rem;
  font-weight: 500;
  color: #444;
}
.profile-tab {
  position: relative;
  cursor: pointer;
  padding-bottom: 0.3rem;
}
.profile-tab.active {
  color: #222;
  font-weight: 600;
}

.profile-tab-btn {
  background: #f7f7f7;
  color: #222;
  border: none;
  border-radius: 24px;
  padding: 0.7rem 2.2rem;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  box-shadow: 0 2px 8px rgba(0,0,0,0.10);
  transition: background 0.2s;
}
.profile-tab-btn.active {
  background: #222;
  color: #fff;
}
.profile-main {
  flex: 1;
  padding: 2.5rem 3rem 1.5rem 3rem;
}
 .profile-listings-header {
   display: flex;
   align-items: center;
   justify-content: space-between;
   margin-bottom: 2rem;
 }
 .profile-listings-title {
   font-size: 2rem;
   font-weight: 700;
 }
 .plus-btn-modern {
   background: none;
   border: none;
   padding: 0;
   cursor: pointer;
   display: flex;
   align-items: center;
   transition: transform 0.15s;
 }
 .plus-btn-modern:hover {
   transform: scale(1.08);
 }
 .listing-grid {
   display: grid;
   grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
   gap: 2rem;
   margin-top: 1rem;
 }
 .listing-card-modern {
   background: #fff;
   border-radius: 18px;
   box-shadow: 0 4px 16px rgba(0,0,0,0.08);
   overflow: hidden;
   display: flex;
   flex-direction: column;
   align-items: center;
   cursor: pointer;
   transition: box-shadow 0.2s;
   min-height: 280px;
 }
 .listing-card-modern:hover {
   box-shadow: 0 8px 32px rgba(0,0,0,0.14);
 }
 .listing-image-modern {
   width: 100%;
   height: 180px;
   background: #f3f3f3;
   display: flex;
   align-items: center;
   justify-content: center;
 }
 .listing-image-modern img {
   width: 100%;
   height: 100%;
   object-fit: cover;
   border-radius: 0 0 18px 18px;
 }
 .listing-image-placeholder {
   color: #aaa;
   font-size: 1.1rem;
   text-align: center;
 }
 .listing-name-modern {
   font-size: 1.25rem;
   font-weight: 600;
   margin: 1.2rem 0 0.7rem 0;
   text-align: center;
   color: #222;
 }
/* Removed invalid/duplicate CSS */
.profile-tabs {
  display: flex;
  gap: 1rem;
  margin: 2rem 0 2.5rem 0;
}
.profile-tab {
  background: #f7f7f7;
  color: #222;
  border: none;
  border-radius: 24px;
  padding: 0.7rem 2.2rem;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  box-shadow: 0 2px 8px rgba(0,0,0,0.10);
  transition: background 0.2s;
}
.profile-tab.active {
  background: #222;
  color: #fff;
}
.profile-reservation {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 5rem;
}
.profile-reservation-img {
  width: 140px;
  margin-bottom: 2rem;
}
.profile-reservation-text h2 {
  font-size: 2rem;
  font-weight: 700;
  color: #222;
  text-align: center;
}
.profile-name {
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 0.2rem;
}
.profile-role {
  color: #717171;
  font-size: 1.1rem;
}
.profile-complete {
  flex: 1;
  margin-left: 2.5rem;
  margin-top: 0.5rem;
}
.profile-complete h3 {
  font-size: 1.2rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
}
.profile-complete p {
  color: #222;
  font-size: 1rem;
  margin-bottom: 1.2rem;
}
.profile-btn {
  background: #ff385c;
  color: #fff;
  border: none;
  border-radius: 12px;
  padding: 0.8rem 2rem;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  box-shadow: 0 2px 8px rgba(0,0,0,0.10);
  transition: background 0.2s;
}
.profile-btn:hover {
  background: #e03150;
}
.profile-edit {
  position: absolute;
  top: 0;
  right: 0;
  background: #f7f7f7;
  color: #222;
  border: none;
  border-radius: 8px;
  padding: 0.5rem 1.2rem;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  box-shadow: 0 2px 8px rgba(0,0,0,0.07);
  transition: background 0.2s;
}
.profile-edit:hover {
  background: #ececec;
}
.profile-reviews {
  margin-top: 2.5rem;
  font-size: 1.15rem;
  color: #222;
  display: flex;
  align-items: center;
  gap: 0.7rem;
}
.profile-review-icon {
  font-size: 1.3rem;
}
/* Slide right animation */
.slide-right-enter-active, .slide-right-leave-active {
  transition: all 0.5s cubic-bezier(0.77,0,0.175,1);
}
.slide-right-enter-from {
  opacity: 0;
  transform: translateX(-60px);
}
.slide-right-enter-to {
  opacity: 1;
  transform: translateX(0);
}
.slide-right-leave-from {
  opacity: 1;
  transform: translateX(0);
}
.slide-right-leave-to {
  opacity: 0;
  transform: translateX(60px);
}
</style>
