<script setup>
import { ref, computed, nextTick, onMounted } from "vue";
import { itineraryData } from "./data/itinerary";
import { disneylandData } from "./data/disneyland";
import { getParisWeather } from "./services/weatherService";
import WeatherCard from "./components/WeatherCard.vue";
import TransitCard from "./components/TransitCard.vue";
import TripCard from "./components/TripCard.vue";
import TodoPage from "./components/TodoPage.vue";
import DisneylandPage from "./components/DisneylandPage.vue";
import SouvenirPage from "./components/SouvenirPage.vue";
import PriceComparisonPage from "./components/PriceComparisonPage.vue";
import PackingListPage from "./components/PackingListPage.vue";
import { trips } from "./data/trips";
import { currentTrip, switchTrip } from "./utils/tripStore";

const showTripModal = ref(false);
const currentPage = ref("itinerary"); // 'itinerary', 'todos', or 'disneyland'

// 從 URL hash 讀取初始頁面
function getInitialPage() {
  const hash = window.location.hash.slice(1); // 移除 # 符號
  const validPages = [
    "disneyland",
    "todos",
    "itinerary",
    "souvenirs",
    "price-comparison",
    "packing",
  ];
  if (validPages.includes(hash)) {
    return hash;
  }
  return "itinerary";
}

// 根據當前日期智能判斷應該顯示哪一天
function getInitialDay() {
  const today = new Date();
  const tripStart = new Date("2026-02-14"); // Day 1
  const tripEnd = new Date("2026-02-21"); // Day 8

  // 如果還沒到旅行日期,顯示 Day 1
  if (today < tripStart) {
    return 1;
  }

  // 如果已經過了旅行日期,顯示 Day 8
  if (today > tripEnd) {
    return 8;
  }

  // 在旅行期間,計算是第幾天 (從 Day 1 開始)
  const diffTime = today - tripStart;
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  return Math.min(diffDays + 1, 8);
}

const currentDay = ref(getInitialDay());
const days = [1, 2, 3, 4, 5, 6, 7, 8];
const contentRef = ref(null);
const tabRefs = ref([]);
const weatherLoading = ref(true);
const weatherData = ref({});

const currentDayData = computed(() => {
  const dayData = itineraryData[currentDay.value];
  if (!dayData) return null;

  // 合併動態天氣資料
  return {
    ...dayData,
    weather: weatherData.value[currentDay.value] || dayData.weather,
  };
});

// 載入天氣資料
onMounted(async () => {
  // 從 URL hash 設定初始頁面
  currentPage.value = getInitialPage();

  // 監聽 hash 變化
  window.addEventListener("hashchange", () => {
    const hash = window.location.hash.slice(1);
    const validPages = [
      "disneyland",
      "todos",
      "itinerary",
      "souvenirs",
      "price-comparison",
      "packing",
    ];
    if (validPages.includes(hash)) {
      currentPage.value = hash;
    }
  });

  try {
    weatherData.value = await getParisWeather();
  } catch (error) {
    console.error("Failed to load weather data:", error);
  } finally {
    weatherLoading.value = false;
  }
});

function switchPage(page) {
  currentPage.value = page;
  // 更新 URL hash
  window.location.hash = page;

  if (page === "itinerary" && contentRef.value) {
    nextTick(() => {
      contentRef.value.scrollTo({ top: 0, behavior: "smooth" });
    });
  }
}

// 搜尋功能
const searchQuery = ref("");
const searchResults = ref([]);
const showSearchResults = ref(false);

