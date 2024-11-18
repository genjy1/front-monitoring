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
      // console.log('Login successful:', response.data)
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
    class="wrapper bg-no-repeat font-futura bg-[url('src/assets/login_image.jpg')] bg-cover h-full pt-8 pb-[11.05rem]"
  >
    <div
      class="container mx-auto bg-white my-0 w-4/5 px-8 py-8 grid grid-rows-1 sm:grid-cols-2 sm:gap-16 gap-4 sm:h-[45,46rem] rounded-3xl"
    >
      <div class="form-container h-full order-2 sm:order-1">
        <form @submit.prevent="login" method="POST">
          <h2 class="text-[20px] text-center mb-8">Вход в систему</h2>
          <div class="input-group grid grid-rows-4 gap-4 sm:gap-16 items-center">
            <div class="input-group">
              <label for="user_name" class="sr-only">Имя пользователя</label>
              <input
                v-model="user_name"
                type="text"
                name="name"
                id="name"
                placeholder="Имя пользователя"
                required
                class="p-3 bg-white text-[#555] font-bold border-2 border-[#6B23A7] rounded-lg w-full outline-none"
              />
            </div>
            <div class="input-group">
              <label for="password" class="sr-only">Пароль</label>
              <input
                v-model="password"
                type="password"
                name="password"
                id="user_password"
                placeholder="Пароль"
                required
                class="p-3 bg-white text-[#555] font-bold border-2 border-[#6B23A7] rounded-lg w-full outline-none"
              />
            </div>

            <div class="btn-wrapper">
              <button
                type="submit"
                class="bg-[#6E417E] text-lg text-white font-bold cursor-pointer px-4 py-2.5 rounded-md w-full"
              >
                Войти
              </button>
            </div>

            <div class="user-actions flex justify-between">
              <RouterLink to="register" class="register">Регистрация</RouterLink>
              <RouterLink to="forget-password" class="forget-password font-futuraBook"
                >Забыли пароль?</RouterLink
              >
            </div>

            <div class="banner-wrapper flex justify-around">
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
      <div
        class="image-container bg-[url('/src/assets/login_image.jpg')] bg-no-repeat bg-center bg-cover w-full sm:mt-0 mt-2 rounded-xl h-[150px] sm:h-full order-1 sm:order-2"
      ></div>
    </div>
  </div>
</template>
<style scoped>
html {
  overflow-y: hidden;
}
</style>
