<template>
  <div>
    <HeaderComponent />
    <div class="container mt-24 mx-auto my-0 w-4/5">
      <h1 class="pb-2 text-2xl flex justify-between items-center">
        {{ fio }}
        <RouterLink to="attach" class="text-sm bg-[#286090] px-4 py-2 rounded text-white"
          >Привязать автомат</RouterLink
        >
      </h1>
      <hr />
      <h2 class="py-2">Пожалуйста выберите автомат из списка:</h2>
      <div class="w-full hidden sm:block">
        <!-- Заголовок таблицы -->
        <div
          class="grid grid-cols-6 bg-[#eee] text-[#333] font-normal text-center"
          :class="machines.data ? 'rounded-t-2xl' : 'rounded-2xl'"
        >
          <div class="border-r py-4 px-2">#</div>
          <div class="border-r py-4 px-2">Статус</div>
          <div class="border-r py-4 px-2">Номер автомата</div>
          <div class="border-r py-4 px-2">IMEI / ID контроллера</div>
          <div class="border-r py-4 px-2">Имя автомата</div>
          <div class="py-4 px-2">Адрес</div>
        </div>

        <!-- Проверяем, если данные загружаются - показываем прелоадер, иначе сетку -->
        <div v-if="isLoading" class="text-center py-10">
          <Preloader />
        </div>

        <div v-else>
          <!-- Строки данных -->
          <div
            v-for="machine in machines.data"
            :key="machine.id"
            class="grid grid-cols-6 border-b items-center text-center cursor-pointer hover:bg-gray-100 border-x"
            @click="navigateToMachine(machine.id)"
          >
            <div class="border-r h-full py-2">
              <span class="relative top-2">{{ machine.id }}</span>
            </div>
            <div
              class="border-r h-full py-2"
              :class="machine.status === 'Online' ? 'text-green-800' : 'text-red-800'"
            >
              <span class="relative top-2">{{ machine.status }}</span>
            </div>
            <div class="border-r h-full py-2">
              <span class="relative top-2">{{ machine.number }}</span>
            </div>
            <div class="border-r h-full py-2">
              <span class="relative top-2">{{ machine.imei }}</span>
            </div>
            <div class="border-r h-full py-2">
              <span class="relative top-2">{{ machine.name }}</span>
            </div>
            <div class="py-2 h-full">
              <span>{{ machine.address }}</span>
            </div>
          </div>
        </div>
      </div>

      <div class="flex flex-wrap gap-4">
        <div v-if="isLoading" class="w-full flex justify-center py-10 sm:hidden">
          <Preloader />
        </div>

        <div v-else class="w-full sm:hidden">
          <div
            v-for="machine in machines.data"
            :key="machine.id"
            class="border p-4 rounded-lg shadow-md cursor-pointer hover:bg-gray-100 mb-4"
            @click="navigateToMachine(machine.id)"
          >
            <div class="text-center mb-4">
              <h3 class="text-xl font-semibold">{{ machine.name }}</h3>
              <p class="text-gray-600">{{ machine.address }}</p>
            </div>

            <div class="space-y-2">
              <div class="flex justify-between">
                <span class="font-medium">ID:</span>
                <span>{{ machine.id }}</span>
              </div>
              <div class="flex justify-between">
                <span class="font-medium">Status:</span>
                <span :class="machine.status === 'Online' ? 'text-green-800' : 'text-red-800'">
                  {{ machine.status }}
                </span>
              </div>
              <div class="flex justify-between">
                <span class="font-medium">Number:</span>
                <span>{{ machine.number }}</span>
              </div>
              <div class="flex justify-between">
                <span class="font-medium">IMEI:</span>
                <span>{{ machine.imei }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Pagination :links="links" @page-change="fetchPage" />
    </div>
  </div>
</template>

<script setup>
import HeaderComponent from '@/components/HeaderComponent.vue'
import axios from 'axios'
import { ref, onMounted, watchEffect } from 'vue'
import { useRouter } from 'vue-router'
import Preloader from '@/components/Preloader.vue'
import { useUserStore } from '@/stores/userStore'
import Pagination from '@/components/Pagination.vue'

const machines = ref([]) // Данные автоматов
const isLoading = ref(true) // Состояние загрузки
const router = useRouter()
const counter = ref(1)
const userStore = useUserStore()
const fio = ref('')

const links = ref([])
const navigateToMachine = (id) => {
  router.push({ name: 'showMachine', params: { id } }) // Передаем id через params
}
const fetchPage = async (url) => {
  if (!url) return // Защита от вызова с пустым URL
  isLoading.value = true // Включаем прелоадер
  try {
    const response = await axios.get(url)
    machines.value = response.data // Обновляем данные автоматов
    links.value = response.data.links // Обновляем ссылки пагинации
  } catch (error) {
    console.error('Ошибка при загрузке данных:', error)
  } finally {
    isLoading.value = false // Скрываем прелоадер
  }
}

watchEffect(async () => {
  // Check if userStore.user is available before trying to access userStore.user.id
  if (userStore.user && userStore.user.id) {
    const url = `http://127.0.0.1:8000/api/user/${userStore.user.id}/machines?page=${counter.value}`
    await fetchPage(url) // Fetch the data for the current page
  } else {
    console.warn('User data is not yet available')
  }
})

onMounted(async () => {
  try {
    // Fetch user data if not already fetched
    if (!userStore.user) {
      await userStore.fetchUser()
    }

    fio.value = userStore.user.fio

    // Check if the user data is available
    if (userStore.user && userStore.user.id) {
      const response = await axios.get(
        `http://127.0.0.1:8000/api/user/${userStore.user.id}/machines?page=${counter.value}`,
      )
      machines.value = response.data // Fill the machines array with the data
    } else {
      console.error('User data is not available')
    }
  } catch (error) {
    console.error('Ошибка при загрузке данных:', error)
  } finally {
    isLoading.value = false // Hide the loader after the request is finished
  }
})
</script>

<style scoped></style>
