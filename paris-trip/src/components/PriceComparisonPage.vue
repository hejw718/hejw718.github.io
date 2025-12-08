<script setup>
import { ref, computed, onMounted } from 'vue'
import { exchangeRate as defaultRate } from '../data/priceComparison'

// 匯率設定
const exchangeRate = ref(defaultRate.eurToTwd)

// 表單資料
const formData = ref({
  store: '',
  item: '',
  eurAmount: ''
})

// 比價列表
const comparisonList = ref([])

// 從 localStorage 載入資料
onMounted(() => {
  const savedList = localStorage.getItem('paris-price-comparison')
  const savedRate = localStorage.getItem('paris-exchange-rate')
  
  if (savedList) {
    try {
      comparisonList.value = JSON.parse(savedList)
    } catch (e) {
      console.error('Failed to load comparison list', e)
    }
  }
  
  if (savedRate) {
    exchangeRate.value = parseFloat(savedRate)
  }
})

// 計算台幣金額
const twdAmount = computed(() => {
  const eur = parseFloat(formData.value.eurAmount)
  if (isNaN(eur) || eur <= 0) return 0
  return Math.round(eur * exchangeRate.value)
})

// 以品項分組的資料
const groupedByItem = computed(() => {
  const groups = {}
  
  comparisonList.value.forEach(item => {
    if (!groups[item.item]) {
      groups[item.item] = []
    }
    groups[item.item].push(item)
  })
  
  // 為每個品項找出最便宜的商店
  Object.keys(groups).forEach(itemName => {
    const stores = groups[itemName]
    const minPrice = Math.min(...stores.map(s => s.eurAmount))
    stores.forEach(store => {
      store.isCheapest = store.eurAmount === minPrice
    })
    // 按價格排序（便宜到貴）
    groups[itemName].sort((a, b) => a.eurAmount - b.eurAmount)
  })
  
  return groups
})

// 品項列表（按字母排序）
const itemNames = computed(() => {
  return Object.keys(groupedByItem.value).sort()
})

// 所有已存在的品項名稱（用於下拉選單）
const existingItemNames = computed(() => {
  const names = new Set()
  comparisonList.value.forEach(item => {
    names.add(item.item)
  })
  return Array.from(names).sort()
})

// 新增比價項目
function addComparison() {
  const eur = parseFloat(formData.value.eurAmount)
  
  if (!formData.value.store.trim()) {
    alert('請輸入商店名稱')
    return
  }
  
  if (!formData.value.item.trim()) {
    alert('請輸入品項名稱')
    return
  }
  
  if (isNaN(eur) || eur <= 0) {
    alert('請輸入有效的歐元金額')
    return
  }
  
  const newItem = {
    id: Date.now(),
    store: formData.value.store.trim(),
    item: formData.value.item.trim(),
    eurAmount: eur,
    twdAmount: Math.round(eur * exchangeRate.value),
    exchangeRate: exchangeRate.value,
    createdAt: new Date().toISOString()
  }
  
  comparisonList.value.push(newItem)
  saveToLocalStorage()
  
  // 清空表單（保留品項名稱，方便連續輸入同品項不同商店）
  formData.value = {
    store: '',
    item: formData.value.item,
    eurAmount: ''
  }
}

// 刪除項目
function deleteItem(id) {
  if (confirm('確定要刪除這個比價項目嗎？')) {
    comparisonList.value = comparisonList.value.filter(item => item.id !== id)
    saveToLocalStorage()
  }
}

// 刪除整個品項
function deleteItemGroup(itemName) {
  if (confirm(`確定要刪除「${itemName}」的所有比價資料嗎？`)) {
    comparisonList.value = comparisonList.value.filter(item => item.item !== itemName)
    saveToLocalStorage()
  }
}

// 儲存到 localStorage
function saveToLocalStorage() {
  localStorage.setItem('paris-price-comparison', JSON.stringify(comparisonList.value))
}

// 更新匯率
function updateExchangeRate() {
  if (exchangeRate.value <= 0) {
    alert('請輸入有效的匯率')
    return
  }
  localStorage.setItem('paris-exchange-rate', exchangeRate.value.toString())
  
  // 重新計算所有項目的台幣金額
  comparisonList.value = comparisonList.value.map(item => ({
    ...item,
    twdAmount: Math.round(item.eurAmount * exchangeRate.value),
    exchangeRate: exchangeRate.value
  }))
  saveToLocalStorage()
}

