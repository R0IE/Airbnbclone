<template>
  <transition name="fade-scale">
    <div v-if="open" class="calendar-dropdown">
      <div class="calendar-tabs">
        <button :class="{active: tab==='dates'}" @click="tab='dates'">Dates</button>
        <button :class="{active: tab==='months'}" @click="tab='months'">Months</button>
        <button :class="{active: tab==='flexible'}" @click="tab='flexible'">Flexible</button>
      </div>
      <div v-if="tab==='dates'" class="calendar-content">
        <div class="calendar-months">
          <div class="calendar-month">
            <div class="month-title">September 2025</div>
            <div class="calendar-grid">
              <div v-for="d in daysSept" :key="d" :class="['calendar-day', highlightClass(d)]" @click="selectDay(d)">
                <span v-if="highlightClass(d)" class="dot"></span>
                {{ d }}
              </div>
            </div>
          </div>
          <div class="calendar-month">
            <div class="month-title">October 2025</div>
            <div class="calendar-grid">
              <div v-for="d in daysOct" :key="d" class="calendar-day">{{ d }}</div>
            </div>
          </div>
        </div>
        <div class="calendar-options">
          <button class="option-btn">Exact dates</button>
          <button class="option-btn">± 1 day</button>
          <button class="option-btn">± 2 days</button>
          <button class="option-btn">± 3 days</button>
          <button class="option-btn">± 7 days</button>
          <button class="option-btn">± 14 days</button>
        </div>
      </div>
      <div v-if="tab==='months'" class="calendar-content months-tab">
        <div class="months-title">When’s your trip?</div>
        <MonthCircleSlider v-model:value="months" :max="12" :min="1" />
        <div class="months-range">
          Oct 1, 2025 <span class="to">to</span> {{ endDate }}
        </div>
      </div>
    </div>
  </transition>
</template>

<script setup>
import { ref, computed } from 'vue';
import MonthCircleSlider from './MonthCircleSlider.vue';
const props = defineProps({ open: Boolean, selected: Number, checkInDay: Number });
const emit = defineEmits(['select']);
const tab = ref('dates');
const selectedDay = ref(props.selected ?? 18);
const daysSept = [14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30];
const daysOct = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31];
const months = ref(8);
const endDate = computed(() => {
  const start = new Date(2025, 9, 1); // Oct 1, 2025
  const end = new Date(start);
  end.setMonth(start.getMonth() + months.value);
  return end.toLocaleString('default', { month: 'short', day: 'numeric', year: 'numeric' });
});
function selectDay(day) {
  selectedDay.value = day;
  emit('select', day);
}
function highlightClass(d) {
  if (props.checkInDay && props.selected) {
    if (d === props.checkInDay || d === props.selected || (d > props.checkInDay && d < props.selected)) {
      return 'selected';
    }
  }
  return '';
}
</script>
<style scoped>
.fade-scale-enter-active, .fade-scale-leave-active {
  transition: all 0.35s cubic-bezier(.4,2,.6,1);
}
.fade-scale-enter-from, .fade-scale-leave-to {
  opacity: 0;
  transform: scale(0.95) translateY(-20px);
}
.fade-scale-enter-to, .fade-scale-leave-from {
  opacity: 1;
  transform: scale(1) translateY(0);
}
.calendar-dropdown {
  position: absolute;
  left: 50%;
  top: 60px;
  transform: translateX(-50%);
  width: 600px;
  background: #fff;
  border-radius: 32px;
  box-shadow: 0 4px 32px rgba(0,0,0,0.12);
  z-index: 20;
  padding: 2rem 2rem 1.5rem 2rem;
}
.calendar-tabs {
  display: flex;
  gap: 1rem;
  margin-bottom: 1.5rem;
}
.calendar-tabs button {
  background: #f7f7f7;
  border: none;
  border-radius: 20px;
  padding: 0.5rem 1.2rem;
  font-size: 1rem;
  font-weight: 500;
  color: #222;
  cursor: pointer;
  transition: background 0.2s;
}
.calendar-tabs button.active {
  background: #fff;
  box-shadow: 0 2px 8px rgba(0,0,0,0.08);
}
.calendar-content {
  margin-top: 1rem;
}
.calendar-months {
  display: flex;
  gap: 2rem;
}
.calendar-month {
  flex: 1;
}
.month-title {
  font-weight: 600;
  font-size: 1.1rem;
  margin-bottom: 0.5rem;
}
.calendar-grid {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 0.5rem;
}
.calendar-day {
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background: #f7f7f7;
  color: #222;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.2s, color 0.2s;
}
.calendar-day.selected {
.calendar-day.selected {
  background: #222;
  color: #fff;
  position: relative;
}
.dot {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 8px;
  height: 8px;
  background: #fff;
  border-radius: 50%;
  transform: translate(-50%, -50%);
}
}
.calendar-options {
  margin-top: 2rem;
  display: flex;
  gap: 0.7rem;
}
.option-btn {
  background: #fff;
  border: 1.5px solid #222;
  border-radius: 20px;
  padding: 0.4rem 1.2rem;
  font-size: 1rem;
  color: #222;
  cursor: pointer;
  transition: background 0.2s, border 0.2s;
}
.option-btn:hover {
  background: #f7f7f7;
  border-color: #ff385c;
}
.months-tab {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.months-title {
  font-size: 1.3rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
  text-align: center;
}
.months-range {
  margin-top: 1.5rem;
  font-size: 1.1rem;
  color: #222;
  text-align: center;
}
.months-range .to {
  margin: 0 0.5rem;
  color: #717171;
}
</style>
