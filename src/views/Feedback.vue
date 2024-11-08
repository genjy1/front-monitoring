<template>
  <HeaderComponent />
  <div class="container mx-auto my-0 w-4/5 mt-24">
    <h1 class="pb-4">Обратная связь</h1>
    <hr />
    <p class="py-4">
      Если у вас есть вопросы или предложения по работе сервиса или вы хотите сообщить об ошибке,
      заполните форму ниже.
      <br />
      Мы обязательно свяжемся с вами по электронной почте.
    </p>
    <hr />
    <div v-if="successMessage" class="text-green-500 my-4">{{ successMessage }}</div>
    <form @submit.prevent="submitFeedback" class="feedback-form pt-4" id="feedback">
      <div class="input-group pb-4">
        <label for="theme" class="flex flex-col gap-2 font-bold">
          Тема сообщения
          <input
            type="text"
            v-model="formData.theme"
            id="theme"
            placeholder="Тема сообщения"
            class="rounded border font-normal px-4 py-1.5"
          />
        </label>
        <p class="text-sm text-[#737373]">До 50 символов</p>
      </div>
      <div class="input-group">
        <label for="message" class="flex flex-col gap-2 font-bold">
          Текст сообщения
          <textarea
            v-model="formData.message"
            id="message"
            cols="30"
            rows="10"
            class="pt-2 pl-2 rounded border resize-none font-normal"
          ></textarea>
        </label>
      </div>
      <button type="submit" class="mt-4 bg-[#337ab7] px-4 py-2 rounded text-white font-semibold">
        Отправить
      </button>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import axios from 'axios'
import HeaderComponent from '@/components/HeaderComponent.vue'

const formData = ref({
  theme: '',
  message: '',
  user_id: null, // ID пользователя будет добавлен позже
})

const successMessage = ref('')

// Получение ID текущего пользователя (если доступно через API или передается через props)
formData.value.user_id = null // Установите нужный ID или получите его динамически

const submitFeedback = async () => {
  try {
    const response = await axios.post('/api/feedback', formData.value)
    successMessage.value = response.data.message || 'Сообщение отправлено успешно'
    formData.value.theme = ''
    formData.value.message = ''
  } catch (error) {
    console.error('Ошибка при отправке сообщения:', error)
  }
}
</script>

<style scoped>
/* Добавьте стили при необходимости */
</style>
