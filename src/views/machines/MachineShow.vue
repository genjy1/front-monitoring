<template>
  <div>
    <HeaderComponent />
    <div class="container mt-24 mx-auto my-0 w-4/5">
      <!-- Условие, чтобы подождать загрузки данных -->
      <transition name="fade" mode="out-in">
        <div v-if="machine">
          <h1>Автомат #{{ machine.id }}</h1>
        </div>
        <!-- Сообщение, пока данные загружаются -->
        <p v-else>Загрузка данных...</p>
      </transition>
    </div>
  </div>
</template>

<script setup>
import HeaderComponent from '@/components/HeaderComponent.vue'
import axios from 'axios'
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const machine = ref() // Устанавливаем начальное значение null

onMounted(async () => {
  try {
    const response = await axios.get(`http://127.0.0.1:8000/api/machine/${route.params.id}`)
    machine.value = response.data // Заполняем данные после получения ответа
  } catch (error) {
    console.error('Ошибка при загрузке данных машины:', error)
  }
})
</script>
