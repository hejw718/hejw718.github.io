import { ref, watch } from 'vue'
import { trips, defaultTrip } from '../data/trips'

const STORAGE_KEY = 'current-trip-id'

// 從 localStorage 讀取上次選擇的旅程
const savedTripId = localStorage.getItem(STORAGE_KEY)
const initialTrip = trips.find(t => t.id === savedTripId) || defaultTrip

// 全域當前旅程狀態
export const currentTrip = ref(initialTrip)

// 切換旅程
export function switchTrip(tripId) {
  const trip = trips.find(t => t.id === tripId)
  if (trip) {
    currentTrip.value = trip
    localStorage.setItem(STORAGE_KEY, tripId)
  }
}

// 監聽旅程變化並儲存
watch(currentTrip, (newTrip) => {
  localStorage.setItem(STORAGE_KEY, newTrip.id)
})

// 取得旅程專屬的 localStorage key
export function getTripStorageKey(baseKey) {
  return `${currentTrip.value.id}-${baseKey}`
}
