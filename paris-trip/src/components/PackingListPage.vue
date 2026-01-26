<script setup>
import { ref, computed, onMounted, watch } from "vue";
import { currentTrip, getTripStorageKey } from "../utils/tripStore";

const getStorageKey = () => getTripStorageKey("packing-list");

const categories = ref([
  {
    name: "必備證件",
    icon: "🛂",
    items: [
      { id: 1, name: "護照 (及其影本)", checked: false },
      { id: 2, name: "歐元現金 & 信用卡", checked: false },
    ],
  },
  {
    name: "電子產品",
    icon: "🔌",
    items: [
      { id: 3, name: "歐標轉接頭 (兩圓頭)", checked: false },
      { id: 4, name: "行動電源 & 充電線", checked: false },
    ],
  },
  {
    name: "衣物鞋物",
    icon: "👕",
    items: [
      { id: 5, name: "保暖外套 (防風防水佳)", checked: false },
      { id: 6, name: "休閒走遠路鞋", checked: false },
      { id: 7, name: "發熱衣 / 保暖內層", checked: false },
      { id: 8, name: "睡衣", checked: false },
      { id: 9, name: "內衣褲 & 襪子", checked: false },
    ],
  },
  {
    name: "衛生藥品",
    icon: "💊",
    items: [
      { id: 10, name: "牙刷 / 牙膏 (歐洲部分旅館不提供)", checked: false },
      { id: 11, name: "個人常備藥盒", checked: false },
      { id: 12, name: "保養品 / 防曬", checked: false },
      { id: 13, name: "摺疊傘 / 雨衣", checked: false },
    ],
  },
]);

const userItems = ref([]);
const newItemName = ref("");
const selectedCategory = ref("必備證件");

// 載入當前旅程的資料
function loadTripData() {
  const saved = localStorage.getItem(getStorageKey());
  if (saved) {
    const { savedCategories, savedUserItems } = JSON.parse(saved);
    // 合併勾選狀態到結構中
    if (savedCategories) {
      categories.value.forEach((cat) => {
        const savedCat = savedCategories.find((s) => s.name === cat.name);
        if (savedCat) {
          cat.items.forEach((item) => {
            const savedItem = savedCat.items.find((si) => si.id === item.id);
            if (savedItem) item.checked = savedItem.checked;
          });
        }
      });
    }
    if (savedUserItems) userItems.value = savedUserItems;
  }
}

// 初始載入
onMounted(() => {
  loadTripData();
});

// 監聽旅程切換
watch(currentTrip, () => {
  loadTripData();
});

function saveToLocalStorage() {
  localStorage.setItem(
    getStorageKey(),
    JSON.stringify({
      savedCategories: categories.value,
      savedUserItems: userItems.value,
    }),
  );
}

function toggleItem(item) {
  item.checked = !item.checked;
  saveToLocalStorage();
}

function addUserItem() {
  if (!newItemName.value.trim()) return;
  userItems.value.push({
    id: Date.now(),
    name: newItemName.value.trim(),
    checked: false,
    category: selectedCategory.value,
  });
  newItemName.value = "";
  saveToLocalStorage();
}

function deleteUserItem(id) {
  userItems.value = userItems.value.filter((i) => i.id !== id);
  saveToLocalStorage();
}

// 進度計算
const stats = computed(() => {
  let total = 0;
  let completed = 0;

  categories.value.forEach((cat) => {
    cat.items.forEach((item) => {
      total++;
      if (item.checked) completed++;
    });
  });

  userItems.value.forEach((item) => {
    total++;
    if (item.checked) completed++;
  });

  const percent = total > 0 ? Math.round((completed / total) * 100) : 0;
  return { total, completed, percent };
});
</script>

