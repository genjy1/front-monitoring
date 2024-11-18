<script setup>
import HeaderComponent from '@/components/HeaderComponent.vue'
import ViewHeader from '@/components/ViewHeader.vue'
import TableComponent from '@/components/TableComponent.vue'
import { onMounted, ref } from 'vue'
import axios from 'axios'

const thead = ['№ автомата', 'Дата и время', 'Принято денег', 'Выдано сдачи', 'Товары', 'Выручка']
const sales = ref(null)

onMounted(async () => {
  if (!sales.value) {
    const response = await axios.get('http://127.0.0.1:8000/api/sales?page=1')
    sales.value = response.data
  }
})

const salesHeader = 'Журнал продаж'
</script>
<template>
  <HeaderComponent />
  <div class="container mt-24 mx-auto w-4/5">
    <ViewHeader :text="salesHeader" />
    <hr class="mt-2 mb-6" />
    <TableComponent :theader="thead" :data="sales" />
    <div v-if="sales" v-for="sale in sales.data">
      <div class="sm:hidden grid grid-rows-6 gap-z border border-black mb-4 rounded-3xl p-4">
        <p class="flex justify-between">
          <span># автомата</span><span>{{ sale.id || '-' }}</span>
        </p>
        <p class="flex justify-between">
          <span>Дата и время</span><span>{{ sale.dateTime || '-' }}</span>
        </p>
        <p class="flex justify-between">
          <span>Принято денег</span><span>{{ sale.balance || '-' }}</span>
        </p>
        <p class="flex justify-between">
          <span>Выдано сдачи</span><span>{{ sale.cashGiven || '-' }}</span>
        </p>
        <p class="flex justify-between">
          <span>Товары</span><span>{{ sale.products || '-' }}</span>
        </p>
        <p class="flex justify-between">
          <span>Выручка</span><span>{{ sale.revenue || '-' }}</span>
        </p>
      </div>
    </div>
  </div>
</template>
