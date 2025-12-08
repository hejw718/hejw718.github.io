<script setup>
import { ref } from 'vue'
import { disneylandData } from '../data/disneyland'

const attractions = ref(disneylandData.attractions)
const schedule = ref(disneylandData.schedule)
const tips = ref(disneylandData.tips)

// 將評分轉換為星星顯示
function getStars(rating) {
  const fullStars = Math.floor(rating)
  const hasHalfStar = rating % 1 !== 0
  let stars = '★'.repeat(fullStars)
  if (hasHalfStar) stars += '☆'
  return stars
}

// 根據類別設定顏色
function getCategoryColor(category) {
  const colors = {
    '入園': '#FF6B9D',
    '拍照': '#C084FC',
    '明日世界': '#60A5FA',
    '遊行': '#F59E0B',
    '幻想世界': '#EC4899',
    '餐飲': '#10B981',
    '探險世界': '#8B5CF6',
    '邊疆世界': '#F97316',
    '交通': '#6B7280',
    '購物': '#14B8A6',
    '煙火秀': '#F43F5E',
    '自由時間': '#78716C'
  }
  return colors[category] || '#6B7280'
}

// 獲取區域英文名稱
function getCategoryEnglish(category) {
  const english = {
    '入園': 'Entrance',
    '拍照': 'Photo Spot',
    '明日世界': 'Discoveryland',
    '遊行': 'Parade',
    '幻想世界': 'Fantasyland',
    '餐飲': 'Dining',
    '探險世界': 'Adventureland',
    '邊疆世界': 'Frontierland',
    '交通': 'Transit',
    '購物': 'Shopping',
    '煙火秀': 'Fireworks',
    '自由時間': 'Free Time'
  }
  return english[category] || category
}
</script>

<template>
  <div class="disneyland-page">


    <section class="section">
      <h2 class="section-title">⏰ 時間表</h2>
      
      <div class="schedule-timeline">
        <div 
          v-for="(item, index) in schedule" 
          :key="index" 
          :data-index="index"
          class="timeline-item"
        >
          <div class="timeline-marker">
            <div class="time-circle" :style="{ borderColor: getCategoryColor(item.category) }">
              {{ item.time }}
            </div>
            <div v-if="index < schedule.length - 1" class="timeline-line"></div>
          </div>
          <div class="timeline-content">
            <div class="content-header">
              <div class="title-wrapper">
                <h3 class="item-title">{{ item.title }}</h3>
                <div v-if="item.nameEn" class="item-name-en">{{ item.nameEn }}</div>
                <div v-if="item.type" class="item-type">{{ item.type }}</div>
              </div>
              <span 
                class="category-tag" 
                :style="{ backgroundColor: getCategoryColor(item.category) }"
              >
                <span class="category-zh">{{ item.category }}</span>
                <span class="category-en">{{ getCategoryEnglish(item.category) }}</span>
              </span>
            </div>
            <p class="item-description">{{ item.description }}</p>
            <div class="item-meta">
              <span v-if="item.waitTime" class="meta-badge wait-time">⏱️ 排隊: {{ item.waitTime }}</span>
              <span v-if="item.thrillLevel !== undefined" class="meta-badge thrill-level">
                刺激度: {{ item.thrillLevel }}%
              </span>
              <span v-if="item.duration" class="meta-badge duration">
                時長: {{ item.duration }}分鐘
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 溫馨提示 -->
    <section class="section tips-section">
      <h2 class="section-title">💡 溫馨提示</h2>
      <ul class="tips-list">
        <li v-for="(tip, index) in tips" :key="index" class="tip-item">
          {{ tip }}
        </li>
      </ul>
    </section>
  </div>
</template>

<style scoped>
.disneyland-page {
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
}

/* 頁面標題 */
.page-header {
  text-align: center;
  margin-bottom: 40px;
  padding: 30px 20px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 20px;
  color: white;
}

.page-title {
  font-size: 2.5rem;
  font-weight: bold;
  margin: 0 0 10px 0;
}

.page-subtitle {
  font-size: 1.2rem;
  opacity: 0.9;
  margin: 0;
}

/* 區塊 */
.section {
  margin-bottom: 50px;
}

.section-title {
  font-size: 1.8rem;
  font-weight: bold;
  margin-bottom: 20px;
  color: var(--text-primary);
  border-left: 4px solid #667eea;
  padding-left: 15px;
}

/* 搜尋框 */
.search-container {
  position: relative;
  margin-bottom: 30px;
}

.search-input {
  width: 100%;
  padding: 12px 20px;
  font-size: 1rem;
  border: 2px solid #e5e7eb;
  border-radius: 12px;
  outline: none;
  transition: border-color 0.3s;
}

.search-input:focus {
  border-color: #667eea;
}

.search-results {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  margin-top: 8px;
  max-height: 400px;
  overflow-y: auto;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  z-index: 100;
}

.search-result-item {
  padding: 12px 16px;
  cursor: pointer;
  transition: background-color 0.2s;
  border-bottom: 1px solid #f3f4f6;
}

.search-result-item:last-child {
  border-bottom: none;
}

.search-result-item:hover {
  background-color: #f9fafb;
}

.result-title {
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 4px;
}

.result-meta {
  display: flex;
  gap: 12px;
  font-size: 0.85rem;
  color: var(--text-secondary);
}

.result-time {
  font-weight: 500;
  color: #667eea;
}

.result-category {
  color: var(--text-secondary);
}

