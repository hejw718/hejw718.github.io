<script setup>
defineProps({
  data: {
    type: Object,
    required: true
  }
})

// 判斷是否為航班資訊
function isFlight(data) {
  return data.route && Array.isArray(data.route) && data.route.some(line => line.includes('航班'))
}

// 解析航班資訊為結構化資料
function parseFlightInfo(route) {
  const segments = []
  let currentSegment = null
  
  route.forEach(line => {
    if (line.includes('【') && line.includes('】')) {
      if (currentSegment) segments.push(currentSegment)
      currentSegment = { title: line, details: [] }
    } else if (line.trim() !== '' && currentSegment) {
      currentSegment.details.push(line)
    }
  })
  
  if (currentSegment) segments.push(currentSegment)
  return segments
}
</script>

<template>
  <div class="transit-card" :class="{ 'is-flight': isFlight(data) }">
    <!-- 航班資訊 - 特殊設計 -->
    <template v-if="isFlight(data)">
      <div class="flight-header">
        <div class="flight-icon">{{ data.icon }}</div>
        <div class="flight-title-group">
          <h3 class="flight-title">{{ data.duration }}</h3>
          <p class="flight-route">{{ data.origin }} → {{ data.destination }}</p>
        </div>
      </div>

      <div class="flight-segments">
        <div 
          v-for="(segment, idx) in parseFlightInfo(data.route)" 
          :key="idx"
          class="segment"
        >
          <div class="segment-title">{{ segment.title }}</div>
          <div class="segment-details">
            <div v-for="(detail, detailIdx) in segment.details" :key="detailIdx" class="detail-line">
              {{ detail }}
            </div>
          </div>
        </div>
      </div>
    </template>

    <!-- 一般交通資訊 - 簡潔設計 -->
    <template v-else>
      <div class="transit-header">
        <span class="transit-icon">{{ data.icon }}</span>
        <div class="transit-text">
          <div class="transit-duration">{{ data.duration }}</div>
          <div v-if="data.route" class="transit-route">
            <template v-if="Array.isArray(data.route)">
              <div v-for="(line, index) in data.route" :key="index" class="route-line">
                {{ line }}
              </div>
            </template>
            <div v-else v-html="data.route"></div>
          </div>
        </div>
      </div>
    </template>

    <!-- 票券按鈕 -->
    <a v-if="data.ticketUrl" :href="data.ticketUrl" target="_blank" class="ticket-link">
      🎫 查看票券
    </a>
  </div>
</template>

<style scoped>
.transit-card {
  background: white;
  border-radius: 12px;
  padding: 20px;
  margin-bottom: 16px;
  border: 1px solid #e5e7eb;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
  transition: all 0.2s ease;
}

.transit-card:hover {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.12);
}

/* 航班資訊樣式 */
.transit-card.is-flight {
  background: linear-gradient(to bottom, #fffbeb 0%, white 100%);
  border-left: 4px solid #f59e0b;
  padding: 24px;
  display: flex;
  flex-direction: column;
}

.flight-header {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 24px;
  padding-bottom: 20px;
  border-bottom: 2px solid #fef3c7;
}

.flight-icon {
  font-size: 40px;
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1));
}

.flight-title-group {
  flex: 1;
}

.flight-title {
  font-size: 1.3rem;
  font-weight: 700;
  color: #92400e;
  margin: 0 0 6px 0;
}

.flight-route {
  font-size: 1rem;
  color: #78350f;
  margin: 0;
  font-weight: 500;
}

.flight-segments {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.segment {
  position: relative;
  padding-left: 24px;
}

.segment::before {
  content: '';
  position: absolute;
  left: 7px;
  top: 10px;
  bottom: -10px;
  width: 2px;
  background: linear-gradient(to bottom, #fbbf24, transparent);
}

.segment:last-child::before {
  display: none;
}

.segment-title {
  font-weight: 700;
  color: #f59e0b;
  font-size: 1rem;
  margin-bottom: 10px;
  position: relative;
  line-height: 1.5;
}

.segment-title::before {
  content: '●';
  position: absolute;
  left: -24px;
  color: #f59e0b;
  font-size: 1.3rem;
}

.segment-details {
  display: flex;
  flex-direction: column;
  gap: 6px;
  padding-left: 4px;
}

.detail-line {
  font-size: 0.95rem;
  color: #6b7280;
  line-height: 1.8;
}

/* 一般交通資訊樣式 */
.transit-header {
  display: flex;
  align-items: flex-start;
  gap: 14px;
}

.transit-icon {
  font-size: 30px;
  flex-shrink: 0;
  filter: drop-shadow(0 1px 2px rgba(0, 0, 0, 0.1));
}

.transit-text {
  flex: 1;
  min-width: 0;
}

.transit-duration {
  font-size: 1.05rem;
  font-weight: 700;
  color: var(--primary-color);
  margin-bottom: 8px;
}

.transit-route {
  font-size: 0.95rem;
  color: var(--text-secondary);
  line-height: 1.7;
}

.route-line {
  margin-bottom: 4px;
}

/* 票券按鈕 */
.ticket-link {
  display: inline-block;
  margin-top: 16px;
  padding: 10px 18px;
  background: linear-gradient(135deg, #10b981 0%, #059669 100%);
  color: white;
  border-radius: 8px;
  font-size: 0.95rem;
  font-weight: 600;
  text-decoration: none;
  box-shadow: 0 2px 4px rgba(16, 185, 129, 0.2);
  transition: all 0.2s;
}

.ticket-link:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 8px rgba(16, 185, 129, 0.3);
}

.ticket-link:active {
  transform: translateY(0);
}

/* 響應式設計 */
@media (max-width: 768px) {
  .transit-card {
    padding: 16px;
  }

  .transit-card.is-flight {
    padding: 18px;
  }

  .flight-header {
    gap: 12px;
    margin-bottom: 20px;
    padding-bottom: 16px;
  }

  .flight-icon {
    font-size: 36px;
  }

  .flight-title {
    font-size: 1.15rem;
  }

  .flight-route {
    font-size: 0.95rem;
  }

  .flight-segments {
    gap: 16px;
  }

  .transit-icon {
    font-size: 26px;
  }

  .segment-title {
    font-size: 0.95rem;
  }

  .detail-line {
    font-size: 0.9rem;
  }
}
</style>
