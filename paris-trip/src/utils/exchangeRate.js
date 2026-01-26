import { ref, watch } from 'vue';
import { exchangeRate as defaultRate } from '../data/priceComparison';

const STORAGE_KEY = 'paris-exchange-rate';

// 初始化匯率：優先從 localStorage 讀取，否則使用預設值
const savedRate = localStorage.getItem(STORAGE_KEY);
const initialRate = savedRate ? parseFloat(savedRate) : defaultRate.eurToTwd;

export const globalExchangeRate = ref(initialRate);

// 監聽匯率變化並儲存
watch(globalExchangeRate, (newRate) => {
  localStorage.setItem(STORAGE_KEY, newRate.toString());
});

// 監聽 localStorage 變化（支援多視窗同步）
window.addEventListener('storage', (event) => {
  if (event.key === STORAGE_KEY && event.newValue) {
    globalExchangeRate.value = parseFloat(event.newValue);
  }
});
