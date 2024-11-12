<template>
  <HeaderComponent />
  <div class="mt-24 mx-auto my-0 w-4/5">
    <div class="wrapper">
      <header class="wrapper-header max-w-[718px] mb-6">
        <h1 class="pb-2 text-2xl">Общая статистика</h1>
        <hr />
      </header>

      <!-- Период -->
      <div class="panel rounded border bg-[#f5f5f5] max-w-[718px] mb-6">
        <header class="px-3 py-2 border-b">
          <h2>Период</h2>
        </header>
        <div class="panel-body p-3.5 bg-white">
          <form @submit.prevent="applyDateFilter" class="flex-col flex gap-4 sm:items-start">
            <div class="date-input__group flex items-center gap-4 sm:flex-row flex-col">
              <label for="start-date">Начало периода</label>
            </div>
            <div
              class="date-input__group flex items-center gap-4 sm:w-[336px] justify-between sm:flex-row flex-col"
            >
              <label for="end-date">Конец периода</label>
            </div>
            <button type="submit" class="border px-2 py-2 rounded">Применить</button>
          </form>
        </div>
      </div>

      <!-- Продажи -->
      <div class="panel rounded border max-w-[718px] mb-6">
        <header class="px-3 py-2 border-b bg-[#f5f5f5] rounded-t">
          <h2>Продажи</h2>
        </header>
        <table>
          <thead>
            <tr class="border-b bg-[#eee]">
              <th class="w-[359px] text-left border-r p-2"></th>
              <th class="w-[230px] text-left border-r p-2">Выдано товаров</th>
              <th class="w-[130px] text-left p-2">Выручка</th>
            </tr>
          </thead>
          <tbody>
            <tr class="border-b">
              <td class="font-bold border-r p-2.5">Всего</td>
              <td class="p-2 border-r">{{ sales.totalItems }}</td>
              <td class="p-2">{{ sales.totalRevenue }}</td>
            </tr>
            <tr class="border-b">
              <td class="font-bold border-r p-2.5">Наличный расчет</td>
              <td class="p-2 border-r">{{ sales.cashItems }}</td>
              <td class="p-2">{{ sales.cashRevenue }}</td>
            </tr>
            <tr class="border-b">
              <td class="font-bold border-r p-2.5">Безналичный расчет</td>
              <td class="p-2 border-r">{{ sales.cardItems }}</td>
              <td class="p-2">{{ sales.cardRevenue }}</td>
            </tr>
            <tr>
              <td class="font-bold border-r p-2.5">Тестовые продажи</td>
              <td class="p-2 border-r">{{ sales.testItems }}</td>
              <td class="p-2">{{ sales.testRevenue }}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Статистика по наличным -->
      <div class="panel rounded border max-w-[718px]">
        <header class="panel-header px-3 py-2 border-b bg-[#f5f5f5] rounded-t">
          <h2>Статистика по наличным</h2>
        </header>
        <table>
          <thead>
            <tr class="border-b bg-[#eee] border-r">
              <th class="w-[359px]"></th>
              <th class="p-2 w-[128px] border-r">Монеты</th>
              <th class="p-2 w-[132px] border-r">Купюры</th>
              <th class="p-2 w-[100px]">Всего</th>
            </tr>
          </thead>
          <tbody>
            <tr class="border-b">
              <td class="p-2 font-bold border-r">Принято денег</td>
              <td class="border-r">{{ cashStats.coinsReceived }}</td>
              <td class="border-r">{{ cashStats.billsReceived }}</td>
              <td>{{ cashStats.totalReceived }}</td>
            </tr>
            <tr class="border-b">
              <td class="p-2 font-bold border-r">Выдано сдачи</td>
              <td class="border-r">{{ cashStats.coinsReturned }}</td>
              <td class="border-r">{{ cashStats.billsReturned }}</td>
              <td>{{ cashStats.totalReturned }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import flatpickr from 'flatpickr'
import HeaderComponent from '@/components/HeaderComponent.vue'

// Состояния для выбранных дат и статистики
const startDate = ref('')
const endDate = ref('')
const sales = ref({
  totalItems: 0,
  totalRevenue: 0,
  cashItems: 0,
  cashRevenue: 0,
  cardItems: 0,
  cardRevenue: 0,
  testItems: 0,
  testRevenue: 0,
})
const cashStats = ref({
  coinsReceived: 0,
  billsReceived: 0,
  totalReceived: 0,
  coinsReturned: 0,
  billsReturned: 0,
  totalReturned: 0,
})

// Метод для применения фильтра по датам
const applyDateFilter = () => {
  console.log('Start Date:', startDate.value)
  console.log('End Date:', endDate.value)

  // Здесь можно обновить статистику на основе выбранных дат
}

// Инициализация flatpickr
onMounted(() => {
  flatpickr('#start-date', {
    dateFormat: 'Y-m-d H:i',
  })
  flatpickr('#end-date', {
    dateFormat: 'Y-m-d H:i',
  })
})
</script>

<style scoped>
/* Ваши стили */
</style>
