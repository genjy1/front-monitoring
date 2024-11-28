<template>
  <HeaderComponent />
  <div class="container mx-auto mt-24 w-full lg:w-4/5 px-4">
    <!-- Заголовок -->
    <h1 class="text-3xl font-semibold mb-6">Привязка автомата</h1>

    <!-- Успех или ошибка -->
    <SuccessComponent v-if="message" :message="message" @close="message = ''" />
    <ErrorMessageComponent v-if="errorMessage" :text="errorMessage" @close="errorMessage = ''" />

    <!-- Инструкции -->
    <div class="bg-gray-50 border rounded-lg p-6 mb-6 shadow-sm">
      <p class="text-gray-700 leading-relaxed mb-4">
        Для выполнения привязки предварительно разрешите автомату подключение к сети и работу
        мониторинга. Привязка осуществляется по ID контроллера автомата и ID текущей сессии.
      </p>
      <p class="text-gray-700 mb-4">
        ID контроллера автомата выводится в меню:
        <span
          class="text-red-600 border px-2 rounded-md border-red-600 hover:bg-red-600 hover:text-white cursor-help"
          >Настройки > Автомат > Инфо > ID контроллера</span
        >.
      </p>
      <p class="text-gray-700 mb-4">
        ID текущей сессии выводится в меню:
        <span
          class="text-red-600 border px-2 rounded-md border-red-600 hover:bg-red-600 hover:text-white cursor-help"
          >Настройки > Мониторинг > Показать UID</span
        >.
      </p>
      <p class="text-gray-700">
        Обратите внимание: ID сессии <b class="text-red-500">изменится</b> сразу после перезапуска
        автомата!
      </p>
    </div>

    <!-- Форма -->
    <div class="bg-white border rounded-lg p-6 shadow-sm">
      <form @submit.prevent="attach">
        <div class="mb-4">
          <label for="controller_id" class="block font-medium text-gray-700 mb-2">
            ID контроллера
          </label>
          <input
            type="text"
            id="controller_id"
            v-model="data.controller_id"
            class="w-full border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Введите ID контроллера"
          />
          <p class="text-sm text-gray-500 mt-1">Должно содержать 8 символов.</p>
        </div>

        <div class="mb-6">
          <label for="session_id" class="block font-medium text-gray-700 mb-2"> ID сессии </label>
          <input
            type="text"
            id="session_id"
            v-model="data.session_id"
            class="w-full border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Введите ID сессии"
          />
          <p class="text-sm text-gray-500 mt-1">Должно содержать 8 символов.</p>
        </div>

        <button
          type="submit"
          class="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 focus:ring-2 focus:ring-blue-500"
        >
          Привязать
        </button>
      </form>
    </div>

    <!-- Ссылка назад -->
    <RouterLink to="/" class="block mt-6 text-blue-600 hover:underline"> Назад </RouterLink>
  </div>
</template>

<script setup>
import axios from 'axios'
import HeaderComponent from '@/components/HeaderComponent.vue'
import SuccessComponent from '@/components/messages/SuccessComponent.vue'
import ErrorMessageComponent from '@/components/messages/ErrorMessageComponent.vue'
import { ref } from 'vue'

const message = ref('')
const errorMessage = ref('')
const data = ref({
  controller_id: '',
  session_id: '',
})

const attach = async () => {
  try {
    const response = await axios.post('/attach', data.value)
    message.value = response.data.message
    data.value = { controller_id: '', session_id: '' }
  } catch (error) {
    console.warn(error)
    errorMessage.value = 'Произошла ошибка при привязке автомата. Попробуйте снова.'
  }
}
</script>

<style scoped>
/* Дополнительные улучшения */
.container {
  max-width: 800px;
}
</style>
