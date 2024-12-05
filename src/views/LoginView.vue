<script setup>
import axios from 'axios'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import ViewPasswordIcon from '@/components/icons/ViewPasswordIcon.vue'
import HidePasswordIcon from '@/components/icons/HidePasswordIcon.vue'
import Preloader from '@/components/Preloader.vue'
import CloseIcon from '@/components/icons/CloseIcon.vue'

const user_name = ref('')
const password = ref('')
const router = useRouter()
const errors = ref({
  user_name: '',
}) // Исправлено: ошибки как объект
const isHidden = ref(true) // Контроль отображения пароля
const isAnimating = ref(false) // Анимация кнопки
const isSubmitting = ref(false) // Состояние загрузки

const login = async () => {
  isSubmitting.value = true
  errors.value = {} // Очищаем ошибки перед новой отправкой
  try {
    const response = await axios.post('/login', {
      user_name: user_name.value,
      password: password.value,
    })

    if (response.data && response.data.token) {
      localStorage.setItem('token', response.data.token)
      router.push('/')
    } else {
      console.error('Invalid response data:', response)
    }
  } catch (error) {
    if (error.response && error.response.data && error.response.data.message) {
      errors.value.user_name = error.response.data.message // Записываем ошибки
    } else {
      console.error('Error during login:', error)
    }
  } finally {
    isSubmitting.value = false // Сбрасываем состояние загрузки
  }
}

const closeErrorMessages = () => {
  errors.value.user_name = ''
}

const togglePasswordVisibility = () => {
  isHidden.value = !isHidden.value
  isAnimating.value = true
  setTimeout(() => (isAnimating.value = false), 300)
}
</script>

<template>
  <div
    class="wrapper bg-no-repeat font-futura bg-[url('src/assets/login_image.jpg')] bg-cover h-full pt-8 pb-28"
  >
    <div
      class="container mx-auto bg-white mt-20 my-0 w-4/5 px-8 py-8 grid grid-rows-1 sm:grid-cols-2 sm:gap-16 gap-4 sm:h-[45,46rem] rounded-3xl"
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
                id="name"
                placeholder="Имя пользователя"
                required
                class="p-3 bg-white text-[#555] border-2 border-[#6B23A7] rounded-lg w-full outline-none"
              />
            </div>
            <div
              class="error-wrapper text-red-600 font-medium border-2 border-white bg-gradient-to-t from-white to-[#ffedec] top-4 fixed w-3/5 left-1/2 transform -translate-x-1/2 py-4 px-2 rounded grid grid-cols-3 items-center justify-between shadow-lg"
              v-if="errors.user_name"
            >
              <div class="error-icon text-red-600 border-2 rounded-full border-red-500 w-8 h-8">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="size-6 relative top-0.5 left-0.5"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z"
                  />
                </svg>
              </div>
              <span class="error-text">
                {{ errors.user_name }}
              </span>
              <button class="close-btn" @click="closeErrorMessages">
                <CloseIcon />
              </button>
            </div>

            <!-- Поле пароля -->
            <div class="input-group h-[52px] relative">
              <label for="password" class="sr-only">Пароль</label>
              <input
                v-model="password"
                :type="isHidden ? 'password' : 'text'"
                id="user_password"
                placeholder="Пароль"
                required
                class="p-3 bg-white text-[#555] border-2 border-[#6B23A7] rounded-lg w-full outline-none"
              />
              <button
                type="button"
                @click="togglePasswordVisibility"
                class="icon-wrapper absolute bottom-2 left-[92%] hover:cursor-pointer h-8 w-8 flex items-center justify-center transition-transform duration-300"
                :class="{ 'scale-110': isAnimating }"
              >
                <ViewPasswordIcon v-if="isHidden" class="w-6 h-6 text-gray-500" />
                <HidePasswordIcon v-else class="w-6 h-6 text-gray-500" />
              </button>
            </div>

            <!-- Кнопка входа с preloader -->
            <div class="btn-wrapper transition-all">
              <button
                type="submit"
                class="relative bg-[#6E417E] text-lg text-white font-bold cursor-pointer px-4 py-2.5 rounded-md w-full flex justify-center items-center"
                :disabled="isSubmitting"
              >
                <!-- Preloader -->
                <span v-if="isSubmitting" class="flex items-center">
                  <Preloader class="w-6 h-6 mr-2" />
                  Загрузка...
                </span>
                <!-- Текст кнопки -->
                <span v-else>Войти</span>
              </button>
            </div>

            <!-- Ссылки на регистрацию и восстановление пароля -->
            <div class="user-actions flex justify-between">
              <RouterLink to="register" class="register">Регистрация</RouterLink>
              <RouterLink to="forget-password" class="forget-password font-futuraBook"
                >Забыли пароль?</RouterLink
              >
            </div>

            <!-- Баннер -->
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
<style>
html {
  overflow: hidden;
}
</style>