<template>
  <div class="packing-page">
    <!-- Progress Header -->
    <div class="progress-section">
      <div class="stats-card">
        <div class="stats-info">
          <h3>行李打包進度</h3>
          <p>{{ stats.completed }} / {{ stats.total }} 項目已完成</p>
        </div>
        <div class="progress-bar-wrap">
          <div
            class="progress-bar-fill"
            :style="{ width: stats.percent + '%' }"
          ></div>
          <span class="progress-text">{{ stats.percent }}%</span>
        </div>
      </div>
    </div>

    <!-- Quick Add -->
    <div class="quick-add">
      <div class="add-box">
        <input
          v-model="newItemName"
          type="text"
          placeholder="新增私人裝備..."
          @keyup.enter="addUserItem"
        />
        <select v-model="selectedCategory">
          <option v-for="cat in categories" :key="cat.name" :value="cat.name">
            {{ cat.name }}
          </option>
        </select>
        <button @click="addUserItem" :disabled="!newItemName">新增</button>
      </div>
    </div>

    <!-- Categories -->
    <div class="packing-list">
      <div v-for="cat in categories" :key="cat.name" class="packing-cat">
        <div class="cat-header">
          <span class="cat-icon">{{ cat.icon }}</span>
          <h2 class="cat-title">{{ cat.name }}</h2>
        </div>

        <div class="items-grid">
          <!-- 預設項目 -->
          <div
            v-for="item in cat.items"
            :key="item.id"
            class="packing-item"
            :class="{ checked: item.checked }"
            @click="toggleItem(item)"
          >
            <div class="check-indicator"></div>
            <span class="item-name">{{ item.name }}</span>
          </div>

          <!-- 使用者自定義項目 -->
          <div
            v-for="item in userItems.filter((i) => i.category === cat.name)"
            :key="item.id"
            class="packing-item user-item"
            :class="{ checked: item.checked }"
            @click="toggleItem(item)"
          >
            <div class="check-indicator"></div>
            <span class="item-name">{{ item.name }}</span>
            <button class="del-btn" @click.stop="deleteUserItem(item.id)">
              ✕
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.packing-page {
  padding: 16px;
  background: #f8fafc;
  min-height: 100vh;
  padding-bottom: 50px;
}

.progress-section {
  position: sticky;
  top: 0;
  z-index: 10;
  margin-bottom: 20px;
}

.stats-card {
  background: white;
  padding: 16px;
  border-radius: 16px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
}

.stats-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
}

.stats-info h3 {
  margin: 0;
  font-size: 16px;
  color: #1e293b;
}
.stats-info p {
  margin: 0;
  font-size: 13px;
  color: #64748b;
  font-weight: 600;
}

.progress-bar-wrap {
  height: 10px;
  background: #e2e8f0;
  border-radius: 5px;
  position: relative;
  overflow: visible;
}

.progress-bar-fill {
  height: 100%;
  background: linear-gradient(90deg, #3b82f6, #60a5fa);
  border-radius: 5px;
  transition: width 0.4s ease;
}

.progress-text {
  position: absolute;
  right: 0;
  top: -24px;
  font-size: 11px;
  font-weight: 800;
  color: #3b82f6;
}

.quick-add {
  margin-bottom: 24px;
}

.add-box {
  display: flex;
  gap: 8px;
  background: white;
  padding: 8px;
  border-radius: 12px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
}

.add-box input {
  flex: 1;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  padding: 8px 12px;
  font-size: 14px;
  outline: none;
}

.add-box select {
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  padding: 0 8px;
  font-size: 13px;
  color: #64748b;
  background: #f8fafc;
}

.add-box button {
  background: #1e293b;
  color: white;
  border: none;
  padding: 0 16px;
  border-radius: 8px;
  font-weight: 600;
  font-size: 14px;
}

.add-box button:disabled {
  opacity: 0.3;
}

.packing-list {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.cat-header {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 12px;
  padding-left: 4px;
}

.cat-icon {
  font-size: 20px;
}
.cat-title {
  font-size: 16px;
  font-weight: 800;
  color: #334155;
  margin: 0;
}

.items-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 10px;
}

.packing-item {
  background: white;
  padding: 14px 16px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  gap: 12px;
  transition: all 0.2s;
  cursor: pointer;
  border: 1px solid transparent;
  position: relative;
}

.packing-item:active {
  transform: scale(0.98);
}

.check-indicator {
  width: 20px;
  height: 20px;
  border: 2px solid #cbd5e1;
  border-radius: 6px;
  position: relative;
  transition: all 0.2s;
}

.packing-item.checked {
  background: #f1f5f9;
  border-color: #e2e8f0;
}

.packing-item.checked .check-indicator {
  background: #3b82f6;
  border-color: #3b82f6;
}

.packing-item.checked .check-indicator::after {
  content: "✓";
  position: absolute;
  color: white;
  font-size: 12px;
  font-weight: 900;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.packing-item.checked .item-name {
  color: #94a3b8;
  text-decoration: line-through;
}

.item-name {
  font-size: 15px;
  font-weight: 600;
  color: #334155;
}

.user-item .del-btn {
  margin-left: auto;
  background: none;
  border: none;
  color: #94a3b8;
  font-size: 14px;
  padding: 4px;
}

@media (min-width: 768px) {
  .items-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>
