<script setup>
import axios from 'axios'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const user_name = ref('')
const password = ref('')
const router = useRouter()

const login = async () => {
  try {
    const response = await axios.post('http://127.0.0.1:8000/api/login', {
      user_name: user_name.value,
      password: password.value,
    })

    if (response.data && response.data.token) {
      console.log('Login successful:', response.data)
      // Сохранить токен или выполнить другие действия

      localStorage.setItem('token', response.data.token)

      router.push('/')
    } else {
      console.error('Invalid response data:', response)
    }
  } catch (error) {
    console.error('Login failed:', error.response || error.message)
  }
}
</script>
<template>
  <div
    class="wrapper bg-[url('https://online.vend-shop.com/images/bg_signin_large.png')] bg-top bg-no-repeat font-futura pb-[22.5rem] bg-cover"
  >
    <div class="container mx-auto my-0 w-3/4 pt-5 pb-10">
      <h1 class="uppercase text-5xl font-bold text-center text-white my-5">vendshop online</h1>
      <form @submit.prevent="login" method="POST" class="max-w-[300px] mx-auto my-0">
        <h2 class="my-2.5 text-[20px] text-center">Вход в систему</h2>
        <div class="input-group flex-col flex gap-2">
          <label for="user_name" class="sr-only">Имя пользователя</label>
          <input
            v-model="user_name"
            type="text"
            name="name"
            id="name"
            placeholder="Имя пользователя"
            required
            class="p-3 bg-white text-[#555] font-bold border"
          />

          <label for="password" class="sr-only">Пароль</label>
          <input
            v-model="password"
            type="password"
            name="password"
            id="user_password"
            placeholder="Пароль"
            required
            class="p-3 bg-white text-[#555] font-bold border"
          />

          <div class="checkbox">
            <label for="remember" class="text-sm">
              <input type="checkbox" id="remember" name="remember" />
              Запомнить меня
            </label>
          </div>

          <div class="flex flex-col">
            <button
              type="submit"
              class="bg-[#6E417E] text-lg text-white font-bold cursor-pointer max-w-[330px] px-4 py-2.5"
            >
              Войти
            </button>
          </div>

          <div class="user-actions flex flex-col">
            <a href="" class="register font-futuraBook">Регистрация</a>
            <a href="" class="forget-password font-futuraBook">Забыли пароль?</a>
          </div>

          <div class="banner-wrapper">
            <a
              href="https://vend-shop.com/kofejnja-samoobsluzhivanija-kofe-point-koffee-space/"
              class="banner-link"
            >
              <img
                src="https://vend-shop.com/image/catalog/Banner_vso/coffee-space-banner.png"
                alt="Banner"
                class="banner-img"
              />
            </a>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>
