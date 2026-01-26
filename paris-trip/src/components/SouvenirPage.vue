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

const EXCHANGE_RATE = 37; // 1 EUR = 35 TWD

function formatPrice(priceStr) {
  if (!priceStr) return "";

  // 嘗試提取數字
  const matches = priceStr.match(/(\d+(\.\d+)?)/);
  if (matches) {
    const value = parseFloat(matches[1]);
    const twd = Math.round(value * EXCHANGE_RATE);

    // 如果原本字串不包含 NT$ 或 TWD，則幫忙加上
    if (!priceStr.includes("NT") && !priceStr.includes("台幣")) {
      return `${priceStr} (約 NT$${twd})`;
    }
  }
  return priceStr;
}

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

const editingId = ref(null);
const editForm = ref({ name: "", price: "" });

function startEdit(item) {
  editingId.value = item.id;
  editForm.value = { name: item.name, price: item.price };
}

function cancelEdit() {
  editingId.value = null;
}

function saveEdit(itemIdx) {
  const item = userSouvenirs.value.find((s) => s.id === editingId.value);
  if (item) {
    item.name = editForm.value.name;
    item.price = editForm.value.price;
    saveUserSouvenirs();
  }
  editingId.value = null;
}

function saveUserSouvenirs() {
  localStorage.setItem("userSouvenirs", JSON.stringify(userSouvenirs.value));
}

function handleImageUpload(event, isEdit = false) {
  const file = event.target.files[0];
  if (!file) return;

  // 壓縮圖片
  const reader = new FileReader();
  reader.onload = (e) => {
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement("canvas");
      const MAX_WIDTH = 600;
      let width = img.width;
      let height = img.height;

      if (width > MAX_WIDTH) {
        height *= MAX_WIDTH / width;
        width = MAX_WIDTH;
      }

      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0, width, height);

      const compressedBase64 = canvas.toDataURL("image/jpeg", 0.7);
      if (isEdit) {
        editForm.value.image = compressedBase64;
      } else {
        newItem.value.image = compressedBase64;
      }
    };
    img.src = e.target.result;
  };
  reader.readAsDataURL(file);
}

function triggerFileInput(inputId) {
  document.getElementById(inputId).click();
}
</script>

