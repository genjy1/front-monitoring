<!-- ForgotPasswordComponent.vue -->
<template>
  <div class="container mx-auto mt-24 w-4/5">
    <h1 class="pb-3 text-2xl">Восстановление пароля</h1>
    <hr />
    <p>
      Пожалуйста, укажите ваш <span>email</span> и нажмите кнопку "Отправить". Мы пришлем письмо со
      ссылкой для восстановления доступа.
    </p>
    <form @submit.prevent="sendResetLink" class="grid grid-row-3 gap-4">
      <label for="email">Email</label>
      <input
        v-model="email"
        id="email"
        type="email"
        required
        placeholder="Введите ваш email"
        class="border py-2 px-4 rounded outline-none"
      />
      <submit-button inner-text="Восстановить пароль" />
      <router-link to="/login">Назад</router-link>
    </form>
    <p v-if="message" class="text-green-600">{{ message }}</p>
    <p v-if="error" class="text-red-600">{{ error }}</p>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import axios from 'axios'
import SubmitButton from '@/components/forms/SubmitButton.vue'

const email = ref('')
const message = ref(null)
const error = ref(null)

const sendResetLink = async () => {
  try {
    const response = await axios.post('/forgot-password', { email: email.value })
    message.value = 'Ссылка для сброса пароля отправлена на ваш email.'
    error.value = null
  } catch (err) {
    error.value = 'Ошибка при отправке ссылки. Убедитесь, что email введен верно.'
    message.value = null
  }
}
</script>
