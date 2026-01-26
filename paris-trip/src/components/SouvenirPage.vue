<script setup>
import { ref, computed, onMounted } from "vue";
import { souvenirData } from "../data/souvenirs";

const userSouvenirs = ref([]);
const showAddModal = ref(false);
const newItem = ref({
  categoryName: souvenirData.categories[0].name,
  name: "",
  nameEn: "",
  description: "",
  price: "",
  where: "",
  tips: "",
  image: "",
});

const categories = computed(() => {
  // 深拷貝原始資料
  const combined = JSON.parse(JSON.stringify(souvenirData.categories));

  // 將使用者新增的項目加入對應類別
  userSouvenirs.value.forEach((item) => {
    let category = combined.find((c) => c.name === item.categoryName);
    if (!category) {
      category = {
        name: item.categoryName,
        icon: "🎁",
        items: [],
      };
      combined.push(category);
    }
    category.items.push({ ...item, isCustom: true });
  });

  return combined;
});

const expandedItems = ref(new Set());
const purchasedItems = ref(new Set());

// 從 localStorage 載入狀態
onMounted(() => {
  const savedPurchased = localStorage.getItem("purchasedSouvenirs");
  if (savedPurchased) {
    purchasedItems.value = new Set(JSON.parse(savedPurchased));
  }

  const savedUserSouvenirs = localStorage.getItem("userSouvenirs");
  if (savedUserSouvenirs) {
    userSouvenirs.value = JSON.parse(savedUserSouvenirs);
  }
});

function toggleExpand(categoryIdx, itemIdx) {
  const key = `${categoryIdx}-${itemIdx}`;
  if (expandedItems.value.has(key)) {
    expandedItems.value.delete(key);
  } else {
    expandedItems.value.add(key);
  }
}

function isExpanded(categoryIdx, itemIdx) {
  return expandedItems.value.has(`${categoryIdx}-${itemIdx}`);
}

function togglePurchased(categoryIdx, itemIdx) {
  const key = `${categoryIdx}-${itemIdx}`;
  if (purchasedItems.value.has(key)) {
    purchasedItems.value.delete(key);
  } else {
    purchasedItems.value.add(key);
  }
  // 保存到 localStorage
  localStorage.setItem(
    "purchasedSouvenirs",
    JSON.stringify([...purchasedItems.value]),
  );
}

function isPurchased(categoryIdx, itemIdx) {
  return purchasedItems.value.has(`${categoryIdx}-${itemIdx}`);
}

function addNewSouvenir() {
  if (!newItem.value.name || !newItem.value.categoryName) return;

  const itemToAdd = {
    ...newItem.value,
    id: Date.now(), // 用於刪除的唯一識別
  };

  userSouvenirs.value.push(itemToAdd);
  saveUserSouvenirs();

  // 重置表單
  newItem.value = {
    categoryName: souvenirData.categories[0].name,
    name: "",
    nameEn: "",
    description: "",
    price: "",
    where: "",
    tips: "",
    image: "",
  };
  showAddModal.value = false;
}

function deleteSouvenir(item) {
  if (!confirm("確定要刪除這個伴手禮嗎？")) return;
  userSouvenirs.value = userSouvenirs.value.filter((s) => s.id !== item.id);
  saveUserSouvenirs();
}

function saveUserSouvenirs() {
  localStorage.setItem("userSouvenirs", JSON.stringify(userSouvenirs.value));
}
</script>

<template>
  <div class="souvenir-page">
    <div class="souvenir-header-section">
      <div class="header-info">
        <h2 class="page-main-title">🎁 必買伴手禮清單</h2>
        <p class="page-subtitle">收藏您的購物清單，不再錯過精彩好物</p>
      </div>
      <button class="add-new-btn" @click="showAddModal = true">
        <span class="btn-icon">+</span> 新增伴手禮
      </button>
    </div>

    <!-- 新增對話框 (使用 Teleport 到 body 確保不被 header 擋住) -->
    <Teleport to="body">
      <div
        v-if="showAddModal"
        class="modal-overlay"
        @click.self="showAddModal = false"
      >
        <div class="modal-content">
          <div class="modal-header">
            <h3>新增伴手禮</h3>
            <button class="close-x" @click="showAddModal = false">×</button>
          </div>

          <div class="modal-body">
            <div class="form-row">
              <div class="form-group flex-2">
                <label>名稱*</label>
                <input
                  v-model="newItem.name"
                  placeholder="例如: 聖米歇爾山餅乾"
                />
              </div>
              <div class="form-group flex-1">
                <label>類別*</label>
                <select v-model="newItem.categoryName">
                  <option
                    v-for="cat in souvenirData.categories"
                    :key="cat.name"
                    :value="cat.name"
                  >
                    {{ cat.name }}
                  </option>
                  <option value="其他">其他</option>
                </select>
              </div>
            </div>

            <div class="form-group">
              <label>英文名稱</label>
              <input
                v-model="newItem.nameEn"
                placeholder="例如: St. Michel Biscuits"
              />
            </div>

            <div class="form-row">
              <div class="form-group">
                <label>價格</label>
                <input v-model="newItem.price" placeholder="例如: 約 €4-6" />
              </div>
              <div class="form-group">
                <label>購買地點</label>
                <input v-model="newItem.where" placeholder="例如: 各大超市" />
              </div>
            </div>

            <div class="form-group">
              <label>描述</label>
              <textarea
                v-model="newItem.description"
                placeholder="簡單介紹一下這個伴手禮..."
              ></textarea>
            </div>

            <div class="form-group">
              <label>提示 (Tips)</label>
              <input v-model="newItem.tips" placeholder="小撇步或注意事項" />
            </div>

            <div class="form-group">
              <label>圖片網址</label>
              <input v-model="newItem.image" placeholder="https://..." />
            </div>
          </div>

          <div class="modal-actions">
            <button class="cancel-btn" @click="showAddModal = false">
              取消
            </button>
            <button
              class="submit-btn"
              :disabled="!newItem.name"
              @click="addNewSouvenir()"
            >
              確認新增
            </button>
          </div>
        </div>
      </div>
    </Teleport>

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
            <div
              class="card-image"
              :style="{
                backgroundImage: `url(${item.image || 'https://via.placeholder.com/300x200?text=No+Image'})`,
              }"
            >
              <div v-if="isPurchased(idx, itemIdx)" class="purchased-badge">
                ✓ 已購買
              </div>
              <button
                v-if="item.isCustom"
                class="delete-btn"
                @click.stop="deleteSouvenir(item)"
              >
                🗑️
              </button>
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

              <button class="expand-btn" @click="toggleExpand(idx, itemIdx)">
                {{ isExpanded(idx, itemIdx) ? "收起詳情 ▲" : "查看詳情 ▼" }}
              </button>

              <div v-show="isExpanded(idx, itemIdx)" class="item-details">
                <p class="item-description">{{ item.description }}</p>

                <div v-if="item.price" class="detail-row">
                  <span class="detail-icon">💰</span>
                  <span class="detail-text">{{ item.price }}</span>
                </div>
                <div v-if="item.where" class="detail-row">
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