// 清空所有資料
function clearAll() {
  if (confirm('確定要清空所有比價資料嗎？此操作無法復原！')) {
    comparisonList.value = []
    saveToLocalStorage()
  }
}
</script>

<template>
  <div class="price-comparison-page">
    <!-- 匯率設定區（整合標題） -->
    <div class="exchange-rate-section">
      <div class="header-row">
        <div class="title-group">
          <h2>💰 比價工具</h2>
          <p class="subtitle">記錄商品價格，輕鬆比價</p>
        </div>
        <div class="rate-control">
          <div class="rate-input-wrapper">
            <input 
              id="exchange-rate"
              v-model.number="exchangeRate" 
              type="number" 
              step="0.1"
              min="0"
              class="rate-input"
            />
            <span class="rate-label">EUR → TWD</span>
            <button @click="updateExchangeRate" class="update-rate-btn">更新</button>
          </div>
          <p class="rate-hint">1 歐元 = {{ exchangeRate }} 台幣</p>
        </div>
      </div>
    </div>

    <!-- 新增表單 -->
    <div class="add-form-section">
      <h3 class="section-title">➕ 新增比價項目</h3>
      <form @submit.prevent="addComparison" class="add-form">
        <div class="form-row">
          <div class="form-group">
            <label for="store">商店名稱</label>
            <input 
              id="store"
              v-model="formData.store" 
              type="text" 
              placeholder="例如：Galeries Lafayette"
              class="form-input"
            />
          </div>
          
          <div class="form-group">
            <label for="item">品項名稱</label>
            <input 
              id="item"
              v-model="formData.item" 
              type="text" 
              placeholder="例如：Longchamp 包包"
              class="form-input"
              list="item-suggestions"
              autocomplete="off"
            />
            <datalist id="item-suggestions">
              <option v-for="name in existingItemNames" :key="name" :value="name"></option>
            </datalist>
          </div>
        </div>

        <div class="form-row">
          <div class="form-group">
            <label for="eur-amount">歐元金額 (€)</label>
            <input 
              id="eur-amount"
              v-model="formData.eurAmount" 
              type="number" 
              step="0.01"
              min="0"
              placeholder="0.00"
              class="form-input"
            />
          </div>
          
          <div class="form-group">
            <label>台幣金額 (NT$)</label>
            <div class="twd-display">
              {{ twdAmount.toLocaleString() }}
            </div>
          </div>
        </div>

        <button type="submit" class="submit-btn">新增項目</button>
      </form>
    </div>

    <!-- 比價列表 -->
    <div class="comparison-list-section">
      <div class="list-header">
        <h3 class="section-title">📊 比價列表 ({{ itemNames.length }} 個品項)</h3>
        <div class="list-actions">
          <button v-if="comparisonList.length > 0" @click="clearAll" class="clear-all-btn">
            清空全部
          </button>
        </div>
      </div>

      <div v-if="itemNames.length === 0" class="empty-state">
        <p>📝 尚未新增任何比價項目</p>
        <p class="empty-hint">使用上方表單新增您的第一個比價項目</p>
      </div>

      <!-- 以品項分組顯示 -->
      <div v-else class="item-groups">
        <div 
          v-for="itemName in itemNames" 
          :key="itemName" 
          class="item-group"
        >
          <div class="item-group-header">
            <h4 class="item-group-title">{{ itemName }}</h4>
            <button @click="deleteItemGroup(itemName)" class="delete-group-btn" title="刪除此品項">
              🗑️ 刪除
            </button>
          </div>

          <div class="stores-comparison">
            <div 
              v-for="store in groupedByItem[itemName]" 
              :key="store.id" 
              class="store-card"
              :class="{ cheapest: store.isCheapest }"
            >
              <!-- 最便宜標籤 -->
              <div v-if="store.isCheapest" class="best-price-badge">
                ⭐ 最划算
              </div>

              <div class="store-card-content">
                <div class="store-header">
                  <div class="store-name">🏪 {{ store.store }}</div>
                  <button @click="deleteItem(store.id)" class="delete-btn-small" title="刪除">
                    ✕
                  </button>
                </div>
                
                <div class="price-display">
                  <div class="price-row-main">
                    <span class="price-value eur">€ {{ store.eurAmount.toFixed(2) }}</span>
                    <span class="price-arrow">→</span>
                    <span class="price-value twd">NT$ {{ store.twdAmount.toLocaleString() }}</span>
                  </div>
                </div>
                
                <div class="store-footer">
                  <span class="rate-info">匯率: {{ store.exchangeRate }}</span>
                  <span class="date-info">{{ new Date(store.createdAt).toLocaleDateString('zh-TW', { month: 'numeric', day: 'numeric' }) }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.price-comparison-page {
  max-width: 1000px;
  margin: 0 auto;
  padding: 12px;
}

/* 匯率設定區（整合標題） */
.exchange-rate-section {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 12px;
  padding: 14px 16px;
  margin-bottom: 12px;
  color: white;
}

.header-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
}

