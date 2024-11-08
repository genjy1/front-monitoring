<template>
  <div>
    <HeaderComponent />
    <div class="container mt-24 mx-auto my-0 w-4/5">
      <!-- Условие, чтобы подождать загрузки данных -->
      <div v-if="machine" class="w-2/5">
        <ViewHeader class="border-b mb-2" :text="machineHeader" />
        <!-- v-if="machine.status !== 'Online'" -->
        <ErrorMessageComponent
          v-if="machine.status !== 'Online'"
          :text="'Нет связи с автоматом. Удаленное управление недоступно'"
        />
        <p>
          Основные сведения об автомате. <br />
          Вы можете изменить некоторые поля и нажать "Сохранить", чтобы запомнить изменения.
          Некоторые функции могут быть доступны только в режиме "Online".
        </p>
        <ul class="py-2">
          <li class="border-y py-2 flex">
            <span class="w-[186px] block"> ID автомата</span><span>{{ machine.id }}</span>
          </li>
          <li class="border-b py-2 flex">
            <span class="w-[186px] block">ID контроллера </span
            ><span>{{ machine.controller_id }}</span>
          </li>
          <li class="border-b py-2 flex">
            <span class="w-[186px] block">Версия ПО </span
            ><span>{{ machine.software_version }}</span>
          </li>
          <li class="border-b py-2 flex">
            <span class="w-[186px] block">Подписка действует до </span
            ><span>{{ machine.subscription_until }}</span>
          </li>
          <li class="border-b py-2 flex">
            <span class="w-[186px] block">Статус </span>
            <span :class="machine.status === 'Online' ? 'text-green-800' : 'text-red-800'">{{
              machine.status
            }}</span>
          </li>
          <li class="border-b py-2 flex">
            <span class="w-[186px] block">Текущие ошибки </span><span>{{ machine.errors }}</span>
          </li>
          <li class="border-b py-2 flex">
            <span class="w-[186px] block">Состояние </span><span>{{ machine.condition }}</span>
          </li>
          <li class="border-b py-2 flex">
            <span class="w-[186px] block">Дата и время запуска </span
            ><span>{{ machine.created_at }}</span>
          </li>
          <li class="border-b py-2 flex">
            <span class="w-[186px] block">Текущий баланс </span><span>{{ machine.balance }}</span>
          </li>
          <li class="border-b py-2 flex">
            <span class="w-[186px] block">Номер автомата </span><span>{{ machine.number }}</span>
          </li>
          <li class="border-b py-2 flex">
            <span class="w-[186px] block">Имя автомата </span><span>{{ machine.name }}</span>
          </li>
          <li class="border-b py-2 flex">
            <span class="w-[186px] block">Адрес </span><span>{{ machine.address }}</span>
          </li>
        </ul>
      </div>
      <!-- Сообщение, пока данные загружаются -->
      <Preloader v-else class="relative left-[50%] mt-96" />
    </div>
  </div>
</template>

<script setup>
import HeaderComponent from '@/components/HeaderComponent.vue'
import axios from 'axios'
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import ErrorMessageComponent from '@/components/ErrorMessageComponent.vue'
import Preloader from '@/components/Preloader.vue'
import ViewHeader from '@/components/ViewHeader.vue'

const route = useRoute()
const machine = ref(false)
const machineHeader = ref()

onMounted(async () => {
  try {
    const response = await axios.get(`http://127.0.0.1:8000/api/machine/${route.params.id}`)
    machine.value = response.data // Заполняем данные после получения ответа
  } catch (error) {
    console.error('Ошибка при загрузке данных машины:', error)
  } finally {
    machineHeader.value = `Автомат #${machine.value.id}`
  }
})
</script>
