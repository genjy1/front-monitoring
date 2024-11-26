<template>
  <div class="wrapper">
    <div class="relative w-full pb-4">
      <!-- Метка для списка -->
      <label for="journals" class="block text-sm font-medium text-gray-700 mb-2">
        Выберите журнал:
      </label>

      <!-- Кастомизированный select -->
      <div class="relative">
        <!-- Кнопка для отображения выбранного значения -->
        <button
          @click="toggleDropdown"
          class="w-full bg-white border border-gray-300 rounded-lg px-4 py-2 text-left text-sm shadow-sm flex justify-between items-center"
        >
          <span>{{ selectedLabel || 'Выберите журнал' }}</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5 text-gray-400"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fill-rule="evenodd"
              d="M5.293 7.707a1 1 0 011.414 0L10 11.586l3.293-3.879a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
              clip-rule="evenodd"
            />
          </svg>
        </button>

        <!-- Выпадающий список -->
        <div
          v-show="isOpen"
          class="absolute z-10 mt-2 w-full bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-auto"
        >
          <ul class="py-1">
            <li
              v-for="(journal, index) in journalOptions"
              :key="index"
              @click="selectJournal(journal)"
              class="cursor-pointer px-4 py-2 hover:bg-indigo-100 text-sm text-gray-700 flex items-center gap-2"
            >
              <!-- Кастомизация иконки -->
              <svg
                v-if="journal.icon"
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5 text-gray-500"
                :class="journal.iconClass"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path :d="journal.icon" />
              </svg>
              {{ journal.label }}
            </li>
          </ul>
        </div>
      </div>
    </div>

    <!-- Прелоадер при загрузке данных -->
    <div v-if="loading" class="text-center p-4">Загрузка...</div>

    <!-- Компоненты для разных журналов -->
    <EventsComponent :events="events" v-else-if="selectedJournal === 'events'" />
    <SalesComponent :sales="sales" v-else-if="selectedJournal === 'sales'" />
    <GoodsSold :goods="goods" v-else-if="selectedJournal === 'goods_sold'" />

    <!-- Сообщение об ошибке -->
    <div v-if="error" class="text-center text-red-500 p-4">Ошибка: {{ error }}</div>
  </div>
</template>

<script setup>
import axios from 'axios'
import { ref, watch, computed } from 'vue'
import { useRoute } from 'vue-router'
import EventsComponent from '../EventsComponent.vue'
import SalesComponent from '../SalesComponent.vue'
import GoodsSold from '../GoodsSold.vue'

// Параметры из маршрута
const route = useRoute()
const id = route.params.id

// Состояния
const isOpen = ref(false)
const selectedJournal = ref('events') // По умолчанию выбран "events"
const selectedLabel = computed(
  () => journalOptions.find((option) => option.value === selectedJournal.value)?.label,
)
const journalOptions = [
  {
    value: 'events',
    label: 'События',
    iconClass: 'text-blue-500',
  },
  {
    value: 'sales',
    label: 'Продажи',
    iconClass: 'text-green-500',
  },
  { value: 'goods_sold', label: 'Выдачи товаров' },
]

const events = ref([])
const sales = ref([])
const goods = ref([])
const loading = ref(false)
const error = ref(null)

// Функция для загрузки данных
const fetchData = async () => {
  loading.value = true
  error.value = null
  try {
    const response = await axios.get(`/machine/${id}/${selectedJournal.value}`)
    switch (selectedJournal.value) {
      case 'events':
        events.value = response.data.events || []
        break
      case 'sales':
        sales.value = response.data.sales || []
        break
      case 'goods_sold':
        goods.value = response.data.goods || []
        break
    }
  } catch (err) {
    error.value = err.response?.data?.message || 'Ошибка при загрузке данных'
  } finally {
    loading.value = false
  }
}

// Обновление данных при изменении журнала и при монтировании
watch(selectedJournal, fetchData, { immediate: true })

// Функция для переключения выпадающего списка
const toggleDropdown = () => {
  isOpen.value = !isOpen.value
}

// Функция для выбора опции
const selectJournal = (journal) => {
  selectedJournal.value = journal.value
  isOpen.value = false
}
</script>

<style>
/* Дополнительные стили */
[v-show] {
  transition:
    opacity 0.2s ease-in-out,
    transform 0.2s ease-in-out;
}
[v-show]:enter {
  opacity: 0;
  transform: translateY(-10px);
}
[v-show]:leave {
  opacity: 0;
  transform: translateY(-10px);
}
</style>
