<script setup>
import { ref, computed, nextTick, onMounted } from 'vue'
import { itineraryData } from './data/itinerary'
import { getParisWeather } from './services/weatherService'
import WeatherCard from './components/WeatherCard.vue'
import TransitCard from './components/TransitCard.vue'
import TripCard from './components/TripCard.vue'
import TodoPage from './components/TodoPage.vue'

const currentPage = ref('itinerary') // 'itinerary' or 'todos'

// 根據當前日期智能判斷應該顯示哪一天
function getInitialDay() {
  const today = new Date()
  const tripStart = new Date('2026-02-14') // Day 0
  const tripEnd = new Date('2026-02-22') // Day 6
  
  // 如果還沒到旅行日期,顯示 Day 0
  if (today < tripStart) {
    return 0
  }
  
  // 如果已經過了旅行日期,顯示 Day 6
  if (today > tripEnd) {
    return 6
  }
  
  // 在旅行期間,計算是第幾天
  const diffTime = today - tripStart
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24))
  return Math.min(diffDays, 6)
}

const currentDay = ref(getInitialDay())
const days = [0, 1, 2, 3, 4, 5, 6]
const contentRef = ref(null)
const tabRefs = ref([])
const weatherLoading = ref(true)
const weatherData = ref({})

const currentDayData = computed(() => {
  const dayData = itineraryData[currentDay.value]
  if (!dayData) return null
  
  // 合併動態天氣資料
  return {
    ...dayData,
    weather: weatherData.value[currentDay.value] || dayData.weather
  }
})

// 載入天氣資料
onMounted(async () => {
  try {
    weatherData.value = await getParisWeather()
  } catch (error) {
    console.error('Failed to load weather data:', error)
  } finally {
    weatherLoading.value = false
  }
})

function switchPage(page) {
  currentPage.value = page
  if (page === 'itinerary' && contentRef.value) {
    nextTick(() => {
      contentRef.value.scrollTo({ top: 0, behavior: 'smooth' })
    })
  }
}

function switchDay(day, event) {
  currentDay.value = day
  nextTick(() => {
    if (contentRef.value) {
      contentRef.value.scrollTo({ top: 0, behavior: 'smooth' })
    }
    // Scroll the clicked tab into view
    if (event && event.currentTarget) {
      event.currentTarget.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'nearest', 
        inline: 'center' 
      })
    }
  })
}

function getDayDate(day) {
  const dates = {
    0: '2/14 週六',
    1: '2/15 週日',
    2: '2/16 週一',
    3: '2/17 週二',
    4: '2/18 週三',
    5: '2/19 週四',
    6: '2/20 週五'
  }
  return dates[day]
}
</script>

<template>
  <header class="app-header">
    <div class="header-content">
      <h1 class="header-title">🇫🇷 巴黎五天四夜</h1>
      <p class="header-subtitle">2026/2/15 (日) - 2/19 (四)</p>
      
      <div class="page-nav">
        <button 
          class="page-nav-btn" 
          :class="{ active: currentPage === 'itinerary' }"
          @click="switchPage('itinerary')">
          📅 行程
        </button>
        <button 
          class="page-nav-btn" 
          :class="{ active: currentPage === 'todos' }"
          @click="switchPage('todos')">
          📋 待辦事項
        </button>
      </div>
    </div>

    <div v-if="currentPage === 'itinerary'" class="tab-nav-wrapper">
      <nav class="tab-nav">
        <div v-for="day in days" :key="day" class="tab-item" :class="{ active: currentDay === day }"
          @click="switchDay(day, $event)">
          <div class="tab-day">Day {{ day }}</div>
          <div class="tab-date">{{ getDayDate(day) }}</div>
        </div>
      </nav>
    </div>
  </header>

  <main class="app-content" ref="contentRef">
    <!-- 行程頁面 -->
    <div v-if="currentPage === 'itinerary'" class="day-content active">
      <div class="timeline" v-if="currentDayData">
        <WeatherCard v-if="currentDayData.weather" :weather="currentDayData.weather" :date="getDayDate(currentDay)" />

        <template v-for="(item, index) in currentDayData.items" :key="index">
          <TransitCard v-if="item.type === 'transit'" :data="item" />
          <TripCard v-else-if="item.type === 'card'" :data="item" />
        </template>
      </div>
      <div v-else class="timeline">
        <p style="padding: 20px; text-align: center; color: var(--text-secondary);">
          Day {{ currentDay }} 內容待添加
        </p>
      </div>
    </div>

    <!-- 待辦事項頁面 -->
    <TodoPage v-else-if="currentPage === 'todos'" />
  </main>
</template>
