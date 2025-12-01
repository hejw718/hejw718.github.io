<script setup>
import { ref, computed, onMounted } from 'vue'
import { todos } from '../data/todos'

const todoList = ref([...todos])

// 從 localStorage 載入完成狀態
onMounted(() => {
  const saved = localStorage.getItem('paris-trip-todos')
  if (saved) {
    try {
      const savedData = JSON.parse(saved)
      todoList.value = todoList.value.map(todo => {
        const savedTodo = savedData.find(s => s.id === todo.id)
        return savedTodo ? { ...todo, completed: savedTodo.completed } : todo
      })
    } catch (e) {
      console.error('Failed to load todos from localStorage', e)
    }
  }
})

// 切換完成狀態
function toggleComplete(id) {
  const todo = todoList.value.find(t => t.id === id)
  if (todo) {
    todo.completed = !todo.completed
    saveTodos()
  }
}

// 儲存到 localStorage
function saveTodos() {
  const data = todoList.value.map(t => ({ id: t.id, completed: t.completed }))
  localStorage.setItem('paris-trip-todos', JSON.stringify(data))
}

// 依優先級分組
const groupedTodos = computed(() => {
  const groups = {
    high: todoList.value.filter(t => t.priority === 'high' && !t.completed),
    medium: todoList.value.filter(t => t.priority === 'medium' && !t.completed),
    completed: todoList.value.filter(t => t.completed)
  }
  return groups
})


</script>

<template>
  <div class="todo-page">
    <div class="todo-header">
      <h2>📋 待辦事項</h2>
      <p class="todo-subtitle">旅行前需要處理的事項</p>
    </div>

    <div class="todo-content">
      <div v-for="(group, key) in groupedTodos" :key="key" class="todo-group">
        <div v-for="todo in group" :key="todo.id" class="todo-card" :class="{ completed: todo.completed }">
          <div class="todo-checkbox-wrapper">
            <input 
              type="checkbox" 
              :id="`todo-${todo.id}`"
              :checked="todo.completed"
              @change="toggleComplete(todo.id)"
              class="todo-checkbox"
            />
          </div>
          
          <div class="todo-main">
            <div class="todo-header-row">
              <label :for="`todo-${todo.id}`" class="todo-title">{{ todo.title }}</label>
              <span class="todo-category">{{ todo.category }}</span>
            </div>
            
            <div class="todo-description">{{ todo.description }}</div>
            
            <div class="todo-footer">
              <span class="todo-date">📅 {{ todo.date }}</span>
              <a v-if="todo.url && todo.url.length > 0" :href="todo.url" target="_blank" class="todo-link">
                🔗 查看詳情
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.todo-page {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.todo-header {
  text-align: center;
  margin-bottom: 30px;
}

.todo-header h2 {
  font-size: 28px;
  margin: 0 0 8px 0;
  color: var(--color-heading);
}

.todo-subtitle {
  color: var(--color-text-secondary);
  margin: 0;
}

.todo-content {
  display: flex;
  flex-direction: column;
  gap: 30px;
}

.todo-group-title {
  font-size: 18px;
  margin: 0 0 16px 0;
  color: var(--color-heading);
}

.todo-card {
  display: flex;
  gap: 16px;
  padding: 20px;
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  margin-bottom: 16px;
}

.todo-card:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  transform: translateY(-2px);
}

.todo-card.completed {
  opacity: 0.6;
}

.todo-checkbox-wrapper {
  padding-top: 2px;
}

.todo-checkbox {
  width: 20px;
  height: 20px;
  cursor: pointer;
}

.todo-main {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.todo-header-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
}

.todo-title {
  font-size: 18px;
  font-weight: 600;
  color: var(--color-heading);
  cursor: pointer;
  margin: 0;
}

.todo-card.completed .todo-title {
  text-decoration: line-through;
}

.todo-category {
  padding: 4px 12px;
  background: var(--color-background-soft);
  border-radius: 12px;
  font-size: 12px;
  color: var(--color-text-secondary);
  white-space: nowrap;
}

.todo-description {
  color: var(--color-text);
  line-height: 1.5;
}

.todo-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 8px;
}

.todo-date {
  font-size: 14px;
  color: var(--color-text-secondary);
}

.todo-link {
  color: var(--color-primary);
  text-decoration: none;
  font-size: 14px;
  font-weight: 500;
  transition: color 0.2s;
}

.todo-link:hover {
  color: var(--color-primary-dark);
  text-decoration: underline;
}

@media (max-width: 768px) {
  .todo-page {
    padding: 16px;
  }

  .todo-card {
    padding: 16px;
  }

  .todo-header-row {
    flex-direction: column;
    align-items: flex-start;
  }

  .todo-footer {
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
  }
}
</style>