<template>
  <div class="souvenir-page">
    <!-- Hero Section -->
    <header class="souvenir-hero">
      <div class="hero-content">
        <h1 class="hero-title">🎁 伴手禮指南</h1>
        <p class="hero-subtitle">收藏您的購物清單，從這裡開始紀錄巴黎足跡</p>
      </div>

      <!-- Smart Add Bar -->
      <div class="smart-add-wrapper">
        <div class="smart-add-bar">
          <div
            class="image-uploader"
            @click="triggerFileInput('qa-file-input')"
          >
            <div
              v-if="newItem.image"
              class="preview-mini"
              :style="{ backgroundImage: `url(${newItem.image})` }"
            ></div>
            <span v-else class="cam-icon">📷</span>
            <input
              id="qa-file-input"
              type="file"
              accept="image/*"
              class="hidden-input"
              @change="handleImageUpload($event, false)"
            />
          </div>

          <div class="input-group name-group">
            <input
              v-model="newItem.name"
              type="text"
              placeholder="想要買什麼？"
              class="smart-input"
            />
          </div>

          <div class="input-group price-group">
            <span class="currency-tag">€</span>
            <input
              v-model="newItem.price"
              type="text"
              placeholder="價錢"
              class="smart-input price-input"
            />
          </div>

          <select v-model="newItem.categoryName" class="smart-select">
            <option
              v-for="cat in souvenirData.categories"
              :key="cat.name"
              :value="cat.name"
            >
              {{ cat.name }}
            </option>
            <option value="其他">其他</option>
          </select>

          <button
            class="add-confirm-btn"
            @click="addNewSouvenir"
            :disabled="!newItem.name"
          >
            新增
          </button>
        </div>
      </div>
    </header>

    <div class="categories-container">
      <section
        v-for="(category, idx) in categories"
        :key="idx"
        class="category-block"
      >
        <div class="category-header">
          <span class="cat-icon-box">{{ category.icon }}</span>
          <h2 class="cat-name">{{ category.name }}</h2>
          <div class="cat-line"></div>
        </div>

        <div class="souvenir-grid">
          <div
            v-for="(item, itemIdx) in category.items"
            :key="itemIdx"
            class="premium-card"
            :class="{
              'is-purchased': isPurchased(idx, itemIdx),
              'is-editing': editingId === item.id,
            }"
          >
            <!-- Card Image Area -->
            <div class="card-visual">
              <div
                class="main-image"
                :style="{
                  backgroundImage: `url(${item.image || 'https://via.placeholder.com/400x300?text=No+Photo'})`,
                }"
              ></div>
              <div v-if="item.price" class="price-medal">
                <span class="medal-label">€</span>
                <span class="medal-value">{{ item.price }}</span>
              </div>
              <button
                v-if="item.isCustom && editingId !== item.id"
                class="trash-btn"
                @click.stop="deleteSouvenir(item)"
              >
                🗑️
              </button>
              <div v-if="isPurchased(idx, itemIdx)" class="bought-overlay">
                <span class="check-mark">✓ 已收入口袋</span>
              </div>
            </div>

            <!-- Card Info Area -->
            <div class="card-info">
              <!-- Edit Mode -->
              <div v-if="editingId === item.id" class="edit-zone">
                <input
                  v-model="editForm.name"
                  class="edit-field name-field"
                  placeholder="名稱"
                />
                <div class="edit-row">
                  <input
                    v-model="editForm.price"
                    class="edit-field price-field"
                    placeholder="價格"
                  />
                  <button
                    class="edit-cam-btn"
                    @click="triggerFileInput('edit-file-' + item.id)"
                  >
                    📷
                  </button>
                  <input
                    :id="'edit-file-' + item.id"
                    type="file"
                    accept="image/*"
                    class="hidden-input"
                    @change="handleImageUpload($event, true)"
                  />
                </div>
                <div class="edit-btns">
                  <button class="save-btn" @click="saveEdit()">儲存</button>
                  <button class="cancel-btn" @click="cancelEdit">取消</button>
                </div>
              </div>

              <!-- View Mode -->
              <template v-else>
                <div class="card-top">
                  <div class="text-wrap">
                    <h3 class="name-zh">
                      {{ item.name }}
                      <span
                        v-if="item.isCustom"
                        class="pen-btn"
                        @click.stop="startEdit(item)"
                        >✏️</span
                      >
                    </h3>
                    <p class="name-en">
                      {{ item.nameEn || "Collection Item" }}
                    </p>
                  </div>
                  <label class="premium-check">
                    <input
                      type="checkbox"
                      :checked="isPurchased(idx, itemIdx)"
                      @change="togglePurchased(idx, itemIdx)"
                    />
                    <span class="check-box-ui"></span>
                  </label>
                </div>

                <div class="conversion-box" v-if="item.price">
                  <span class="conv-label">預估金額</span>
                  <span class="conv-value">{{ formatPrice(item.price) }}</span>
                </div>

                <button
                  class="details-toggle"
                  @click="toggleExpand(idx, itemIdx)"
                >
                  {{ isExpanded(idx, itemIdx) ? "簡單顯示" : "詳細資訊" }}
                </button>

                <transition name="slice">
                  <div v-show="isExpanded(idx, itemIdx)" class="extra-info">
                    <div class="info-piece">
                      <span class="p-icon">�</span>
                      <p>{{ item.where || "--" }}</p>
                    </div>
                    <div v-if="item.tips" class="info-piece tip-piece">
                      <span class="p-icon">�</span>
                      <p>{{ item.tips }}</p>
                    </div>
                    <p class="desc-text">{{ item.description }}</p>
                  </div>
                </transition>
              </template>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<style scoped>
/* 全域變數 */
:host {
  --paris-blue: #1e293b;
  --paris-accent: #6366f1;
  --paris-gold: #f59e0b;
  --paris-bg: #f8fafc;
  --card-shadow:
    0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1);
  --card-radius: 24px;
}

.souvenir-page {
  background-color: #f8fafc;
  min-height: 100vh;
  padding-bottom: 100px;
}

/* Hero Section */
.souvenir-hero {
  background: linear-gradient(135deg, #1e293b 0%, #334155 100%);
  padding: 60px 24px 80px;
  text-align: center;
  color: white;
  position: relative;
  overflow: hidden;
}

.hero-title {
  font-size: 2.5rem;
  font-weight: 800;
  margin-bottom: 12px;
  letter-spacing: -1px;
}

.hero-subtitle {
  font-size: 1.1rem;
  opacity: 0.8;
  max-width: 500px;
  margin: 0 auto;
}

/* Smart Add Bar */
.smart-add-wrapper {
  position: absolute;
  bottom: -32px;
  left: 20px;
  right: 20px;
  max-width: 900px;
  margin: 0 auto;
  z-index: 10;
}

.smart-add-bar {
  background: white;
  padding: 10px;
  border-radius: 20px;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.15);
  display: flex;
  align-items: center;
  gap: 12px;
  border: 1px solid #e2e8f0;
}

