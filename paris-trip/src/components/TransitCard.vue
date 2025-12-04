<script setup>
defineProps({
  data: {
    type: Object,
    required: true
  }
})

// 根據內容判斷行的類型
function getLineClass(line) {
  if (!line || line.trim() === '') return 'route-line route-line-empty'
  if (line.includes('【') && line.includes('】')) return 'route-line route-line-section'
  if (line.includes(':') || line.includes(':')) return 'route-line route-line-info'
  return 'route-line'
}
</script>

<template>
  <div class="transit-card">
    <div class="transit-icon">{{ data.icon }}</div>
    <div class="transit-info">
      <div class="transit-duration">{{ data.duration }}</div>
      <div class="transit-route">
        <!-- 如果 route 是陣列,顯示為條列式 -->
        <template v-if="Array.isArray(data.route)">
          <div 
            v-for="(line, index) in data.route" 
            :key="index" 
            :class="getLineClass(line)"
          >
            {{ line }}
          </div>
        </template>
        <!-- 否則使用 v-html 顯示 -->
        <div v-else v-html="data.route"></div>
      </div>
    </div>
    <a v-if="data.ticketUrl" :href="data.ticketUrl" target="_blank" class="transit-ticket-btn">
      🎫 查看票券
    </a>
  </div>
</template>

<style scoped>
.route-line {
  line-height: 1.8;
  padding: 2px 0;
}

/* 空行 */
.route-line-empty {
  height: 6px;
}

/* 航段標題 */
.route-line-section {
  font-weight: 700;
  color: var(--primary-color);
  margin-top: 10px;
  font-size: 14px;
}

.route-line-section:first-child {
  margin-top: 0;
}

/* 資訊項目 (時間、航廈等) */
.route-line-info {
  font-size: 13px;
  color: var(--text-secondary);
  padding-left: 8px;
}
</style>
