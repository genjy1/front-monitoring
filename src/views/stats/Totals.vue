<template>
  <HeaderComponent />
  <main class="container mx-auto mt-20 mb-0 w-4/5">
    <h1 class="text-2xl mt-24">Итоги по дням</h1>
    <hr class="my-4" />

    <table class="table-auto w-full">
      <thead>
        <tr class="border-x bg-gray-200">
          <th class="border-r border-b py-2">Дата</th>
          <th class="border-r border-b py-2">Принято денег</th>
          <th class="border-r border-b py-2">Выдано сдачи</th>
          <th class="border-r border-b py-2">Выдано товаров</th>
          <th class="border-b py-2">Выручка</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(sale, index) in sales"
          :key="sale.id"
          :class="index % 2 === 0 ? 'bg-gray-100' : ''"
        >
          <td class="py-2 text-center">{{ formatDate(sale.created_at) }}</td>
          <td class="py-2 text-center">{{ formatNumber(sale.balance) }}</td>
          <td class="py-2 text-center">
            {{ sale.change_given ? formatNumber(sale.change_given) : '-' }}
          </td>
          <td class="py-2 text-center">{{ sale.items_sold || '-' }}</td>
          <td class="py-2 text-center">{{ sale.revenue ? formatNumber(sale.revenue) : '-' }}</td>
        </tr>
      </tbody>
    </table>
    <Pagination :links="links" @page-change="onPageChange" />
  </main>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import HeaderComponent from '@/components/HeaderComponent.vue'
import axios from 'axios'
import Pagination from '@/components/Pagination.vue'

const sales = ref([]) // Инициализация как пустого массива
const links = ref([]) // Инициализация как пустого массива

// Функция для получения данных с сервера
const getSales = async (url = '/sales/') => {
  try {
    const response = await axios.get(url)
    sales.value = response.data.data
    links.value = response.data.links
  } catch (error) {
    console.error('Ошибка при загрузке данных:', error)
  }
}

// Функция для обработки смены страницы
const onPageChange = async (url) => {
  if (url) {
    await getSales(url) // Загрузка данных с указанного URL
  }
}

// Функция для форматирования даты
const formatDate = (date) => {
  const options = { day: '2-digit', month: '2-digit', year: 'numeric' }
  return new Date(date).toLocaleDateString('ru-RU', options)
}

// Функция для форматирования чисел с разделением на тысячи и двумя знаками после запятой
const formatNumber = (value) => {
  return new Intl.NumberFormat('ru-RU', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value)
}

onMounted(async () => {
  await getSales() // Загрузка первой страницы данных при монтировании компонента
})
</script>

<style scoped>
.container {
  width: 80%;
}
</style>
