<script setup>
import { ref, computed, onMounted } from "vue";
import { souvenirData } from "../data/souvenirs";
import { globalExchangeRate } from "../utils/exchangeRate";

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
  url: "",
});

function formatPrice(priceStr) {
  if (!priceStr) return "";
  const matches = priceStr.match(/(\d+(\.\d+)?)/);
  if (matches) {
    const value = parseFloat(matches[1]);
    const twd = Math.round(value * globalExchangeRate.value);
    if (!priceStr.includes("NT") && !priceStr.includes("台幣")) {
      return `${priceStr} (約 NT$${twd})`;
    }
  }
  return priceStr;
}

const categories = computed(() => {
  const combined = JSON.parse(JSON.stringify(souvenirData.categories));
  userSouvenirs.value.forEach((item) => {
    let category = combined.find((c) => c.name === item.categoryName);
    if (!category) {
      category = { name: item.categoryName, icon: "🎁", items: [] };
      combined.push(category);
    }
    category.items.push({ ...item, isCustom: true });
  });
  return combined;
});

const expandedItems = ref(new Set());
const purchasedItems = ref(new Set());

onMounted(() => {
  const savedPurchased = localStorage.getItem("purchasedSouvenirs");
  if (savedPurchased)
    purchasedItems.value = new Set(JSON.parse(savedPurchased));
  const savedUserSouvenirs = localStorage.getItem("userSouvenirs");
  if (savedUserSouvenirs) userSouvenirs.value = JSON.parse(savedUserSouvenirs);
});

function toggleExpand(categoryIdx, itemIdx) {
  const key = `${categoryIdx}-${itemIdx}`;
  if (expandedItems.value.has(key)) expandedItems.value.delete(key);
  else expandedItems.value.add(key);
}

function isExpanded(categoryIdx, itemIdx) {
  return expandedItems.value.has(`${categoryIdx}-${itemIdx}`);
}

function togglePurchased(categoryIdx, itemIdx) {
  const key = `${categoryIdx}-${itemIdx}`;
  if (purchasedItems.value.has(key)) purchasedItems.value.delete(key);
  else purchasedItems.value.add(key);
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
  const itemToAdd = { ...newItem.value, id: Date.now() };
  userSouvenirs.value.push(itemToAdd);
  saveUserSouvenirs();
  newItem.value = {
    categoryName: souvenirData.categories[0].name,
    name: "",
    nameEn: "",
    description: "",
    price: "",
    where: "",
    tips: "",
    image: "",
    url: "",
  };
  showAddModal.value = false;
}

function deleteSouvenir(item) {
  if (!confirm("確定要刪除這個伴手禮嗎？")) return;
  userSouvenirs.value = userSouvenirs.value.filter((s) => s.id !== item.id);
  saveUserSouvenirs();
}

const editingId = ref(null);
const editForm = ref({ name: "", price: "", image: "", url: "" });

function startEdit(item) {
  editingId.value = item.id;
  editForm.value = {
    name: item.name,
    price: item.price,
    image: item.image,
    url: item.url || "",
  };
}

function cancelEdit() {
  editingId.value = null;
}

