<script setup>
import { ref } from 'vue'

const timezones = Intl.supportedValuesOf('timeZone')
const user = ref({
  tz: '', // Начальное значение должно быть пустой строкой
})

const log = () => {
  console.log('Submitted user data:', user.value)
}
</script>

<template>
  <div class="wrapper w-screen h-screen">
    <div class="container mx-auto mb-0 w-2/5 pt-24">
      <!-- Форма регистрации -->
      <div class="form-container">
        <h1 class="text-3xl mb-4">Регистрация аккаунта</h1>
        <h2 class="text-lg mb-8">Введите свои данные для получения доступа к сервису</h2>

        <form @submit.prevent="log" class="grid grid-rows-3">
          <div class="user-data grid grid-cols-2 gap-4">
            <div class="input-group mb-4">
              <label for="fio" class="mb-2 block">ФИО</label>
              <input
                type="text"
                id="fio"
                class="border-2 border-transparent focus:outline-none rounded px-4 py-2 w-full bg-[#E8F0FE]"
              />
            </div>

            <div class="input-group mb-4">
              <label for="user_name" class="mb-2 block">Имя пользователя</label>
              <input
                type="text"
                id="user_name"
                class="border-2 border-transparent focus:outline-none rounded px-4 py-2 w-full bg-[#E8F0FE]"
              />
            </div>
          </div>

          <div class="input-group mb-4">
            <label for="user_email" class="mb-2 block">Электронная почта</label>
            <input
              type="email"
              id="user_email"
              class="border-2 border-transparent focus:outline-none rounded px-4 py-2 w-full bg-[#E8F0FE]"
            />
          </div>

          <div class="input-group mb-4">
            <label for="tz" class="mb-2 block">Часовой пояс</label>
            <select
              name="user_tz"
              id="tz"
              v-model="user.tz"
              class="border-2 border-transparent focus:outline-none rounded px-4 py-2 w-full bg-[#E8F0FE]"
            >
              <option :value="tz" v-for="tz in timezones" :key="tz">{{ tz }}</option>
            </select>
          </div>

          <div class="input-group mb-4">
            <label for="user_password" class="mb-2 block">Пароль</label>
            <input
              type="password"
              id="user_password"
              class="border-2 border-transparent focus:outline-none rounded px-4 py-2 w-full bg-[#E8F0FE]"
            />
          </div>

          <div class="input-group mb-6">
            <label for="user_password_repeat" class="mb-2 block">Повторите пароль</label>
            <input
              type="password"
              id="user_password_repeat"
              class="border-2 border-transparent focus:outline-none rounded px-4 py-2 w-full bg-[#E8F0FE]"
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
/* Дополнительные стили можно добавить здесь, если нужно */
</style>