// 執行搜尋
function performSearch() {
  const query = searchQuery.value.toLowerCase().trim();

  if (!query) {
    searchResults.value = [];
    showSearchResults.value = false;
    return;
  }

  const results = [];

  // 1. 搜尋行程 (包含航班)
  Object.keys(itineraryData).forEach((day) => {
    const dayData = itineraryData[day];
    if (dayData && dayData.items) {
      dayData.items.forEach((item, index) => {
        // 基本欄位搜尋
        const titleMatch = item.title?.toLowerCase().includes(query);
        const locationMatch = item.location?.toLowerCase().includes(query);
        const categoryMatch = item.category?.toLowerCase().includes(query);
        const descMatch = item.description?.toLowerCase().includes(query);

        // 交通/航班欄位搜尋
        const originMatch = item.origin?.toLowerCase().includes(query);
        const destMatch = item.destination?.toLowerCase().includes(query);
        const routeMatch =
          Array.isArray(item.route) &&
          item.route.some((r) => r.toLowerCase().includes(query));

        if (
          titleMatch ||
          locationMatch ||
          categoryMatch ||
          descMatch ||
          originMatch ||
          destMatch ||
          routeMatch
        ) {
          results.push({
            type: "itinerary",
            day: parseInt(day),
            index,
            title: item.title || `${item.origin} ➝ ${item.destination}`,
            category:
              item.category || (item.type === "transit" ? "交通/航班" : "行程"),
            time: item.time || item.duration,
          });
        }
      });
    }
  });

  // 2. 搜尋迪士尼
  disneylandData.schedule.forEach((item, index) => {
    const titleMatch = item.title?.toLowerCase().includes(query);
    const nameEnMatch = item.nameEn?.toLowerCase().includes(query);
    const typeMatch = item.type?.toLowerCase().includes(query);
    const categoryMatch = item.category?.toLowerCase().includes(query);

    if (titleMatch || nameEnMatch || typeMatch || categoryMatch) {
      results.push({
        type: "disneyland",
        index,
        title: item.title,
        category: `迪士尼 - ${item.category}`,
        time: item.time,
      });
    }
  });

  searchResults.value = results;
  showSearchResults.value = results.length > 0;
}

// 跳轉到搜尋結果
function gotoSearchResult(result) {
  // 關閉搜尋結果
  showSearchResults.value = false;
  searchQuery.value = "";

  if (result.type === "disneyland") {
    // 切換到迪士尼頁面
    switchPage("disneyland");

    // 等待頁面切換完成
    setTimeout(() => {
      const element = document.querySelector(`[data-index="${result.index}"]`);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "center" });
        element.classList.add("highlighted"); // 使用迪士尼頁面定義的 class
        setTimeout(() => element.classList.remove("highlighted"), 2000);
      }
    }, 300);
  } else {
    // 切換到行程頁面
    if (currentPage.value !== "itinerary") {
      switchPage("itinerary");
    }

    // 切換到對應的天數
    currentDay.value = result.day;

    // 等待DOM更新
    nextTick(() => {
      // 1. 滾動 Tab 到可見範圍
      const tabElement = document.querySelector(
        `.tab-item:nth-child(${result.day})`,
      );
      if (tabElement) {
        tabElement.scrollIntoView({
          behavior: "smooth",
          block: "nearest",
          inline: "center",
        });
      }

      // 2. 滾動到指定項目
      const element = document.querySelector(
        `[data-day="${result.day}"][data-item-index="${result.index}"]`,
      );
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "center" });
        element.classList.add("search-highlighted");
        setTimeout(() => element.classList.remove("search-highlighted"), 2000);
      }
    });
  }
}

function switchDay(day, event) {
  currentDay.value = day;
  nextTick(() => {
    if (contentRef.value) {
      contentRef.value.scrollTo({ top: 0, behavior: "smooth" });
    }
    // Scroll the clicked tab into view
    if (event && event.currentTarget) {
      event.currentTarget.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "center",
      });
    }
  });
}

function getDayDate(day) {
  const dates = {
    1: "2/14 週六",
    2: "2/15 週日",
    3: "2/16 週一",
    4: "2/17 週二",
    5: "2/18 週三",
    6: "2/19 週四",
    7: "2/20 週五",
    8: "2/21 週六",
  };
  return dates[day];
}
</script>

