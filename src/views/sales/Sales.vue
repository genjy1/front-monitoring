<script setup>
import HeaderComponent from '@/components/HeaderComponent.vue'
import ViewHeader from '@/components/ViewHeader.vue'
import TableComponent from '@/components/TableComponent.vue'
import { onMounted, ref } from 'vue'
import axios from 'axios'

const cells = []
const thead = ['№ автомата', 'Дата и время', 'Принято денег', 'Выдано сдачи', 'Товары', 'Выручка']
const sales = ref(null)

onMounted(async () => {
  const response = await axios.get('http://127.0.0.1:8000/api/sales?page=2')
  sales.value = response.data
})

const salesHeader = 'Журнал продаж'
</script>
<template>
  <HeaderComponent />
  <div class="container mt-24 mx-auto w-4/5">
    <ViewHeader :text="salesHeader" />
    <hr class="my-2" />
    <TableComponent :theader="thead" :data="sales" />
  </div>
  <table></table>
</template>
