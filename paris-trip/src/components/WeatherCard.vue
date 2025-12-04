<script setup>
defineProps({
  weather: {
    type: Object,
    required: true
  },
  date: {
    type: String,
    required: false
  }
})
</script>

<template>
  <div class="weather-card">
    <div class="weather-compact">
      <div class="weather-icon">{{ weather.icon }}</div>
      <div class="weather-info">
        <div class="weather-date" v-if="date">{{ date }}</div>
        <div class="weather-summary">
          <span class="weather-temp">{{ weather.temp }}</span>
          <span class="weather-range">{{ weather.low }} ~ {{ weather.high }}</span>
          <span class="weather-condition">{{ weather.condition }}</span>
          <span class="weather-rain">💧 {{ weather.rain }}</span>
        </div>
      </div>
    </div>
    <div class="weather-note">
      ℹ️ 基於巴黎 2 月歷史氣候資料的參考預測
    </div>
  </div>
</template>

<style scoped>
.weather-compact {
  display: flex;
  align-items: center;
  gap: 12px;
}

.weather-icon {
  font-size: 32px;
  flex-shrink: 0;
}

.weather-info {
  flex: 1;
  min-width: 0;
}

.weather-date {
  font-size: 10px;
  color: #92400e;
  font-weight: 600;
  margin-bottom: 2px;
}

.weather-summary {
  display: flex;
  align-items: center;
  gap: 10px;
  flex-wrap: wrap;
  font-size: 13px;
}

.weather-temp {
  font-size: 18px;
  font-weight: 700;
  color: #92400e;
}

.weather-range {
  color: #78350f;
  font-size: 12px;
}

.weather-condition {
  color: #78350f;
  font-weight: 500;
}

.weather-rain {
  color: #78350f;
  font-size: 12px;
}

.weather-note {
  margin-top: 8px;
  padding-top: 8px;
  border-top: 1px solid rgba(146, 64, 14, 0.2);
  font-size: 10px;
  color: #92400e;
  text-align: center;
  opacity: 0.8;
}
</style>


