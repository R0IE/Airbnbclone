<template>
  <form class="search-bar" @submit.prevent>
    <div class="search-bar-inner">
      <div class="search-section" style="position:relative;">
        <label>Where</label>
        <input
          type="text"
          placeholder="Search destinations"
          @focus="openDropdown = true"
          @blur="closeDropdown"
          v-model="where"
        />
        <DestinationDropdown
          :open="openDropdown"
          @select="selectDestination"
          v-if="openDropdown"
        />
      </div>
      <div class="divider"></div>
      <div class="search-section" style="position:relative;">
        <label>Check in</label>
        <input
          type="text"
          placeholder="Add dates"
          @focus="openCheckIn = true"
          v-model="checkIn"
        />
        <CheckInCalendar
          :open="openCheckIn"
          :selected="checkInDay"
          @select="handleCheckInSelect"
          v-if="openCheckIn"
          v-clickOutside="closeCheckIn"
        />
      </div>
      <div class="divider"></div>
      <div class="search-section" style="position:relative;">
        <label>Check out</label>
        <input
          type="text"
          placeholder="Add dates"
          @focus="openCheckOut = true"
          v-model="checkOut"
        />
        <CheckOutCalendar
          :open="openCheckOut"
          :selected="checkOutDay"
          :checkInDay="checkInDay"
          @select="handleCheckOutSelect"
          v-if="openCheckOut"
          v-clickOutside="closeCheckOut"
        />
      </div>
      <div class="divider"></div>
      <div class="search-section" style="position:relative;">
        <label>Who</label>
        <input
          type="text"
          placeholder="Add guests"
          @focus="openGuests = true"
          v-model="guests"
        />
        <GuestSelector
          :open="openGuests"
          :counts="guestCounts"
          @update="handleGuestsUpdate"
          v-if="openGuests"
          v-clickOutside="closeGuests"
        />
      </div>
    </div>
    <button type="submit" class="search-btn" aria-label="Search">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="11" cy="11" r="7" stroke="white" stroke-width="2" />
        <path d="M20 20L16.65 16.65" stroke="white" stroke-width="2" stroke-linecap="round" />
      </svg>
    </button>
  </form>
</template>

<script setup>
import { ref } from 'vue';
import DestinationDropdown from './DestinationDropdown.vue';
import CheckInCalendar from './CheckInCalendar.vue';
import CheckOutCalendar from './CheckOutCalendar.vue';
import GuestSelector from './GuestSelector.vue';
const openDropdown = ref(false);
const openCheckIn = ref(false);
const openCheckOut = ref(false);
const openGuests = ref(false);
const where = ref('');
const checkIn = ref('');
const checkOut = ref('');
const guests = ref('');
const guestCounts = ref([0, 0, 0, 0]);
const checkInDay = ref(null);
const checkOutDay = ref(null);
function selectDestination(dest) {
  where.value = dest.name;
  openDropdown.value = false;
}
function closeDropdown(e) {
  setTimeout(() => { openDropdown.value = false; }, 150);
}
function handleCheckInSelect(day) {
  checkIn.value = `Sep ${day}`;
  checkInDay.value = day;
  openCheckIn.value = false;
  openCheckOut.value = true;
}
function closeCheckIn() {
  openCheckIn.value = false;
}
function handleCheckOutSelect(day) {
  checkOut.value = `Sep ${day}`;
  checkOutDay.value = day;
  openCheckOut.value = false;
}
function closeCheckOut() {
  openCheckOut.value = false;
}
function handleGuestsUpdate(counts) {
  guestCounts.value = [...counts];
  const total = counts[0] + counts[1] + counts[2];
  guests.value = `${total} guests`;
}
function closeGuests() {
  openGuests.value = false;
}
</script>

<style scoped>
.search-bar {
  position: relative;
  background: #fff;
  border-radius: 32px;
  box-shadow: 0 2px 16px rgba(0,0,0,0.08);
  border: 1.5px solid #e0e0e0;
  max-width: 1100px;
  margin: 2rem auto;
  padding: 0;
}
.search-bar-inner {
  display: flex;
  align-items: center;
  width: 100%;
  padding: 0.5rem 1rem;
  gap: 0.5rem;
}
.search-section {
  display: flex;
  flex-direction: column;
  padding: 0 1.5rem;
}
.search-section label {
  font-size: 0.95rem;
  font-weight: 600;
  color: #222;
}
.search-section input {
  border: none;
  outline: none;
  font-size: 1rem;
  color: #444;
  background: transparent;
  margin-top: 0.2rem;
}
.divider {
  width: 1px;
  height: 2.5rem;
  background: #e0e0e0;
}
.search-btn {
  position: absolute;
  right: 18px;
  top: 50%;
  transform: translateY(-50%);
  background: #ff385c;
  border: none;
  border-radius: 50%;
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-size: 1.5rem;
  cursor: pointer;
  box-shadow: 0 2px 8px rgba(0,0,0,0.10);
  z-index: 2;
}
.material-icons {
  font-family: 'Material Icons';
  font-style: normal;
  font-weight: normal;
  font-size: 1.5rem;
  line-height: 1;
  letter-spacing: normal;
  text-transform: none;
  display: inline-block;
  white-space: nowrap;
  direction: ltr;
  font-feature-settings: 'liga';
  -webkit-font-feature-settings: 'liga';
  -webkit-font-smoothing: antialiased;
}
</style>
