<script setup>
import { ref } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'

const router = useRouter()

// Список всех часовых поясов
const timezones = Intl.supportedValuesOf('timeZone')

// Объект для хранения данных пользователя
const user = ref({
  fio: '',
  user_name: '',
  email: '',
  password: '',
  password_confirmation: '',
  tz: '',
})

// Переменная для сообщения об успехе или ошибке
const message = ref(null)

// Функция регистрации
const register = async () => {
  try {
    const response = await axios.post('/register', user.value) // URL можно изменить в зависимости от API
    console.log('Registration successful:', response.data)

    // Успешное сообщение и редирект на страницу входа
    message.value = 'Регистрация прошла успешно. Пожалуйста, войдите.'
    setTimeout(() => {
      message.value = null
      router.push('/login')
    }, 3000)
  } catch (error) {
    // Обработка ошибки
    console.error('Registration failed:', error.response.data)
    message.value = error.response.data.message || 'Произошла ошибка при регистрации'
  }
}
</script>

<template>
  <div class="wrapper w-screen h-screen">
    <div class="container mx-auto mb-0 w-2/5 pt-24">
      <div class="form-container">
        <h1 class="text-3xl mb-4">Регистрация аккаунта</h1>
        <h2 class="text-lg mb-8">Введите свои данные для получения доступа к сервису</h2>

        <!-- Сообщение об успехе или ошибке -->
        <div v-if="message" class="alert mb-4">
          {{ message }}
        </div>

        <form @submit.prevent="register" class="grid grid-rows-3">
          <div class="user-data grid grid-cols-2 gap-4">
            <div class="input-group mb-4">
              <label for="full_name" class="mb-2 block">ФИО</label>
              <input
                v-model="user.fio"
                type="text"
                id="full_name"
                class="border-2 border-transparent focus:outline-none rounded px-4 py-2 w-full bg-[#E8F0FE]"
                required
              />
            </div>

            <div class="input-group mb-4">
              <label for="user_name" class="mb-2 block">Имя пользователя</label>
              <input
                v-model="user.user_name"
                type="text"
                id="user_name"
                class="border-2 border-transparent focus:outline-none rounded px-4 py-2 w-full bg-[#E8F0FE]"
                required
              />
            </div>
          </div>

          <div class="input-group mb-4">
            <label for="email" class="mb-2 block">Электронная почта</label>
            <input
              v-model="user.email"
              type="email"
              id="email"
              class="border-2 border-transparent focus:outline-none rounded px-4 py-2 w-full bg-[#E8F0FE]"
              required
            />
          </div>

          <div class="input-group mb-4">
            <label for="tz" class="mb-2 block">Часовой пояс</label>
            <select
              v-model="user.user_tz"
              id="tz"
              class="border-2 border-transparent focus:outline-none rounded px-4 py-2 w-full bg-[#E8F0FE]"
              required
            >
              <option :value="tz" v-for="tz in timezones" :key="tz">{{ tz }}</option>
            </select>
          </div>

          <div class="input-group mb-4">
            <label for="password" class="mb-2 block">Пароль</label>
            <input
              v-model="user.password"
              type="password"
              id="password"
              class="border-2 border-transparent focus:outline-none rounded px-4 py-2 w-full bg-[#E8F0FE]"
              required
            />
          </div>

          <div class="input-group mb-6">
            <label for="password_confirmation" class="mb-2 block">Повторите пароль</label>
            <input
              v-model="user.password_confirmation"
              type="password"
              id="password_confirmation"
              class="border-2 border-transparent focus:outline-none rounded px-4 py-2 w-full bg-[#E8F0FE]"
              required
            />
          </div>

          <button
            type="submit"
            class="py-2 px-4 rounded w-full transition duration-300 bg-blue-600 hover:bg-blue-700 text-white"
          >
            Зарегистрироваться
          </button>
          <div class="flex items-center my-6">
            <div class="flex-grow border-t border-gray-500"></div>
            <span class="px-4">Или</span>
            <div class="flex-grow border-t border-gray-500"></div>
          </div>
          <RouterLink
            to="/login"
            class="text-center border border-blue-600 rounded py-2 px-4 hover:border-transparent hover:bg-blue-700 hover:text-white transition-all ease-linear"
            >Войти</RouterLink
          >
        </form>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Дополнительные стили можно добавить здесь */
.alert {
  padding: 1rem;
  background-color: #d1e7dd;
  color: #0f5132;
  border: 1px solid #badbcc;
  border-radius: 5px;
}
</style>
