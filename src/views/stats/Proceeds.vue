<template>
  <HeaderComponent />
  <main class="main mx-auto mt-24 w-4/5">
    <h1 class="text-2xl">Распределение выручки</h1>
    <hr class="my-4" />

    <!-- Таблица выручки -->
    <table class="table-auto w-full border">
      <thead>
        <tr class="bg-gray-200 border-b-2">
          <th class="py-2">#</th>
          <th class="py-2">Номер</th>
          <th class="py-2">Имя автомата</th>
          <th class="py-2">Продано</th>
          <th class="py-2">Выручка</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="sale in salesData" :key="sale.id" class="border-b last:border-b-0">
          <td class="text-center border-r py-2">{{ sale.id }}</td>
          <td class="text-center border-r py-2">{{ sale.machine.number }}</td>
          <td class="text-center border-r py-2">{{ sale.machine.name }}</td>
          <td class="text-center border-r py-2 sold">{{ sale.balance }}</td>
          <td class="text-center py-2">{{ sale.revenue.toFixed(2) }}</td>
        </tr>
      </tbody>
      <tfoot>
        <tr class="bg-gray-200">
          <th class="py-2">Всего:</th>
          <th class="py-2"></th>
          <th class="py-2"></th>
          <th class="py-2 sold-total">{{ totalSold }}</th>
          <th class="py-2">{{ totalRevenue.toFixed(2) }}</th>
        </tr>
      </tfoot>
    </table>

    <!-- Графики -->
    <div class="chart-container mt-8 grid grid-cols-2 gap-8">
      <div class="chart bg-blue-100 h-64 rounded shadow-md flex items-center justify-center">
        График 1
      </div>
      <div class="chart bg-blue-100 h-64 rounded shadow-md flex items-center justify-center">
        График 2
      </div>
    </div>
  </main>
</template>

<script setup>
import { ref, computed } from 'vue'
import HeaderComponent from '@/components/HeaderComponent.vue'

// Пример данных о продажах
const salesData = ref([
  { id: 1, machine: { number: '001', name: 'Автомат 1' }, balance: 10, revenue: 500.0 },
  { id: 2, machine: { number: '002', name: 'Автомат 2' }, balance: 20, revenue: 1000.0 },
  { id: 3, machine: { number: '003', name: 'Автомат 3' }, balance: 15, revenue: 750.0 },
  // Другие данные...
])

// Расчет общей суммы проданных товаров
const totalSold = computed(() => {
  return salesData.value.reduce((total, sale) => total + sale.balance, 0)
})

// Расчет общей выручки
const totalRevenue = computed(() => {
  return salesData.value.reduce((total, sale) => total + sale.revenue, 0)
})
</script>

<style scoped>
.chart-container {
  display: grid;
  gap: 1rem;
}

.chart {
  background-color: #e8f0fe;
  height: 16rem;
  border-radius: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}
</style>
