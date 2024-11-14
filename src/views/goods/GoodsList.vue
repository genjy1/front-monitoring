<template>
  <div
    class="overlay w-full h-screen backdrop-blur-8 absolute bg-black bg-opacity-20"
    v-show="isOpen"
    @click="closeModal"
  >
    <!-- Add new record dialog -->
    <DialogWindow :isOpen="isOpen" :newGood="newGood" @close="closeModal" @submitGood="addGood" />
  </div>
  <div>
    <HeaderComponent />

    <main class="main container mx-auto my-0 w-4/5 mt-24">
      <!-- Success message component -->
      <SuccessComponent v-if="message" />

      <header class="header flex items-center justify-between">
        <h1 class="text-3xl pb-2 sm:mt-3 font-semibold flex items-center justify-between">
          Список товаров
        </h1>
        <button
          @click="openModal"
          class="flex sm:button add-btn rounded font-normal p-2 text-center outline-none"
        >
          <span
            class="hidden sm:block border-2 p-2 rounded hover:bg-[#777] hover:text-white transition hover:border-transparent"
          >
            Добавить
          </span>
          <span class="icon sm:hidden">
            <svg width="32" height="32" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
              <circle cx="50" cy="50" r="45" stroke="black" stroke-width="5" fill="none" />
              <line x1="50" y1="30" x2="50" y2="70" stroke="black" stroke-width="6" />
              <line x1="30" y1="50" x2="70" y2="50" stroke="black" stroke-width="6" />
            </svg>
          </span>
        </button>
      </header>

      <hr class="py-2" />

      <!-- Table for larger screens -->
      <table
        v-if="goods.length && !isMobile"
        class="w-full border-collapse border border-gray-300 sm:table"
      >
        <thead>
          <tr class="border-b bg-[#eee]">
            <th class="border-r font-normal py-2">Код</th>
            <th class="border-r font-normal py-2">Наименование</th>
            <th class="text-right w-[100px]"></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="good in goods" :key="good.id" class="border-b hover:bg-[#eee] goods-row">
            <td class="border-r py-2 px-2 text-center">{{ good.code }}</td>
            <td class="border-r py-2 px-2 text-center">{{ good.name }}</td>
            <td class="border-r py-2 px-2 flex justify-around">
              <button @click="deleteGood(good.id)" class="p-0 m-0 w-8">
                <DeleteIcon />
              </button>
            </td>
          </tr>
        </tbody>
      </table>

      <!-- Card layout for mobile screens -->
      <div v-if="goods.length && isMobile" class="grid gap-4 sm:hidden">
        <div
          v-for="good in goods"
          :key="good.id"
          class="border rounded-lg shadow-md p-4 bg-white hover:bg-gray-100"
        >
          <div class="flex flex-col items-center justify-between mb-2">
            <h3 class="font-semibold text-left w-full text-lg">{{ good.name }}</h3>
            <span class="text-sm font-semibold text-gray-600">Код: {{ good.code }}</span>
          </div>
          <div class="text-right">
            <button @click="deleteGood(good.id)" class="p-1 text-red-600 hover:text-red-800">
              <DeleteIcon />
            </button>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import axios from 'axios'
import HeaderComponent from '@/components/HeaderComponent.vue'
import SuccessComponent from '@/components/SuccessComponent.vue'
import DeleteIcon from '@/components/DeleteIcon.vue'
import DialogWindow from '@/components/DialogWindow.vue'

const goods = ref([])
const newGood = ref({ code: '', name: '' })
const isOpen = ref(false)

const openModal = () => {
  isOpen.value = true
}

const closeModal = () => {
  isOpen.value = false
}

const isMobile = computed(() => window.innerWidth < 640)

const fetchGoods = async () => {
  try {
    const response = await axios.get('/goods/list')
    goods.value = response.data.data
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