/* 新增功能樣式 - Header Section */
.souvenir-header-section {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 24px;
  background: white;
  border-radius: 20px;
  margin-bottom: 30px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
  border: 1px solid #f1f5f9;
}

.page-main-title {
  font-size: 1.5rem;
  font-weight: 800;
  color: #1e293b;
  margin: 0 0 4px 0;
}

.page-subtitle {
  font-size: 0.9rem;
  color: #64748b;
  margin: 0;
}

.add-new-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 20px;
  background: linear-gradient(135deg, #6366f1 0%, #4f46e5 100%);
  color: white;
  border: none;
  border-radius: 12px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px rgba(79, 70, 229, 0.3);
}

.add-new-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(79, 70, 229, 0.4);
}

.btn-icon {
  font-size: 1.2rem;
  line-height: 1;
}

.delete-btn {
  position: absolute;
  top: 10px;
  left: 10px;
  background: rgba(255, 255, 255, 0.95);
  border: none;
  border-radius: 50%;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 1rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  transition: all 0.2s;
  z-index: 2;
}

.delete-btn:hover {
  background: #fee2e2;
  color: #ef4444;
  transform: scale(1.1);
}

/* Modal 樣式 - 全螢幕設計修復 */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(15, 23, 42, 0.75);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999; /* 絕對最高 */
  padding: 20px;
  backdrop-filter: blur(10px);
  animation: modalFadeIn 0.3s ease;
}

@keyframes modalFadeIn {
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

.modal-content {
  background: white;
  border-radius: 24px;
  width: 100%;
  max-width: 550px;
  max-height: 90vh;
  display: flex;
  flex-direction: column;
  box-shadow: 0 30px 60px -12px rgba(0, 0, 0, 0.5);
  overflow: hidden;
}

.modal-header {
  padding: 24px 30px;
  border-bottom: 1px solid #f1f5f9;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.modal-header h3 {
  margin: 0;
  font-size: 1.4rem;
  font-weight: 800;
  color: #1e293b;
}

.close-x {
  background: none;
  border: none;
  font-size: 2rem;
  color: #94a3b8;
  cursor: pointer;
  line-height: 1;
}

.modal-body {
  padding: 30px;
  overflow-y: auto;
  flex: 1;
}

.form-row {
  display: flex;
  gap: 15px;
  margin-bottom: 20px;
}

.flex-2 {
  flex: 2;
}
.flex-1 {
  flex: 1;
}

.form-group {
  margin-bottom: 20px;
}

.form-group label {
  display: block;
  margin-bottom: 8px;
  font-size: 0.8rem;
  font-weight: 800;
  color: #64748b;
  text-transform: uppercase;
}

.form-group input,
.form-group select,
.form-group textarea {
  width: 100%;
  padding: 12px 16px;
  border: 2px solid #f1f5f9;
  border-radius: 12px;
  font-size: 1rem;
  background: #f8fafc;
  transition: all 0.2s ease;
}

.form-group input:focus,
.form-group select:focus,
.form-group textarea:focus {
  outline: none;
  border-color: #6366f1;
  background: white;
  box-shadow: 0 0 0 4px rgba(99, 102, 241, 0.1);
}

.modal-actions {
  padding: 20px 30px;
  background: #f8fafc;
  display: flex;
  gap: 12px;
}

.modal-actions button {
  flex: 1;
  padding: 14px;
  border-radius: 12px;
  font-weight: 700;
  cursor: pointer;
}

.cancel-btn {
  background: white;
  border: 1px solid #e2e8f0;
  color: #64748b;
}

.submit-btn {
  background: #4f46e5;
  color: white;
  border: none;
}

.submit-btn:disabled {
  opacity: 0.5;
  filter: grayscale(1);
}

/* 響應式小螢幕調整 */
@media (max-width: 600px) {
  .souvenir-header-section {
    flex-direction: column;
    text-align: center;
    gap: 20px;
  }

  .add-new-btn {
    width: 100%;
    justify-content: center;
  }
}

@media (max-width: 768px) {
  .souvenir-page {
    padding: 15px;
  }

  .items-grid {
    gap: 15px;
  }
}
</style>