function saveEdit() {
  const item = userSouvenirs.value.find((s) => s.id === editingId.value);
  if (item) {
    item.name = editForm.value.name;
    item.price = editForm.value.price;
    item.image = editForm.value.image;
    item.url = editForm.value.url;
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
  const reader = new FileReader();
  reader.onload = (e) => {
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement("canvas");
      const MAX_WIDTH = 600;
      let width = img.width,
        height = img.height;
      if (width > MAX_WIDTH) {
        height *= MAX_WIDTH / width;
        width = MAX_WIDTH;
      }
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0, width, height);
      const compressedBase64 = canvas.toDataURL("image/jpeg", 0.6);
      if (isEdit) editForm.value.image = compressedBase64;
      else newItem.value.image = compressedBase64;
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
  <div class="souvenir-v2">
    <div class="v2-header">
      <div class="v2-header-top">
        <h1 class="v2-title">Paris Souvenirs</h1>
        <button class="v2-add-toggle" @click="showAddModal = !showAddModal">
          {{ showAddModal ? "✕ 關閉" : "+ 新增" }}
        </button>
      </div>
      <transition name="fade">
        <div v-if="showAddModal" class="v2-add-bar">
          <div class="v2-add-inputs">
            <div class="v2-img-pick" @click="triggerFileInput('qa-file-input')">
              <div
                v-if="newItem.image"
                class="v2-preview"
                :style="{ backgroundImage: `url(${newItem.image})` }"
              ></div>
              <span v-else>📷</span>
              <input
                id="qa-file-input"
                type="file"
                accept="image/*"
                class="hidden-input"
                @change="handleImageUpload($event, false)"
              />
            </div>
            <input
              v-model="newItem.name"
              type="text"
              placeholder="品名..."
              class="v2-input name-in"
            />
            <input
              v-model="newItem.price"
              type="text"
              placeholder="€ 價錢"
              class="v2-input price-in"
            />
            <input
              v-model="newItem.url"
              type="text"
              placeholder="🔗 官網/連結"
              class="v2-input url-in"
            />
            <select v-model="newItem.categoryName" class="v2-input cat-in">
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
          <button
            class="v2-submit-btn"
            @click="addNewSouvenir"
            :disabled="!newItem.name"
          >
            確認新增
          </button>
        </div>
      </transition>
    </div>

    <div class="v2-feed">
      <div
        v-for="(category, idx) in categories"
        :key="idx"
        class="v2-cat-section"
      >
        <div class="v2-cat-title">
          <span class="v2-cat-icon">{{ category.icon }}</span>
          <h2>{{ category.name }}</h2>
        </div>
        <div class="v2-item-list">
          <div
            v-for="(item, itemIdx) in category.items"
            :key="itemIdx"
            class="v2-post"
            :class="{ 'is-purchased': isPurchased(idx, itemIdx) }"
          >
            <div class="v2-post-visual">
              <div
                class="v2-post-img"
                :style="{
                  backgroundImage: `url(${item.image || 'https://via.placeholder.com/600x400?text=No+Photo'})`,
                }"
              ></div>
              <div v-if="item.price" class="v2-price-tag">
                € {{ item.price }}
              </div>
              <button
                v-if="item.isCustom"
                class="v2-delete-btn"
                @click.stop="deleteSouvenir(item)"
              >
                ✕
              </button>
            </div>
            <div class="v2-post-body">
              <div class="v2-post-header">
                <div v-if="editingId === item.id" class="v2-edit-mode">
                  <input
                    v-model="editForm.name"
                    class="v2-edit-input"
                    placeholder="名稱"
                  />
                  <input
                    v-model="editForm.url"
                    class="v2-edit-input"
                    placeholder="🔗 連結 (URL)"
                  />
                  <div class="v2-edit-row">
                    <input
                      v-model="editForm.price"
                      class="v2-edit-input"
                      placeholder="價格"
                    />
                    <button
                      class="v2-edit-cam"
                      @click="triggerFileInput('edit-f-' + item.id)"
                    >
                      📷
                    </button>
                    <input
                      :id="'edit-f-' + item.id"
                      type="file"
                      accept="image/*"
                      class="hidden-input"
                      @change="handleImageUpload($event, true)"
                    />
                  </div>
                  <div class="v2-edit-actions">
                    <button @click="saveEdit()">儲存</button>
                    <button @click="cancelEdit" class="can-btn">取消</button>
                  </div>
                </div>
                <template v-else>
                  <div class="v2-post-info">
                    <h3 class="v2-post-name">
                      {{ item.name }}
                      <span
                        v-if="item.isCustom"
                        class="v2-pen"
                        @click.stop="startEdit(item)"
                        >✏️</span
                      >
                    </h3>
                    <p class="v2-post-en">{{ item.nameEn || "SOUVENIR" }}</p>
                  </div>
                  <label class="v2-checkbox">
                    <input
                      type="checkbox"
                      :checked="isPurchased(idx, itemIdx)"
                      @change="togglePurchased(idx, itemIdx)"
                    />
                    <span class="v2-check-ui"></span>
                  </label>
                </template>
              </div>
              <div
                class="v2-post-meta"
                v-if="item.price && editingId !== item.id"
              >
                <span class="v2-twd"
                  >估計金額：{{ formatPrice(item.price) }}</span
                >
              </div>
              <div class="v2-post-details">
                <p v-if="item.description" class="v2-desc">
                  {{ item.description }}
                </p>
                <div class="v2-tags">
                  <span v-if="item.where" class="v2-tag"
                    >📍 {{ item.where }}</span
                  >
                  <a
                    v-if="item.url"
                    :href="item.url"
                    target="_blank"
                    class="v2-tag link-tag"
                    >🔗 查看連結</a
                  >
                  <span v-if="item.tips" class="v2-tag tip"
                    >💡 {{ item.tips }}</span
                  >
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
.souvenir-v2 {
  background-color: #ffffff;
  min-height: 100vh;
  padding-bottom: 50px;
}
.v2-header {
  position: sticky;
  top: 0;
  z-index: 1000;
  background: rgba(255, 255, 255, 0.98);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid #efefef;
  padding: 12px 16px;
}
.v2-header-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.v2-title {
  font-size: 20px;
  font-weight: 800;
  color: #262626;
  margin: 0;
}
.v2-add-toggle {
  background: #0095f6;
  color: white;
  border: none;
  padding: 6px 12px;
  border-radius: 8px;
  font-weight: 600;
  font-size: 14px;
}
.v2-add-bar {
  margin-top: 12px;
  padding: 12px;
  background: #fafafa;
  border-radius: 12px;
  border: 1px solid #dbdbdb;
}
.v2-add-inputs {
  display: grid;
  grid-template-columns: 50px 1fr;
  grid-template-areas:
    "img name"
    "img price"
    "img url"
    "img cat";
  gap: 8px;
}

.url-in {
  grid-area: url;
}
.v2-img-pick {
  grid-area: img;
  width: 50px;
  height: 50px;
  background: #efefef;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  overflow: hidden;
}
.v2-preview {
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center;
}
.v2-input {
  border: 1px solid #dbdbdb;
  border-radius: 4px;
  padding: 6px 8px;
  font-size: 16px;
  background: white;
  width: 100%;
  box-sizing: border-box;
}
.name-in {
  grid-area: name;
}
.price-in {
  grid-area: price;
}
.cat-in {
  grid-area: cat;
}
.v2-submit-btn {
  width: 100%;
  margin-top: 10px;
  background: #262626;
  color: white;
  border: none;
  padding: 10px;
  border-radius: 6px;
  font-weight: 700;
}
.v2-submit-btn:disabled {
  opacity: 0.3;
}
.v2-feed {
  max-width: 600px;
  margin: 0 auto;
  padding: 16px 0;
}
.v2-cat-section {
  margin-bottom: 32px;
}
.v2-cat-title {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 0 16px 12px;
}
.v2-cat-icon {
  font-size: 20px;
}
.v2-cat-title h2 {
  font-size: 14px;
  font-weight: 700;
  color: #8e8e8e;
  text-transform: uppercase;
  margin: 0;
}
.v2-item-list {
  display: flex;
  flex-direction: column;
}
.v2-post {
  background: white;
  border-bottom: 1px solid #efefef;
  padding-bottom: 16px;
  margin-bottom: 16px;
}
.v2-post:last-child {
  border-bottom: none;
}
.v2-post-visual {
  width: 100%;
  aspect-ratio: 4 / 3;
  position: relative;
  background: #fafafa;
  overflow: hidden;
}
.v2-post-img {
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center;
  transition: transform 0.5s ease;
}
.v2-post:hover .v2-post-img {
  transform: scale(1.02);
}
.v2-price-tag {
  position: absolute;
  top: 12px;
  right: 12px;
  background: rgba(0, 0, 0, 0.75);
  color: white;
  padding: 4px 10px;
  border-radius: 4px;
  font-weight: 700;
  font-size: 13px;
  backdrop-filter: blur(4px);
}
.v2-delete-btn {
  position: absolute;
  top: 12px;
  left: 12px;
  width: 32px;
  height: 32px;
  background: rgba(255, 255, 255, 0.9);
  border: none;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  color: #262626;
  opacity: 0.8;
}
.v2-post-body {
  padding: 12px 16px 0;
}
.v2-post-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 8px;
}
.v2-post-name {
  font-size: 16px;
  font-weight: 700;
  color: #262626;
  margin: 0;
  display: flex;
  align-items: center;
  gap: 6px;
}
.v2-pen {
  font-size: 12px;
  cursor: pointer;
  opacity: 0.2;
  transition: opacity 0.2s;
}
.v2-post:hover .v2-pen {
  opacity: 0.6;
}
.v2-post-en {
  font-size: 11px;
  color: #8e8e8e;
  text-transform: uppercase;
  font-weight: 700;
  margin-top: 2px;
}
.v2-checkbox {
  cursor: pointer;
}
.v2-checkbox input {
  display: none;
}
.v2-check-ui {
  width: 24px;
  height: 24px;
  border: 1px solid #dbdbdb;
  border-radius: 50%;
  display: block;
  position: relative;
  transition: all 0.2s;
}
.v2-checkbox input:checked + .v2-check-ui {
  background: #0095f6;
  border-color: #0095f6;
}
.v2-check-ui::after {
  content: "✓";
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) scale(0);
  color: white;
  font-size: 12px;
  font-weight: 800;
}
.v2-checkbox input:checked + .v2-check-ui::after {
  transform: translate(-50%, -50%) scale(1);
}
.v2-post-meta {
  margin-bottom: 8px;
}
.v2-twd {
  font-size: 13px;
  color: #262626;
  font-weight: 700;
  background: #f1f5f9;
  padding: 4px 8px;
  border-radius: 4px;
  display: inline-block;
}
.v2-desc {
  font-size: 14px;
  line-height: 1.6;
  color: #4b5563;
  margin-bottom: 12px;
}
.v2-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}
.v2-tag {
  font-size: 12px;
  background: #f9fafb;
  border: 1px solid #f3f4f6;
  padding: 4px 10px;
  border-radius: 6px;
  color: #6b7280;
}
.v2-tag.tip {
  background: #fffbeb;
  border-color: #fef3c7;
  color: #b45309;
}
.v2-tag.link-tag {
  background: #f0f9ff;
  border-color: #bae6fd;
  color: #0369a1;
  text-decoration: none;
  font-weight: 600;
}
.is-purchased .v2-post-visual {
  filter: grayscale(0.6);
  opacity: 0.8;
}
.v2-edit-mode {
  width: 100%;
  padding: 8px 0;
}
.v2-edit-input {
  width: 100%;
  border: 1px solid #efefef;
  padding: 10px;
  border-radius: 8px;
  font-size: 14px;
  margin-bottom: 8px;
  background: #f9fafb;
}
.v2-edit-row {
  display: flex;
  gap: 8px;
  margin-bottom: 12px;
}
.v2-edit-cam {
  background: #efefef;
  border: none;
  padding: 8px 16px;
  border-radius: 8px;
  font-size: 18px;
}
.v2-edit-actions {
  display: flex;
  gap: 8px;
}
.v2-edit-actions button {
  flex: 1;
  background: #262626;
  color: white;
  border: none;
  padding: 10px;
  border-radius: 8px;
  font-weight: 700;
}
.v2-edit-actions .can-btn {
  background: #efefef;
  color: #262626;
}
.fade-enter-active,
.fade-leave-active {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}
.hidden-input {
  display: none;
}
@media (max-width: 600px) {
  .v2-feed {
    padding-top: 0;
    padding-left: 8px;
    padding-right: 8px;
  }
  .v2-item-list {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 12px;
  }
  .v2-post {
    border-bottom: none;
    margin-bottom: 0;
    background: #fdfdfd;
    border: 1px solid #f1f1f1;
    border-radius: 12px;
    overflow: hidden;
    display: flex;
    flex-direction: column;
  }
  .v2-post-visual {
    aspect-ratio: 1 / 1;
  }
  .v2-post-body {
    padding: 8px;
    flex: 1;
    display: flex;
    flex-direction: column;
  }
  .v2-post-header {
    margin-bottom: 4px;
  }
  .v2-post-name {
    font-size: 14px;
    line-height: 1.2;
  }
  .v2-post-en {
    display: none;
  } /* 手機版隱藏英文名以節省空間 */
  .v2-check-ui {
    width: 20px;
    height: 20px;
  }
  .v2-check-ui::after {
    font-size: 10px;
  }
  .v2-post-meta {
    margin-bottom: 4px;
  }
  .v2-twd {
    font-size: 11px;
    padding: 2px 4px;
  }
  .v2-desc {
    font-size: 12px;
    line-height: 1.3;
    margin-bottom: 8px;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
  .v2-tags {
    gap: 4px;
  }
  .v2-tag {
    font-size: 10px;
    padding: 2px 6px;
  }
  .v2-price-tag {
    top: 6px;
    right: 6px;
    padding: 2px 6px;
    font-size: 11px;
  }
  .v2-delete-btn {
    top: 6px;
    left: 6px;
    width: 24px;
    height: 24px;
    font-size: 12px;
  }
}
</style>