.title-group h2 {
  font-size: 18px;
  margin: 0 0 2px 0;
}

.title-group .subtitle {
  font-size: 12px;
  margin: 0;
  opacity: 0.85;
}

.rate-control {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 4px;
}

.rate-input-wrapper {
  display: flex;
  align-items: center;
  gap: 6px;
}

.rate-input {
  width: 70px;
  padding: 6px 8px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-radius: 6px;
  font-size: 14px;
  font-weight: 600;
  background: rgba(255, 255, 255, 0.9);
  color: #333;
}

.rate-label {
  font-weight: 600;
  font-size: 11px;
}

.update-rate-btn {
  padding: 6px 12px;
  background: white;
  color: #667eea;
  border: none;
  border-radius: 6px;
  font-weight: 600;
  font-size: 12px;
  cursor: pointer;
  transition: all 0.2s;
}

.update-rate-btn:hover {
  background: #f0f0f0;
}

.rate-hint {
  font-size: 10px;
  opacity: 0.85;
  margin: 0;
}

/* 新增表單區 */
.add-form-section {
  background: white;
  border-radius: 12px;
  padding: 14px;
  margin-bottom: 12px;
  box-shadow: 0 1px 6px rgba(0, 0, 0, 0.08);
}

.section-title {
  font-size: 16px;
  font-weight: 700;
  margin: 0 0 12px 0;
  color: var(--color-heading);
}

.add-form {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.form-group label {
  font-size: 12px;
  font-weight: 600;
  color: var(--color-text);
}

.form-input {
  padding: 8px 10px;
  border: 2px solid #e5e7eb;
  border-radius: 6px;
  font-size: 14px;
  transition: all 0.2s;
}

.form-input:focus {
  outline: none;
  border-color: #667eea;
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
}

.twd-display {
  padding: 8px 10px;
  background: #f0fdf4;
  border: 2px solid #bbf7d0;
  border-radius: 6px;
  font-size: 16px;
  font-weight: 700;
  color: #059669;
  text-align: right;
}

.submit-btn {
  padding: 10px 20px;
  background: linear-gradient(135deg, #10b981 0%, #059669 100%);
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  box-shadow: 0 2px 8px rgba(16, 185, 129, 0.3);
}

.submit-btn:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(16, 185, 129, 0.4);
}

.submit-btn:active {
  transform: translateY(0);
}

/* 比價列表區 */
.comparison-list-section {
  background: white;
  border-radius: 12px;
  padding: 14px;
  box-shadow: 0 1px 6px rgba(0, 0, 0, 0.08);
}

.list-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
  gap: 12px;
}

.list-actions {
  display: flex;
  gap: 8px;
  align-items: center;
}

.clear-all-btn {
  padding: 6px 12px;
  background: #fee;
  color: #dc2626;
  border: 1px solid #fecaca;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
}

.clear-all-btn:hover {
  background: #fecaca;
}

.empty-state {
  text-align: center;
  padding: 40px 20px;
  color: var(--color-text-secondary);
}

.empty-state p {
  margin: 0 0 6px 0;
  font-size: 16px;
}

.empty-hint {
  font-size: 13px !important;
  opacity: 0.7;
}

/* 品項分組 */
.item-groups {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.item-group {
  background: #f9fafb;
  border: 2px solid #e5e7eb;
  border-radius: 10px;
  padding: 12px;
  transition: all 0.3s;
}

.item-group:hover {
  border-color: #667eea;
  box-shadow: 0 2px 8px rgba(102, 126, 234, 0.1);
}

.item-group-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
  padding-bottom: 8px;
  border-bottom: 2px solid #e5e7eb;
}

.item-group-title {
  font-size: 16px;
  font-weight: 700;
  color: var(--color-heading);
  margin: 0;
}

.delete-group-btn {
  padding: 4px 10px;
  background: #fee;
  color: #dc2626;
  border: 1px solid #fecaca;
  border-radius: 5px;
  font-size: 11px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
}

