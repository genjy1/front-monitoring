<template>
  <HeaderComponent />
  <main class="mx-auto mt-20 w-4/5">
    <h1 class="text-3xl pb-2 font-semibold flex items-center justify-between mt-24">
      Состояние загрузки
    </h1>
    <hr />

    <!-- Table for larger screens -->
    <table class="table-auto w-full border-x mt-6 hidden sm:table">
      <thead>
        <tr class="capitalize border-y bg-gray-200">
          <th class="font-normal border-r py-2 px-4"># автомата</th>
          <th class="font-normal border-r py-2 px-4">адрес</th>
          <th class="font-normal border-r py-2 px-4">автомат</th>
          <th class="font-normal border-r py-2 px-4"># продукта</th>
          <th class="font-normal border-r py-2 px-4">код продукта</th>
          <th class="font-normal border-r py-2 px-4">продукт</th>
          <th class="font-normal border-r py-2 px-4">годен до</th>
          <th class="font-normal border-r py-2 px-4">вместимость</th>
          <th class="font-normal border-r py-2 px-4">остаток</th>
          <th class="font-normal py-2 px-4">добавить</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="good in goods" :key="good.id" class="border-y hover:bg-gray-100/75">
          <td class="font-normal border-r py-2 px-4 text-center">{{ good.id }}</td>
          <td class="font-normal border-r py-2 px-4">{{ good.machine.address }}</td>
          <td class="font-normal border-r py-2 px-4">{{ good.machine.name || 'N/A' }}</td>
          <td class="font-normal border-r py-2 px-4">{{ good.id }}</td>
          <td class="font-normal border-r py-2 px-4">{{ good.code }}</td>
          <td class="font-normal border-r py-2 px-4">{{ good.name }}</td>
          <td class="font-normal border-r py-2 px-4">{{ good.valid || 'n/a' }}</td>
          <td class="font-normal border-r py-2 px-4">{{ good.machine.capacity || 'N/A' }}</td>
          <td class="font-normal border-r py-2 px-4">{{ good.remains }}</td>
          <td class="font-normal py-2 px-4">0</td>
        </tr>
      </tbody>
    </table>

    <!-- Card layout for smaller screens -->
    <div class="grid grid-cols-1 gap-4 mt-6 sm:hidden">
      <div
        v-for="good in goods"
        :key="good.id"
        class="bg-white border rounded-lg shadow-lg p-4 hover:bg-gray-100 transition-colors"
      >
        <div class="font-bold text-lg text-gray-800 mb-2"># автомата: {{ good.id }}</div>
        <div class="text-sm text-gray-600 mb-2">
          <span class="font-semibold">Адрес:</span> {{ good.machine.address }}
        </div>
        <div class="text-sm text-gray-600 mb-2">
          <span class="font-semibold">Автомат:</span> {{ good.machine.name || 'N/A' }}
        </div>
        <div class="text-sm text-gray-600 mb-2">
          <span class="font-semibold"># продукта:</span> {{ good.id }}
        </div>
        <div class="text-sm text-gray-600 mb-2">
          <span class="font-semibold">Код продукта:</span> {{ good.code }}
        </div>
        <div class="text-sm text-gray-600 mb-2">
          <span class="font-semibold">Продукт:</span> {{ good.name }}
        </div>
        <div class="text-sm text-gray-600 mb-2">
          <span class="font-semibold">Годен до:</span> {{ good.valid || 'n/a' }}
        </div>
        <div class="text-sm text-gray-600 mb-2">
          <span class="font-semibold">Вместимость:</span> {{ good.machine.capacity || 'N/A' }}
        </div>
        <div class="text-sm text-gray-600 mb-2">
          <span class="font-semibold">Остаток:</span> {{ good.remains }}
        </div>
      </div>
    </div>

    <!-- Pagination Slot -->
    <div class="pagination mt-4">
      <slot name="pagination"></slot>
    </div>
  </main>
</template>

<script setup>
import HeaderComponent from '@/components/HeaderComponent.vue'
import { ref, watchEffect } from 'vue'
import axios from 'axios'

const goods = ref([])

const fetchGoods = async () => {
  try {
    const response = await axios.get('/goods/state')
    goods.value = response.data.data
  } catch (error) {
    console.error('Ошибка при загрузке товаров:', error)
  }
}

watchEffect(fetchGoods)
</script>

<style scoped>
/* Additional scoped styles can be added here if needed */
</style>
