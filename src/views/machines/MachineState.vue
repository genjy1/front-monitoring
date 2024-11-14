<template>
  <div>
    <!-- Добавляем единственный корневой элемент -->
    <HeaderComponent />
    <div class="container mt-24 mx-auto w-4/5">
      <ViewHeader :text="header" />
      <hr class="my-2" />
      <table class="hidden sm:table table-auto w-full border mt-4">
        <thead>
          <tr class="border-b bg-[#eee]">
            <th class="border-r py-2 font-normal">#</th>
            <th class="border-r py-2 font-normal">Номер</th>
            <th class="border-r py-2 font-normal">Статус</th>
            <th class="border-r py-2 font-normal">Состояние</th>
            <th class="border-r py-2 font-normal">Счётчик денег</th>
            <th class="border-r py-2 font-normal">Сдача</th>
            <th class="border-r py-2 font-normal">Баланс</th>
            <th class="border-r py-2 font-normal">Продано товаров</th>
            <th class="border-r py-2 font-normal">Выручка</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="machine in machines.data" class="border-b">
            <td class="py-2 text-center border-r">{{ machine.id }}</td>
            <td class="py-2 border-r text-center">{{ machine.number }}</td>
            <td
              class="py-2 border-r text-center"
              :class="machine.status === 'Online' ? 'text-green-800' : 'text-red-800'"
            >
              {{ machine.status }}
            </td>
            <td class="py-2 border-r text-center">{{ machine.condition }}</td>
            <td class="py-2 border-r text-center">{{ machine.cash_counter }}</td>
            <td class="py-2 border-r text-center">Cash</td>
            <td class="py-2 border-r text-center">{{ machine.balance }}</td>
            <td class="py-2 border-r text-center">{{ machine.goods_sold }}</td>
            <td class="py-2 text-center">{{ machine.goods_total }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
<script setup>
import HeaderComponent from '@/components/HeaderComponent.vue'
import ViewHeader from '@/components/ViewHeader.vue'
import { useUserStore } from '@/stores/userStore'
import axios from 'axios'
import { onMounted, ref } from 'vue'

const header = 'Состояние автоматов'
const loading = ref('Загрузка данных...')
const machines = ref([])
const userStore = useUserStore()

onMounted(async () => {
  if (!userStore.user) {
    await userStore.fetchUser() // вызовите метод для загрузки данных
  }
  const response = await axios.get(`http://127.0.0.1:8000/api/user/${userStore.user.id}/machines/`)
  machines.value = response.data
})
</script>
