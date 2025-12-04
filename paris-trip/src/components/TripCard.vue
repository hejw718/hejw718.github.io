<script setup>
import { ref } from 'vue'

defineProps({
  data: {
    type: Object,
    required: true
  }
})

const expanded = ref(false)

function toggleDetails() {
  expanded.value = !expanded.value
}
</script>

<template>
  <div class="trip-card">
    <div class="card-body">
      <div class="card-header">
        <div class="card-category">{{ data.category }}</div>
        <div class="card-title">{{ data.title }}</div>
        <div class="card-time">⏰ {{ data.time }}</div>
      </div>
      <div class="card-description" v-html="data.description"></div>
      <button class="btn-expand" @click="toggleDetails">
        <span>{{ expanded ? '▲' : '▼' }}</span> 查看詳細資訊
      </button>
      <div class="card-details" :class="{ expanded: expanded }">
        <div class="card-details-content">
          <div class="detail-item">
            <div class="detail-label">時間</div>
            <div class="detail-value">{{ data.time }}</div>
          </div>
          <div class="detail-item">
            <div class="detail-label">地點</div>
            <div class="detail-value">{{ data.location }}</div>
          </div>
          <div class="detail-item">
            <div class="detail-label">營業時間</div>
            <div class="detail-value" v-html="data.hours.join('<br>')"></div>
          </div>
        </div>
      </div>
      <div class="card-actions">
        <a v-if="data.ticketUrl" :href="data.ticketUrl" target="_blank"
          class="btn-action btn-ticket">
          🎫 查看門票
        </a>
        <a :href="`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(data.location)}`" target="_blank"
          class="btn-action btn-secondary">
          📍 地圖
        </a>
        <a :href="`https://www.google.com/maps/dir/?api=1&origin=Leonardo+Boutique+Hotel+Paris+Opera&destination=${encodeURIComponent(data.location)}`"
          target="_blank" class="btn-action btn-primary">
          🚗 導航
        </a>
      </div>
    </div>
  </div>
</template>
