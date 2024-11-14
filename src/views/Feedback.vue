<template>
  <HeaderComponent />
  <div class="container mx-auto my-0 w-4/5 mt-24">
    <h1 class="pb-4 text-2xl font-medium">Обратная связь</h1>
    <hr class="border-[#6B23A7]" />
    <p class="py-4">
      Если у вас есть вопросы или предложения по работе сервиса или вы хотите сообщить об ошибке,
      заполните форму ниже.
      <br />
      Мы обязательно свяжемся с вами по электронной почте.
    </p>
    <hr class="border-[#6B23A7]" />
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
            class="rounded border font-normal px-4 py-1.5 transition-all ease-in-out border-[#6B23A7] focus:border-[#8230da] focus:outline-none focus:ring-2 focus:ring-[#6223A7]"
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
            class="pt-2 pl-2 mb-4 rounded border resize-none font-normal transition-all ease-in-out border-[#6B23A7] focus:border-[#8230da] focus:outline-none focus:ring-2 focus:ring-[#6223A7]"
          ></textarea>
        </label>
      </div>
      <SubmitButton inner-text="Отправить" />
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import axios from 'axios'
import HeaderComponent from '@/components/HeaderComponent.vue'
import { useUserStore } from '@/stores/userStore'
import { onMounted } from 'vue'
import SubmitButton from '@/components/SubmitButton.vue'

const userStore = useUserStore()

onMounted(async () => {
  await userStore.fetchUser()
  // Получение ID текущего пользователя
  formData.value.user_id = userStore.user.id
})

const formData = ref({
  theme: '',
  message: '',
  user_id: null, // ID пользователя будет добавлен позже
})

const successMessage = ref('')

const submitFeedback = async () => {
  try {
    const response = await axios.post('/feedback', formData.value)
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
