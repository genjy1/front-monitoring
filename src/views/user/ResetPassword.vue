<!-- ResetPasswordComponent.vue -->
<template>
  <div class="container mx-auto mt-24 w-4/5">
    <h1 class="pb-3 text-2xl">Сброс пароля</h1>
    <hr />
    <p>Введите новый пароль и подтвердите его.</p>
    <form @submit.prevent="resetPassword">
      <input v-model="password" type="password" placeholder="Новый пароль" required />
      <input
        v-model="password_confirmation"
        type="password"
        placeholder="Подтвердите пароль"
        required
      />
      <button type="submit">Сбросить пароль</button>
    </form>
    <p v-if="message" class="text-green-600">{{ message }}</p>
    <p v-if="error" class="text-red-600">{{ error }}</p>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import axios from 'axios'

const route = useRoute()
const password = ref('')
const password_confirmation = ref('')
const message = ref(null)
const error = ref(null)

const resetPassword = async () => {
  try {
    const response = await axios.post('/api/reset-password', {
      email: route.query.email,
      token: route.query.token,
      password: password.value,
      password_confirmation: password_confirmation.value,
    })
    message.value = 'Пароль успешно сброшен. Теперь вы можете войти с новым паролем.'
    error.value = null
  } catch (err) {
    error.value = 'Ошибка при сбросе пароля. Убедитесь, что пароль соответствует требованиям.'
    message.value = null
  }
}
</script>