<template>
  <header class="app-header">
    <div class="header-content">
      <h1 class="header-title">
        {{ currentTrip.flag }} {{ currentTrip.fullName }}
      </h1>
      <p class="header-subtitle">{{ currentTrip.dates }}</p>

      <!-- Trip Switcher Button -->
      <button class="trip-switch-btn" @click="showTripModal = true">
        ✈️ 切換旅程
      </button>

      <!-- Trip Selection Modal -->
      <div
        v-if="showTripModal"
        class="trip-modal-overlay"
        @click.self="showTripModal = false"
      >
        <div class="trip-modal">
          <h3>選擇您的旅程</h3>
          <div class="trip-list">
            <button
              v-for="trip in trips"
              :key="trip.id"
              class="trip-option"
              :class="{ active: currentTrip.id === trip.id }"
              @click="
                switchTrip(trip.id);
                showTripModal = false;
              "
            >
              <span class="t-flag">{{ trip.flag }}</span>
              <div class="t-info">
                <span class="t-name">{{ trip.name }}</span>
                <span class="t-date">{{ trip.dates }}</span>
              </div>
              <span v-if="currentTrip.id === trip.id" class="t-check">✓</span>
            </button>
          </div>
          <button class="modal-close" @click="showTripModal = false">
            取消
          </button>
        </div>
      </div>

      <!-- 全域搜尋框 -->
      <div class="search-container">
        <input
          v-model="searchQuery"
          @input="performSearch"
          type="text"
          class="search-input"
          placeholder="🔍 輸入關鍵字..."
        />

        <!-- 搜尋結果下拉 -->
        <div v-if="showSearchResults" class="search-results">
          <div
            v-for="(result, idx) in searchResults"
            :key="idx"
            class="search-result-item"
            @click="gotoSearchResult(result)"
          >
            <div class="result-title">{{ result.title }}</div>
            <div class="result-meta">
              <span v-if="result.type === 'itinerary'" class="result-day"
                >Day {{ result.day }}</span
              >
              <span
                v-else
                class="result-day"
                style="background: #fce7f3; color: #db2777"
                >Disney</span
              >
              <span v-if="result.time" class="result-time">{{
                result.time
              }}</span>
              <span v-if="result.category" class="result-category">{{
                result.category
              }}</span>
            </div>
          </div>
        </div>
      </div>

      <div class="page-nav">
        <button
          class="page-nav-btn"
          :class="{ active: currentPage === 'itinerary' }"
          @click="switchPage('itinerary')"
        >
          📅 行程
        </button>
        <button
          class="page-nav-btn"
          :class="{ active: currentPage === 'todos' }"
          @click="switchPage('todos')"
        >
          📋 待辦事項
        </button>
        <button
          class="page-nav-btn"
          :class="{ active: currentPage === 'disneyland' }"
          @click="switchPage('disneyland')"
        >
          🏰 迪士尼攻略
        </button>
        <button
          class="page-nav-btn"
          :class="{ active: currentPage === 'souvenirs' }"
          @click="switchPage('souvenirs')"
        >
          🎁 伴手禮
        </button>
        <button
          class="page-nav-btn"
          :class="{ active: currentPage === 'price-comparison' }"
          @click="switchPage('price-comparison')"
        >
          💰 比價
        </button>
        <button
          class="page-nav-btn"
          :class="{ active: currentPage === 'packing' }"
          @click="switchPage('packing')"
        >
          🧳 行李
        </button>
      </div>
    </div>

    <div v-if="currentPage === 'itinerary'" class="tab-nav-wrapper">
      <nav class="tab-nav">
        <div
          v-for="day in days"
          :key="day"
          class="tab-item"
          :class="{ active: currentDay === day }"
          @click="switchDay(day, $event)"
        >
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
        <WeatherCard
          v-if="currentDayData.weather"
          :weather="currentDayData.weather"
          :date="getDayDate(currentDay)"
        />

        <template v-for="(item, index) in currentDayData.items" :key="index">
          <TransitCard
            v-if="item.type === 'transit'"
            :data="item"
            :data-day="currentDay"
            :data-item-index="index"
          />
          <TripCard
            v-else-if="item.type === 'card'"
            :data="item"
            :data-day="currentDay"
            :data-item-index="index"
          />
        </template>
      </div>
      <div v-else class="timeline">
        <p
          style="
            padding: 20px;
            text-align: center;
            color: var(--text-secondary);
          "
        >
          Day {{ currentDay }} 內容待添加
        </p>
      </div>
    </div>

    <!-- 待辦事項頁面 -->
    <TodoPage v-else-if="currentPage === 'todos'" :key="currentTrip.id" />

    <!-- 迪士尼攻略頁面 -->
    <DisneylandPage
      v-else-if="currentPage === 'disneyland'"
      :key="currentTrip.id"
    />

    <!-- 伴手禮推薦頁面 -->
    <SouvenirPage
      v-else-if="currentPage === 'souvenirs'"
      :key="currentTrip.id"
    />

    <!-- 比價頁面 -->
    <PriceComparisonPage
      v-else-if="currentPage === 'price-comparison'"
      :key="currentTrip.id"
    />

    <!-- 行李清單頁面 -->
    <PackingListPage
      v-else-if="currentPage === 'packing'"
      :key="currentTrip.id"
    />
  </main>
</template>
