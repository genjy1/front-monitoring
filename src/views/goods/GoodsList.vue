<template>
  <!-- Полупрозрачный фон для модального окна -->
  <div
    v-show="isOpen"
    class="overlay fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50 transition-opacity duration-300"
    @click.self="closeModal"
  >
    <!-- Модальное окно -->
    <DialogWindow
      :isOpen="isOpen"
      :newGood="newGood"
      @close="closeModal"
      @submitGood="addGood"
      class="relative z-10 bg-white rounded-lg shadow-lg w-[90%] sm:w-1/2 p-6"
    />
  </div>
  <div>
    <HeaderComponent class="z-0" />

    <main class="container mx-auto my-0 w-full lg:w-4/5 mt-24 px-4">
      <!-- Успешное сообщение -->
      <SuccessComponent v-if="message" />

      <!-- Заголовок и кнопка добавления -->
      <header class="header flex flex-wrap items-center justify-between mb-6">
        <h1 class="text-2xl sm:text-3xl font-semibold">Список товаров</h1>
        <button
          @click="openModal"
          class="add-btn flex items-center justify-center bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 transition"
        >
          <span class="hidden sm:inline">Добавить</span>
          <svg
            class="sm:hidden"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
          >
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
        </button>
      </header>

      <hr class="mb-6" />

      <!-- Таблица для больших экранов -->
      <table v-if="goods.length" class="hidden sm:table w-full text-sm border border-gray-300">
        <thead class="bg-gray-100">
          <tr>
            <th class="py-2 px-4 text-left border-b">Код</th>
            <th class="py-2 px-4 text-left border-b">Наименование</th>
            <th class="py-2 px-4 text-center border-b">Удалить</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="good in goods" :key="good.id" class="hover:bg-gray-50 transition">
            <td class="py-2 px-4 border-b">{{ good.code }}</td>
            <td class="py-2 px-4 border-b">{{ good.name }}</td>
            <td class="py-2 px-4 border-b text-center">
              <button @click="deleteGood(good.id)" class="p-1 text-red-500 hover:text-red-700">
                <DeleteIcon />
              </button>
            </td>
          </tr>
        </tbody>
      </table>

      <!-- Карточки для мобильных экранов -->
      <div v-if="goods.length" class="grid grid-cols-1 gap-4 sm:hidden">
        <div
          v-for="good in goods"
          :key="good.id"
          class="bg-white border rounded-lg shadow-md p-4 hover:shadow-lg transition"
        >
          <div class="flex flex-col">
            <h3 class="text-lg font-medium mb-2">{{ good.name }}</h3>
            <span class="text-sm text-gray-500">Код: {{ good.code }}</span>
          </div>
          <div class="mt-4 text-right">
            <button @click="deleteGood(good.id)" class="text-red-500 hover:text-red-700">
              <DeleteIcon />
            </button>
          </div>
        </div>
      </div>

      <!-- Сообщение, если товаров нет -->
      <div v-else class="text-center py-8 text-gray-500">
        <p>Нет доступных товаров. Нажмите "Добавить", чтобы создать новый товар.</p>
      </div>
    </main>
    <Pagination :links="links" @page-change="onPageChange" />
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import axios from 'axios'
import HeaderComponent from '@/components/HeaderComponent.vue'
import SuccessComponent from '@/components/messages/SuccessComponent.vue'
import DeleteIcon from '@/components/icons/DeleteIcon.vue'
import DialogWindow from '@/components/DialogWindow.vue'
import Pagination from '@/components/Pagination.vue'

const goods = ref([])
const newGood = ref({ code: '', name: '' })
const isOpen = ref(false)
const message = ref()
const links = ref()
const counter = ref(1)
const onPageChange = (url) => {
  const page = new URL(url).searchParams.get('page')
  counter.value = page
  fetchGoods()
}

const openModal = () => {
  isOpen.value = true
}

const closeModal = () => {
  isOpen.value = false
}

const fetchGoods = async () => {
  try {
    const response = await axios.get(`/goods/list?page=${counter.value}`)
    goods.value = response.data.data
    links.value = response.data.links
  } catch (error) {
    console.error('Ошибка при загрузке товаров:', error)
  }
}

const deleteGood = async (id) => {
  try {
    await axios.patch(`/goods/${id}/destroy`)
    goods.value = goods.value.filter((good) => good.id !== id)
  } catch (error) {
    console.error('Ошибка при удалении товара:', error)
  }
}

const addGood = async () => {
  try {
    const response = await axios.post('/api/goods', newGood.value)
    goods.value.push(response.data)
    newGood.value = { code: '', name: '' }
    closeModal() // Закрываем модальное окно после добавления
  } catch (error) {
    console.error('Ошибка при добавлении товара:', error)
  }
}

onMounted(fetchGoods)
</script>
<style scoped>
/* Мобильные стили */
.add-btn {
  min-width: 120px;
}

@media (max-width: 640px) {
  .add-btn {
    width: 48px;
    height: 48px;
    padding: 0;
  }

  .add-btn svg {
    margin: auto;
  }
}
</style>
