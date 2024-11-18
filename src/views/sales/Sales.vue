<script setup>
import HeaderComponent from '@/components/HeaderComponent.vue'
import ViewHeader from '@/components/ViewHeader.vue'
import TableComponent from '@/components/TableComponent.vue'
import { onMounted, ref, watch } from 'vue'
import axios from 'axios'
import Pagination from '@/components/Pagination.vue'

const thead = ['№ автомата', 'Дата и время', 'Принято денег', 'Выдано сдачи', 'Товары', 'Выручка']
const sales = ref(null)
const counter = ref(1) // Default page set to 1
const links = ref()

// Function to update page and refetch data
const onPageChange = async (url) => {
  const page = new URL(url).searchParams.get('page') || 1
  counter.value = page
  await fetchSalesData() // Fetch data after changing page
}

// Fetch sales data based on the current page
const fetchSalesData = async () => {
  const response = await axios.get(`http://127.0.0.1:8000/api/sales?page=${counter.value}`)
  sales.value = response.data
  links.value = response.data.links
}

// Watch counter value and refetch data when it changes
watch(counter, async (newCounter) => {
  await fetchSalesData()
})

onMounted(() => {
  fetchSalesData() // Initial data fetch when component mounts
})

const salesHeader = 'Журнал продаж'
</script>

<template>
  <HeaderComponent />
  <div class="container mt-24 mx-auto w-4/5">
    <ViewHeader :text="salesHeader" />
    <hr class="mt-2 mb-6" />
    <TableComponent :theader="thead" :data="sales" />
    <div v-if="sales" v-for="sale in sales.data" :key="sale.id">
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
    <Pagination :links="links" @page-change="onPageChange" />
  </div>
</template>
