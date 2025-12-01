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
    <div class="weather-header">
      <div class="weather-icon">{{ weather.icon }}</div>
      <div class="weather-main">
        <div class="weather-date" v-if="date">{{ date }}</div>
        <div class="weather-temp">{{ weather.temp }}</div>
        <div class="weather-desc">{{ weather.condition }}</div>
      </div>
    </div>
    <div class="weather-details">
      <div class="weather-detail-item">
        <div class="weather-detail-label">高溫/低溫</div>
        <div class="weather-detail-value">{{ weather.high }} / {{ weather.low }}</div>
      </div>
      <div class="weather-detail-item">
        <div class="weather-detail-label">降雨機率</div>
        <div class="weather-detail-value">{{ weather.rain }}</div>
      </div>
      <div class="weather-detail-item" style="grid-column: 1 / -1;">
        <div class="weather-detail-label">建議</div>
        <div class="weather-detail-value">{{ weather.suggestion }}</div>
      </div>
    </div>
  </div>
</template>
