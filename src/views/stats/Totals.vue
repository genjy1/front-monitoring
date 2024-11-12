<template>
  <HeaderComponent />
  <main class="main mx-auto mt-24 w-4/5">
    <h1 class="text-2xl">Распределение выручки</h1>
    <hr class="my-4" />
    <table class="table-auto w-full border">
      <thead>
        <tr class="bg-[#eee] border-b-2">
          <th class="py-2">#</th>
          <th class="py-2">Номер</th>
          <th class="py-2">Имя автомата</th>
          <th class="py-2">Продано</th>
          <th class="py-2">Выручка</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="sale in salesData" :key="sale.id" class="border-b last-of-type:border-b-none">
          <td class="text-center border-r py-2">{{ sale.id }}</td>
          <td class="text-center border-r py-2">{{ sale.machine.number }}</td>
          <td class="text-center border-r py-2">{{ sale.machine.name }}</td>
          <td class="text-center border-r py-2 sold">{{ sale.balance }}</td>
          <td class="text-center py-2">{{ sale.revenue }}</td>
        </tr>
      </tbody>
      <tfoot>
        <tr class="bg-[#eee]">
          <th class="py-2">Всего:</th>
          <th class="py-2"></th>
          <th class="py-2"></th>
          <th class="py-2 sold-total">{{ totalSold }}</th>
          <th class="py-2">{{ totalRevenue }}</th>
        </tr>
      </tfoot>
    </table>
    <div class="chart-container">
      <div class="chart"></div>
      <div class="chart"></div>
    </div>
  </main>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import HeaderComponent from '@/components/HeaderComponent.vue'

// Состояние для данных о продажах
const salesData = ref([
  { id: 1, machine: { number: '001', name: 'Машина 1' }, balance: 10, revenue: 1000 },
  { id: 2, machine: { number: '002', name: 'Машина 2' }, balance: 15, revenue: 1500 },
  { id: 3, machine: { number: '003', name: 'Машина 3' }, balance: 20, revenue: 2000 },
])

// Вычисленные значения для сумм
const totalSold = computed(() => salesData.value.reduce((acc, sale) => acc + sale.balance, 0))
const totalRevenue = computed(() => salesData.value.reduce((acc, sale) => acc + sale.revenue, 0))

// Инициализация графиков или других взаимодействий
onMounted(() => {
  // Здесь можно инициализировать графики, например, с помощью Chart.js или других библиотек
  console.log('Графики будут инициализированы')
})
</script>