/* 設施表格 */
.attractions-table-wrapper {
  overflow-x: auto;
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.attractions-table {
  width: 100%;
  border-collapse: collapse;
}

.attractions-table thead {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
}

.attractions-table th {
  padding: 15px;
  text-align: left;
  font-weight: 600;
  font-size: 1rem;
}

.attractions-table tbody tr {
  border-bottom: 1px solid #e5e7eb;
  transition: background-color 0.2s;
}

.attractions-table tbody tr:hover {
  background-color: #f9fafb;
}

.attractions-table td {
  padding: 15px;
  vertical-align: top;
}

.attraction-name {
  min-width: 200px;
}

.name-zh {
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 5px;
}

.name-en {
  font-size: 0.85rem;
  color: var(--text-secondary);
}

.rating {
  color: #fbbf24;
  font-size: 1.1rem;
  min-width: 120px;
}

.description {
  color: var(--text-primary);
  line-height: 1.6;
}

/* 時間表 */
.schedule-timeline {
  position: relative;
}

.timeline-item {
  display: flex;
  margin-bottom: 30px;
}

.timeline-marker {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-right: 20px;
  flex-shrink: 0;
}

.time-circle {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  border: 3px solid #667eea;
  background: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: 0.9rem;
  color: var(--text-primary);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  z-index: 1;
}

.timeline-line {
  width: 2px;
  flex: 1;
  background: linear-gradient(to bottom, #667eea, #e5e7eb);
  margin-top: 5px;
  min-height: 30px;
}

.timeline-content {
  flex: 1;
  background: white;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s, box-shadow 0.2s;
}

.timeline-content:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

/* 高亮動畫 */
.timeline-item.highlighted .timeline-content {
  animation: highlight-pulse 2s ease-in-out;
}

@keyframes highlight-pulse {
  0%, 100% {
    background-color: white;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }
  50% {
    background-color: #fef3c7;
    box-shadow: 0 4px 16px rgba(245, 158, 11, 0.3);
  }
}

.content-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
  flex-wrap: wrap;
  gap: 10px;
}

.item-title {
  font-size: 1.2rem;
  font-weight: 600;
  color: var(--text-primary);
  margin: 0;
}

.title-wrapper {
  flex: 1;
}

.item-name-en {
  font-size: 0.85rem;
  color: var(--text-secondary);
  margin-top: 4px;
  font-style: italic;
}

.item-type {
  font-size: 0.9rem;
  color: #6366f1;
  margin-top: 4px;
  font-weight: 500;
}


.category-tag {
  padding: 4px 12px;
  border-radius: 20px;
  color: white;
  font-size: 0.85rem;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 2px;
}

.category-zh {
  font-weight: 600;
}

.category-en {
  font-size: 0.7rem;
  opacity: 0.9;
}

.item-description {
  color: var(--text-primary);
  line-height: 1.6;
  margin-bottom: 10px;
}

.item-meta {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}

.meta-badge {
  padding: 4px 10px;
  border-radius: 6px;
  font-size: 0.85rem;
  font-weight: 500;
}

.wait-time {
  background-color: #fce7f3;
  color: #831843;
}

.thrill-level {
  background-color: #dbeafe;
  color: #1e40af;
}

.duration {
  background-color: #e0e7ff;
  color: #3730a3;
}

/* 溫馨提示 */
.tips-section {
  background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%);
  padding: 30px;
  border-radius: 12px;
}

.tips-section .section-title {
  color: #92400e;
  border-left-color: #f59e0b;
}

.tips-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.tip-item {
  padding: 12px 0;
  padding-left: 30px;
  position: relative;
  color: #78350f;
  font-weight: 500;
  line-height: 1.6;
}

.tip-item::before {
  content: "✓";
  position: absolute;
  left: 0;
  color: #f59e0b;
  font-weight: bold;
  font-size: 1.2rem;
}

/* 響應式設計 */
@media (max-width: 768px) {
  .disneyland-page {
    padding: 15px;
  }

  .page-header {
    padding: 20px 15px;
    margin-bottom: 30px;
  }

  .page-title {
    font-size: 1.8rem;
  }

  .page-subtitle {
    font-size: 1rem;
  }

  .section-title {
    font-size: 1.4rem;
  }

  /* 手機版時間軸優化 */
  .timeline-item {
    margin-bottom: 25px;
  }

  .timeline-marker {
    margin-right: 12px;
  }

  .time-circle {
    width: 60px;
    height: 60px;
    font-size: 0.75rem;
  }

  .timeline-content {
    padding: 15px;
  }

  .content-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
  }

  .title-wrapper {
    width: 100%;
  }

  .item-title {
    font-size: 1.05rem;
    line-height: 1.4;
  }

  .item-name-en {
    font-size: 0.8rem;
    margin-top: 3px;
  }

  .item-type {
    font-size: 0.85rem;
    margin-top: 3px;
  }

  .category-tag {
    font-size: 0.8rem;
    padding: 3px 10px;
  }

  .item-description {
    font-size: 0.95rem;
    line-height: 1.5;
  }

  .item-meta {
    gap: 8px;
  }

  .meta-badge {
    font-size: 0.8rem;
    padding: 3px 8px;
  }

  /* 提示區塊 */
  .tips-section {
    padding: 20px 15px;
  }

  .tip-item {
    font-size: 0.95rem;
    padding: 10px 0;
    padding-left: 25px;
  }

  .tip-item::before {
    font-size: 1rem;
  }
}
</style>