.image-uploader {
  width: 44px;
  height: 44px;
  background: #f1f5f9;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  flex-shrink: 0;
  overflow: hidden;
  border: 2px solid transparent;
  transition: all 0.2s;
}

.image-uploader:hover {
  border-color: #6366f1;
}

.preview-mini {
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center;
}

.hidden-input {
  display: none;
}

.input-group {
  flex: 1;
  position: relative;
}

.smart-input {
  width: 100%;
  border: none;
  background: transparent;
  padding: 10px 4px;
  font-size: 16px; /* 防止 iOS 縮放 */
  outline: none;
  color: #1e293b;
  font-weight: 600;
}

.price-group {
  display: flex;
  align-items: center;
  max-width: 100px;
  border-right: 1px solid #f1f5f9;
  border-left: 1px solid #f1f5f9;
  padding: 0 10px;
}

.currency-tag {
  color: #94a3b8;
  font-weight: 700;
  margin-right: 4px;
}

.smart-select {
  border: none;
  background: transparent;
  font-size: 14px;
  color: #64748b;
  padding: 0 8px;
  outline: none;
  cursor: pointer;
}

.add-confirm-btn {
  padding: 10px 20px;
  background: #6366f1;
  color: white;
  border: none;
  border-radius: 14px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.2s;
}

.add-confirm-btn:hover {
  background: #4f46e5;
  transform: translateY(-1px);
}

.add-confirm-btn:disabled {
  background: #cbd5e1;
  cursor: not-allowed;
}

/* Categories Area */
.categories-container {
  max-width: 1100px;
  margin: 60px auto 0;
  padding: 0 20px;
}

.category-block {
  margin-bottom: 60px;
}

.category-header {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 30px;
}

.cat-icon-box {
  width: 48px;
  height: 48px;
  background: white;
  border-radius: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
}

.cat-name {
  font-size: 1.5rem;
  font-weight: 800;
  color: #1e293b;
  white-space: nowrap;
}

.cat-line {
  height: 2px;
  background: #e2e8f0;
  flex: 1;
}

/* Premium Cards */
.souvenir-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 24px;
}

.premium-card {
  background: white;
  border-radius: var(--card-radius);
  overflow: hidden;
  box-shadow: var(--card-shadow);
  transition: all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1);
  display: flex;
  flex-direction: column;
}

.premium-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 20px 40px -10px rgba(0, 0, 0, 0.15);
}

.card-visual {
  height: 220px;
  position: relative;
  overflow: hidden;
}

.main-image {
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center;
  transition: transform 0.6s ease;
}

.premium-card:hover .main-image {
  transform: scale(1.05);
}

.price-medal {
  position: absolute;
  top: 16px;
  right: 16px;
  background: rgba(255, 255, 255, 0.95);
  padding: 6px 14px;
  border-radius: 30px;
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  gap: 4px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  z-index: 2;
}

.medal-label {
  color: #6366f1;
  font-weight: 800;
  font-size: 0.9rem;
}

.medal-value {
  color: #1e293b;
  font-weight: 800;
  font-size: 1rem;
}

.trash-btn {
  position: absolute;
  top: 16px;
  left: 16px;
  width: 36px;
  height: 36px;
  background: rgba(255, 255, 255, 0.8);
  border: none;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 2;
  opacity: 0;
  transform: translateX(-10px);
  transition: all 0.3s ease;
}

.premium-card:hover .trash-btn {
  opacity: 1;
  transform: translateX(0);
}