.delete-group-btn:hover {
  background: #fecaca;
}

/* 商店比較卡片 */
.stores-comparison {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 8px;
}

.store-card {
  background: white;
  border: 2px solid #e5e7eb;
  border-radius: 8px;
  overflow: hidden;
  transition: all 0.3s;
  position: relative;
}

.store-card:hover {
  transform: translateY(-1px);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

/* 最便宜的卡片樣式 */
.store-card.cheapest {
  border-color: #10b981;
  border-width: 2px;
  background: linear-gradient(135deg, #ecfdf5 0%, #d1fae5 100%);
}

.store-card.cheapest:hover {
  box-shadow: 0 4px 12px rgba(16, 185, 129, 0.3);
}

.best-price-badge {
  position: absolute;
  top: -1px;
  right: -1px;
  background: linear-gradient(135deg, #10b981 0%, #059669 100%);
  color: white;
  padding: 4px 10px;
  border-radius: 0 6px 0 10px;
  font-size: 10px;
  font-weight: 700;
  box-shadow: 0 1px 4px rgba(16, 185, 129, 0.4);
  z-index: 1;
}

.store-card-content {
  padding: 10px;
}

.store-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
}

.store-name {
  font-weight: 700;
  color: var(--color-heading);
  font-size: 14px;
}

.delete-btn-small {
  background: none;
  border: none;
  color: #9ca3af;
  font-size: 16px;
  cursor: pointer;
  padding: 2px;
  border-radius: 3px;
  transition: all 0.2s;
  line-height: 1;
}

.delete-btn-small:hover {
  background: #fee;
  color: #dc2626;
}

.price-display {
  margin-bottom: 8px;
}

.price-row-main {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  padding: 8px;
  background: rgba(255, 255, 255, 0.5);
  border-radius: 6px;
}

.price-value {
  font-weight: 700;
}

.price-value.eur {
  color: #667eea;
  font-size: 14px;
}

.price-value.twd {
  color: #059669;
  font-size: 16px;
}

.price-arrow {
  color: #9ca3af;
  font-size: 12px;
}

.store-footer {
  display: none; /* 隱藏次要資訊以節省空間 */
}

/* 響應式設計 */
@media (max-width: 768px) {
  .price-comparison-page {
    padding: 10px;
  }

  .exchange-rate-section {
    padding: 12px;
    margin-bottom: 10px;
  }

  .header-row {
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
  }

  .title-group h2 {
    font-size: 16px;
  }

  .title-group .subtitle {
    font-size: 11px;
  }

  .rate-control {
    width: 100%;
    align-items: flex-start;
  }

  .rate-input-wrapper {
    width: 100%;
  }

  .rate-input {
    flex: 1;
    min-width: 60px;
  }

  .add-form-section {
    padding: 12px;
    margin-bottom: 10px;
  }

  .section-title {
    font-size: 14px;
    margin-bottom: 10px;
  }

  .form-row {
    grid-template-columns: 1fr;
    gap: 8px;
  }

  .form-group label {
    font-size: 11px;
  }

  .form-input {
    padding: 7px 9px;
    font-size: 13px;
  }

  .twd-display {
    padding: 7px 9px;
    font-size: 15px;
  }

  .submit-btn {
    padding: 9px 18px;
    font-size: 13px;
  }

  .comparison-list-section {
    padding: 12px;
  }

  .list-header {
    margin-bottom: 10px;
  }

  .section-title {
    font-size: 14px;
  }

  .list-actions {
    width: 100%;
    justify-content: flex-end;
  }

  .item-groups {
    gap: 10px;
  }

  .stores-comparison {
    grid-template-columns: 1fr;
    gap: 6px;
  }

  .item-group {
    padding: 10px;
  }

  .item-group-header {
    margin-bottom: 8px;
    padding-bottom: 6px;
  }

  .item-group-title {
    font-size: 14px;
  }

  .delete-group-btn {
    font-size: 10px;
    padding: 3px 8px;
  }

  .store-card-content {
    padding: 8px;
  }

  .store-name {
    font-size: 13px;
  }

  .price-row-main {
    padding: 6px;
  }

  .price-value.eur {
    font-size: 13px;
  }

  .price-value.twd {
    font-size: 15px;
  }

  .best-price-badge {
    font-size: 9px;
    padding: 3px 8px;
  }
}
</style>
