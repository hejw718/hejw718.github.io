<script setup>
import { ref, onMounted } from 'vue'
import { souvenirData } from '../data/souvenirs'

const categories = ref(souvenirData.categories)
const expandedItems = ref(new Set())
const purchasedItems = ref(new Set())

// 從 localStorage 載入已購買狀態
onMounted(() => {
  const saved = localStorage.getItem('purchasedSouvenirs')
  if (saved) {
    purchasedItems.value = new Set(JSON.parse(saved))
  }
})

function toggleExpand(categoryIdx, itemIdx) {
  const key = `${categoryIdx}-${itemIdx}`
  if (expandedItems.value.has(key)) {
    expandedItems.value.delete(key)
  } else {
    expandedItems.value.add(key)
  }
}

function isExpanded(categoryIdx, itemIdx) {
  return expandedItems.value.has(`${categoryIdx}-${itemIdx}`)
}

function togglePurchased(categoryIdx, itemIdx) {
  const key = `${categoryIdx}-${itemIdx}`
  if (purchasedItems.value.has(key)) {
    purchasedItems.value.delete(key)
  } else {
    purchasedItems.value.add(key)
  }
  // 保存到 localStorage
  localStorage.setItem('purchasedSouvenirs', JSON.stringify([...purchasedItems.value]))
}

function isPurchased(categoryIdx, itemIdx) {
  return purchasedItems.value.has(`${categoryIdx}-${itemIdx}`)
}
</script>

<template>
  <div class="souvenir-page">
 
    <div class="categories">
      <section 
        v-for="(category, idx) in categories" 
        :key="idx" 
        class="category-section"
      >
        <h2 class="category-title">
          <span class="category-icon">{{ category.icon }}</span>
          {{ category.name }}
        </h2>

        <div class="items-grid">
          <div 
            v-for="(item, itemIdx) in category.items" 
            :key="itemIdx" 
            class="souvenir-card"
            :class="{ purchased: isPurchased(idx, itemIdx) }"
          >
            <div class="card-image" :style="{ backgroundImage: `url(${item.image})` }">
              <div v-if="isPurchased(idx, itemIdx)" class="purchased-badge">✓ 已購買</div>
            </div>
            
            <div class="card-content">
              <div class="card-header-row">
                <div class="title-group">
                  <h3 class="item-name">{{ item.name }}</h3>
                  <p class="item-name-en">{{ item.nameEn }}</p>
                </div>
                <label class="checkbox-container">
                  <input 
                    type="checkbox" 
                    :checked="isPurchased(idx, itemIdx)"
                    @change="togglePurchased(idx, itemIdx)"
                  />
                  <span class="checkmark"></span>
                </label>
              </div>
              
              <button 
                class="expand-btn"
                @click="toggleExpand(idx, itemIdx)"
              >
                {{ isExpanded(idx, itemIdx) ? '收起詳情 ▲' : '查看詳情 ▼' }}
              </button>
              
              <div v-show="isExpanded(idx, itemIdx)" class="item-details">
                <p class="item-description">{{ item.description }}</p>
                
                <div class="detail-row">
                  <span class="detail-icon">💰</span>
                  <span class="detail-text">{{ item.price }}</span>
                </div>
                <div class="detail-row">
                  <span class="detail-icon">📍</span>
                  <span class="detail-text">{{ item.where }}</span>
                </div>
                <div v-if="item.tips" class="detail-row tips">
                  <span class="detail-icon">💡</span>
                  <span class="detail-text">{{ item.tips }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<style scoped>
.souvenir-page {
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
}

.page-header {
  text-align: center;
  margin-bottom: 40px;
  padding: 30px 20px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 16px;
  color: white;
}

.page-title {
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 8px;
}

.page-subtitle {
  font-size: 1rem;
  opacity: 0.9;
}

.category-section {
  margin-bottom: 50px;
}

.category-title {
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 24px;
  color: var(--text-primary);
  display: flex;
  align-items: center;
  gap: 12px;
}

.category-icon {
  font-size: 1.8rem;
}

.items-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
}

