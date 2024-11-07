<template>
  <div>
    <HeaderComponent />
    <div class="container mt-24 mx-auto my-0 w-4/5">
      <h1 class="pb-2 text-2xl">Сервис</h1>
      <hr />
      <h2 class="py-2">Пожалуйста выберите автомат из списка:</h2>
      <table
        class="table-auto border-collapse border-[#ddd] border w-full hidden sm:table"
        v-if="machines"
      >
        <thead>
          <tr class="border bg-[#eee] h-14 text-nowrap">
            <th class="border-r p-2 font-normal text-[#333] text-center w-24">#</th>
            <th class="border-r p-2 font-normal text-[#333] text-center w-36">Статус</th>
            <th class="border-r p-2 font-normal text-[#333] text-center">Номер автомата</th>
            <th class="border-r p-2 font-normal text-[#333] text-center">IMEI / ID контроллера</th>
            <th class="border-r p-2 font-normal text-[#333] text-center">Имя автомата</th>
            <th class="border-r p-2 font-normal text-[#333] text-center">Адрес</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="machine in machines.data"
            class="text-center row cursor-pointer hover:bg-gray-100 border-b"
            @click="navigateToMachine(machine.id)"
          >
            <td class="border-r py-2">{{ machine.id }}</td>
            <td
              class="border-r py-2"
              :class="machine.status === 'Online' ? 'text-green-800' : 'text-red-800'"
            >
              {{ machine.status }}
            </td>
            <td class="border-r py-2">{{ machine.number }}</td>
            <td class="border-r py-2">{{ machine.imei }}</td>
            <td class="border-r py-2">{{ machine.name }}</td>
            <td class="border-r py-2">{{ machine.address }}</td>
          </tr>
        </tbody>
      </table>
      <p v-else>Загрузка данных...</p>
    </div>
  </div>
</template>

<script setup>
import HeaderComponent from '@/components/HeaderComponent.vue'
import axios from 'axios'
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const machines = ref([])
const router = useRouter()

const navigateToMachine = (id) => {
  router.push({ name: 'showMachine', params: { id } }) // Передаем id через params
}

onMounted(async () => {
  try {
    const response = await axios.get('http://127.0.0.1:8000/api/machines')
    machines.value = response.data // Заполнение массива данными
  } catch (error) {
    console.error('Ошибка при загрузке данных:', error)
  }
})
</script>
<style scoped></style>
