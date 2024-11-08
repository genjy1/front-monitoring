<template>
  <div>
    <HeaderComponent />
    <div class="container mt-24 mx-auto my-0 w-4/5">
      <!-- Условие, чтобы подождать загрузки данных -->
      <div v-if="machine" class="w-2/5">
        <h1>Автомат #{{ machine.id }}</h1>
        <!-- v-if="machine.status !== 'Online'" -->
        <ErrorMessageComponent
          v-if="machine.status !== 'Online'"
          :text="'Нет связи с автоматом. Удаленное управление недоступно'"
        />
        <ul>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
        </ul>
      </div>
      <!-- Сообщение, пока данные загружаются -->
      <Preloader v-else />
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

const route = useRoute()
const machine = ref()

onMounted(async () => {
  try {
    const response = await axios.get(`http://127.0.0.1:8000/api/machine/${route.params.id}`)
    machine.value = response.data // Заполняем данные после получения ответа
  } catch (error) {
    console.error('Ошибка при загрузке данных машины:', error)
  }
})
</script>
