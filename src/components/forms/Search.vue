<template>
  <div class="search-wrapper flex items-center relative">
    <!-- Поле ввода -->
    <input
      type="search"
      name="search"
      id="search"
      :placeholder="placeholder"
      class="border-2 px-4 py-2 rounded-lg focus:ring-2 focus:ring-purple-900 border-purple-800 outline-none w-96"
      @input="handleInput"
    />
    <!-- Иконка поиска -->
    <label for="search" class="cursor-pointer w-8 relative right-10">
      <SearchIcon class="text-purple-800" />
    </label>
  </div>
</template>

<script setup>
import SearchIcon from '../icons/SearchIcon.vue' // Импорт иконки
import { ref } from 'vue'

// Дефолтное значение для placeholder
const props = defineProps({
  placeholder: {
    type: String,
    default: 'Пожалуйста, введите свой ИНН',
  },
})

// Эмиссия события search
const emit = defineEmits(['search'])

// Локальное хранение введенного значения (опционально)
const searchQuery = ref('')

// Обработка ввода и эмиссия события
const handleInput = (event) => {
  searchQuery.value = event.target.value
  emit('search', searchQuery.value) // Отправка значения
}
</script>
