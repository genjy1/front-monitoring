<template>
  <div
    class="links_wrapper flex flex-wrap gap-2 justify-around sm:items-center sm:justify-center py-4"
  >
    <button
      v-for="(link, index) in links"
      :key="index"
      class="btn py-2 px-4 border rounded-lg transition-all duration-200"
      :class="{
        'bg-blue-500 text-white font-bold': link.active, // Активная страница
        'bg-gray-100 text-gray-700': !link.active && link.url, // Неактивная, но доступная
        'bg-gray-300 text-gray-500 cursor-not-allowed': !link.url, // Недоступная
      }"
      :disabled="!link.url"
      @click="handlePageChange(link.url)"
    >
      <span v-html="link.label"></span>
    </button>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue'

// Принимаем свойства
defineProps({
  links: {
    type: Array,
    required: true,
    default: () => [],
  },
})

// Определяем событие для передачи данных наверх
const emit = defineEmits(['page-change'])

// Локальный метод для обработки клика
const handlePageChange = (url) => {
  if (url) {
    emit('page-change', url) // Генерируем событие с URL
  }
}
</script>

<style scoped>
.btn {
  transition: all 0.2s ease;
}
.btn:hover:not(:disabled) {
  background-color: #0056b3;
  color: white;
}
</style>