.souvenir-card {
  background: white;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;
}

.souvenir-card:hover {
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
}

.card-image {
  width: 100%;
  aspect-ratio: 16 / 9;
  background-size: cover;
  background-position: center;
  border-radius: 12px 12px 0 0;
  position: relative;
}

.purchased-badge {
  position: absolute;
  top: 8px;
  right: 8px;
  background: linear-gradient(135deg, #10b981 0%, #059669 100%);
  color: white;
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 0.7rem;
  font-weight: 700;
  box-shadow: 0 2px 8px rgba(16, 185, 129, 0.4);
}

.souvenir-card.purchased {
  opacity: 0.7;
}

.souvenir-card.purchased .card-image {
  filter: grayscale(30%);
}

.card-content {
  padding: 14px;
}

.card-header-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
  margin-bottom: 10px;
}

.title-group {
  flex: 1;
  min-width: 0;
}

.item-name {
  font-size: 1rem;
  font-weight: 700;
  color: var(--text-primary);
  margin: 0 0 2px 0;
  line-height: 1.3;
}

.item-name-en {
  font-size: 0.75rem;
  color: #9ca3af;
  font-style: italic;
  margin: 0;
  line-height: 1.2;
}

.expand-btn {
  width: 100%;
  padding: 6px;
  background: #f9fafb;
  color: #6b7280;
  border: 1px solid #e5e7eb;
  border-radius: 6px;
  font-size: 0.8rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  margin-bottom: 10px;
}

.expand-btn:hover {
  background: #f3f4f6;
  border-color: #d1d5db;
}

.expand-btn:active {
  transform: scale(0.98);
}

.item-details {
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding-top: 10px;
  border-top: 1px solid #f3f4f6;
}

.item-description {
  font-size: 0.85rem;
  line-height: 1.5;
  color: var(--text-secondary);
  margin-bottom: 8px;
}

.detail-row {
  display: flex;
  align-items: flex-start;
  gap: 8px;
  font-size: 0.85rem;
}

.detail-row.tips {
  background: #fef3c7;
  padding: 8px;
  border-radius: 6px;
  border-left: 3px solid #f59e0b;
}

.detail-icon {
  font-size: 1rem;
  flex-shrink: 0;
  line-height: 1.5;
}

.detail-text {
  color: var(--text-primary);
  line-height: 1.5;
  flex: 1;
}

.detail-row.tips .detail-text {
  color: #92400e;
  font-weight: 500;
}

/* 自訂勾選框 */
.checkbox-container {
  display: block;
  position: relative;
  cursor: pointer;
  user-select: none;
  flex-shrink: 0;
}

.checkbox-container input {
  position: absolute;
  opacity: 0;
  cursor: pointer;
  height: 0;
  width: 0;
}

.checkmark {
  display: block;
  height: 22px;
  width: 22px;
  background-color: #f3f4f6;
  border: 2px solid #d1d5db;
  border-radius: 5px;
  transition: all 0.2s;
}

.checkbox-container:hover .checkmark {
  background-color: #e5e7eb;
}

.checkbox-container input:checked ~ .checkmark {
  background: linear-gradient(135deg, #10b981 0%, #059669 100%);
  border-color: #10b981;
}

.checkmark:after {
  content: "";
  position: absolute;
  display: none;
}

.checkbox-container input:checked ~ .checkmark:after {
  display: block;
}

.checkbox-container .checkmark:after {
  left: 7px;
  top: 3px;
  width: 5px;
  height: 10px;
  border: solid white;
  border-width: 0 2px 2px 0;
  transform: rotate(45deg);
}

/* 響應式設計 */
@media (max-width: 768px) {
  .souvenir-page {
    padding: 15px;
  }

  .page-header {
    padding: 20px 15px;
    margin-bottom: 30px;
  }

  .page-title {
    font-size: 1.6rem;
  }

  .items-grid {
    /* grid-template-columns: 1fr; */
    gap: 20px;
  }

  .category-title {
    font-size: 1.3rem;
  }
}
</style>