.bought-overlay {
  position: absolute;
  inset: 0;
  background: rgba(99, 102, 241, 0.4);
  backdrop-filter: blur(2px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 3;
}

.check-mark {
  background: white;
  color: #6366f1;
  padding: 8px 20px;
  border-radius: 40px;
  font-weight: 800;
  font-size: 0.9rem;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
}

.card-info {
  padding: 24px;
  flex: 1;
  display: flex;
  flex-direction: column;
}

.card-top {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 20px;
}

.name-zh {
  font-size: 1.25rem;
  font-weight: 800;
  color: #1e293b;
  margin: 0;
  display: flex;
  align-items: center;
}

.pen-btn {
  font-size: 14px;
  margin-left: 8px;
  cursor: pointer;
  opacity: 0.3;
  transition: opacity 0.2s;
}

.premium-card:hover .pen-btn {
  opacity: 0.7;
}
.pen-btn:hover {
  opacity: 1 !important;
  color: #6366f1;
}

.name-en {
  font-size: 0.85rem;
  color: #94a3b8;
  margin: 4px 0 0;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  font-weight: 600;
}

/* Premium Checkbox */
.premium-check {
  cursor: pointer;
}

.premium-check input {
  display: none;
}

.check-box-ui {
  width: 28px;
  height: 28px;
  border: 2px solid #e2e8f0;
  border-radius: 10px;
  display: block;
  transition: all 0.2s;
  position: relative;
}

.premium-check input:checked + .check-box-ui {
  background: #6366f1;
  border-color: #6366f1;
}

.check-box-ui::after {
  content: "✓";
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) scale(0);
  color: white;
  font-weight: 800;
  transition: transform 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.premium-check input:checked + .check-box-ui::after {
  transform: translate(-50%, -50%) scale(1);
}

.conversion-box {
  background: #f1f5f9;
  padding: 12px 16px;
  border-radius: 16px;
  margin-bottom: 16px;
}

.conv-label {
  display: block;
  font-size: 0.75rem;
  color: #94a3b8;
  font-weight: 700;
  margin-bottom: 2px;
}

.conv-value {
  font-size: 0.95rem;
  color: #1e293b;
  font-weight: 700;
}

.details-toggle {
  width: 100%;
  background: none;
  border: 1px solid #f1f5f9;
  padding: 8px;
  border-radius: 12px;
  color: #64748b;
  font-size: 0.85rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  margin-top: auto;
}

.details-toggle:hover {
  background: #f8fafc;
  color: #1e293b;
}

.extra-info {
  margin-top: 16px;
  padding-top: 16px;
  border-top: 1px dashed #f1f5f9;
}

.info-piece {
  display: flex;
  align-items: baseline;
  gap: 8px;
  margin-bottom: 8px;
  font-size: 0.9rem;
  color: #475569;
}

.tip-piece {
  background: #fefce8;
  padding: 8px 12px;
  border-radius: 12px;
  border-left: 4px solid #f59e0b;
}

.desc-text {
  font-size: 0.85rem;
  line-height: 1.6;
  color: #64748b;
  margin-top: 12px;
}

/* Edit Mode Styles */
.edit-zone {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.edit-field {
  width: 100%;
  padding: 10px 14px;
  border: 2px solid #e2e8f0;
  border-radius: 12px;
  font-size: 16px;
  background: #f8fafc;
}

.edit-field:focus {
  border-color: #6366f1;
  outline: none;
  background: white;
}

.edit-row {
  display: flex;
  gap: 8px;
}

.edit-cam-btn {
  width: 44px;
  background: #f1f5f9;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  cursor: pointer;
}

.edit-btns {
  display: flex;
  gap: 8px;
  margin-top: 8px;
}

.edit-btns button {
  flex: 1;
  padding: 10px;
  border-radius: 12px;
  font-weight: 700;
  cursor: pointer;
}

.save-btn {
  background: #6366f1;
  color: white;
  border: none;
}
.cancel-btn {
  background: #f1f5f9;
  color: #64748b;
  border: none;
}

/* Mobile Adjustments */
@media (max-width: 640px) {
  .souvenir-hero {
    padding: 40px 20px 60px;
  }

  .hero-title {
    font-size: 1.8rem;
  }

  .smart-add-wrapper {
    position: relative; /* 改為相對定位，避免遮擋內容 */
    bottom: auto;
    left: 0;
    right: 0;
    margin-top: -30px;
    padding: 0 15px;
  }

  .smart-add-bar {
    flex-direction: column;
    align-items: stretch;
    padding: 16px;
    gap: 12px;
  }

  .image-uploader {
    width: 100%;
    height: 120px;
    border-radius: 16px;
  }

  .price-group {
    max-width: none;
    border: 1px solid #f1f5f9;
    border-radius: 12px;
    padding: 2px 12px;
  }

  .smart-select {
    width: 100%;
    border: 1px solid #f1f5f9;
    border-radius: 12px;
    padding: 12px;
    text-align: center;
  }

  .add-confirm-btn {
    width: 100%;
    padding: 14px;
    font-size: 1rem;
  }

  .categories-container {
    margin-top: 30px; /* 因為 smart-add-wrapper 改為 relative，這裡間距要調小 */
  }

  .souvenir-grid {
    grid-template-columns: 1fr;
    gap: 20px;
  }

  .premium-card {
    border-radius: 20px;
  }

  .card-visual {
    height: 180px;
  }

  .cat-name {
    font-size: 1.25rem;
  }
}

/* Animations */
.slice-enter-active,
.slice-leave-active {
  transition: all 0.3s ease;
  max-height: 200px;
}
.slice-enter-from,
.slice-leave-to {
  max-height: 0;
  opacity: 0;
  transform: translateY(-10px);
}
</style>
```
