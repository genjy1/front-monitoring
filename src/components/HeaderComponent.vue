<script setup>
import { onMounted, ref, watch } from 'vue'
import { useUserStore } from '@/stores/userStore'
import { useRouter } from 'vue-router'
import AccountStroke from './icons/AccountStroke.vue'
import Preloader from './Preloader.vue'
import ProfileIcon from './icons/ProfileIcon.vue'

// Подключаем хранилище пользователя
const userStore = useUserStore()
const router = useRouter()
const rotated = ref(false)
const isOpen = ref(false)

const toggleClass = () => {
  rotated.value = !rotated.value
}

const openBurgerMenu = () => {
  isOpen.value = !isOpen.value
}

// Реактивное состояние для дропдаунов
const dropdowns = ref({
  machine: false,
  goods: false,
  stats: false,
  actions: false,
})

// Добавим асинхронный вызов для загрузки данных пользователя
onMounted(async () => {
  if (!userStore.user) {
    await userStore.fetchUser() // вызовите метод для загрузки данных
  }
})

const logout = async () => {
  await userStore.logout() // Вызов действия logout из Pinia
  router.push('/login') // Перенаправление на страницу входа
}

// Реактивное состояние для имени пользователя, начальное значение null
const user = ref(null)

// Функция для переключения дропдаунов
const toggleDropdown = (dropdown) => {
  dropdowns.value[dropdown] = !dropdowns.value[dropdown]
}

// Наблюдатель, чтобы обновить имя пользователя при изменении данных в хранилище
watch(
  () => userStore.user,
  (newUser) => {
    user.value = newUser
  },
  { immediate: true },
)
</script>
<template>
  <header class="border-b bg-white border-gray-200 text-[#777] w-full top-0 fixed">
    <div class="mx-auto my-0 w-4/5 py-4 items-center justify-between flex">
      <router-link
        to="/"
        class="font-semibold text-lg bg-[#6B23A7] text-white p-2 rounded-2xl border-transparent hover:bg-transparent hover:text-[#6B23A7] hover:border-[#6B23A7] transition-all ease-linear border-2"
      >
        VendShop Online
      </router-link>
      <nav class="list hidden sm:block">
        <ul class="nav-list gap-5 flex">
          <li class="relative">
            <button @click="toggleDropdown('machine')" class="dropdown-nav flex items-center">
              Автоматы
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5 text-gray-400 transition dropdown-icon"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fill-rule="evenodd"
                  d="M5.23 7.21a.75.75 0 011.06-.02L10 10.358l3.71-3.149a.75.75 0 111.02 1.096l-4.24 3.6a.75.75 0 01-.99 0l-4.24-3.6a.75.75 0 01-.02-1.06z"
                  clip-rule="evenodd"
                />
              </svg>
            </button>
            <ul
              v-if="dropdowns.machine"
              class="dropdown-list absolute left-0 w-48 bg-white shadow-lg"
            >
              <li>
                <router-link
                  to="/machine-state"
                  class="block px-4 py-2 text-right hover:bg-gray-100"
                  >Состояние автоматов</router-link
                >
              </li>
              <li>
                <router-link to="/" class="block px-4 py-2 text-left hover:bg-gray-100"
                  >Список автоматов</router-link
                >
              </li>
            </ul>
          </li>
          <li class="relative">
            <button @click="toggleDropdown('goods')" class="dropdown-nav flex items-center">
              Товары
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5 text-gray-400"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fill-rule="evenodd"
                  d="M5.23 7.21a.75.75 0 011.06-.02L10 10.358l3.71-3.149a.75.75 0 111.02 1.096l-4.24 3.6a.75.75 0 01-.99 0l-4.24-3.6a.75.75 0 01-.02-1.06z"
                  clip-rule="evenodd"
                />
              </svg>
            </button>
            <ul
              v-if="dropdowns.goods"
              class="dropdown-list absolute left-0 mt-2 w-48 bg-white shadow-lg"
            >
              <li>
                <router-link to="/goods-state" class="block px-4 py-2 hover:bg-gray-100"
                  >Состояние загрузки</router-link
                >
              </li>
              <li>
                <router-link to="/goods-list" class="block px-4 py-2 hover:bg-gray-100"
                  >Список товаров</router-link
                >
              </li>
            </ul>
          </li>
          <li class="relative">
            <router-link to="/sales" class="hover:after:w-full">Журнал продаж</router-link>
          </li>
          <li class="relative">
            <button @click="toggleDropdown('stats')" class="dropdown-nav flex items-center">
              Статистика
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5 text-gray-400"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fill-rule="evenodd"
                  d="M5.23 7.21a.75.75 0 011.06-.02L10 10.358l3.71-3.149a.75.75 0 111.02 1.096l-4.24 3.6a.75.75 0 01-.99 0l-4.24-3.6a.75.75 0 01-.02-1.06z"
                  clip-rule="evenodd"
                />
              </svg>
            </button>
            <ul
              v-if="dropdowns.stats"
              class="dropdown-list absolute left-0 mt-2 w-48 bg-white shadow-lg"
            >
              <li>
                <router-link to="/stats" class="block px-4 py-2 hover:bg-gray-100"
                  >Общая статистика</router-link
                >
              </li>
              <li>
                <router-link to="/stats/by-days" class="block px-4 py-2 hover:bg-gray-100"
                  >Итоги по дням</router-link
                >
              </li>
              <li>
                <router-link to="/stats/collections" class="block px-4 py-2 hover:bg-gray-100"
                  >Инкассации</router-link
                >
              </li>
              <hr />
              <li>
                <router-link to="/stats/proceeds" class="block px-4 py-2 hover:bg-gray-100"
                  >Распределение выручки</router-link
                >
              </li>
            </ul>
          </li>
        </ul>
      </nav>

      <div class="menu hidden sm:block">
        <button
          v-if="user"
          class="drop-button flex items-center justify-between border-2 rounded p-2 cursor-pointer"
          @click="toggleDropdown('actions'), toggleClass()"
        >
          <ProfileIcon />
          <span class="cursor-pointer">{{ userStore.user.user_name }}</span>
          <AccountStroke
            class="transition-all ml-2 -mr-1"
            :class="rotated === true ? 'rotate-180' : 'rotate-0'"
          />
        </button>
        <Preloader v-else />
        <div class="dropdown absolute" v-show="dropdowns.actions">
          <transition name="fade">
            <ul class="relative top-[1.1rem] p-2 border right-[10.3rem] bg-white">
              <li class="w-full text-nowrap p-1">
                <RouterLink
                  v-if="userStore.user"
                  :to="{
                    name: 'user.edit',
                    path: 'user/:id/edit',
                    params: { id: userStore.user.id },
                  }"
                  >Редактировать данные пользователя</RouterLink
                >
              </li>
              <li class="w-full text-wrap p-1">
                <RouterLink
                  v-if="userStore.user"
                  :to="{
                    name: 'user.requisites',
                    path: 'user/:id/requisites/',
                    params: { id: userStore.user.id },
                  }"
                  >Редактировать реквизиты</RouterLink
                >
              </li>
              <li class="w-full text-nowrap p-1">
                <RouterLink to="/feedback">Обратная связь</RouterLink>
              </li>
              <li class="w-full text-nowrap p-1">
                <button v-if="userStore.user" @click="logout">Выйти</button>
              </li>
            </ul>
          </transition>
        </div>
      </div>

      <div class="burger grid-row-3 grid sm:hidden gap-1 rounded-xl" @click="openBurgerMenu">
        <span class="w-8 block bg-purple-800 h-1"></span>
        <span class="w-8 block bg-purple-800 h-1"></span>
        <span class="w-8 block bg-purple-800 h-1"></span>
      </div>
      <transition name="fade">
        <div
          v-show="isOpen"
          :class="[
            'sm:hidden',
            'h-[50rem]',
            'bg-white',
            'burger-menu',
            '-top-[4.55rem]',
            'absolute',
            'w-full',
          ]"
        >
          <nav class="list sm:hidden relative top-[5.8rem] bg-white h-full right-10">
            <div
              class="logo-wrapper mx-auto my-0 w-4/5 flex items-center pb-4 border-b border-b-[#6323A7]"
            >
              <img src="/logo.svg" alt="Logo Vendshop" class="logo w-32" />
              <div
                class="w-6 h-6 flex flex-col justify-center items-center absolute right-12"
                @click="openBurgerMenu"
              >
                <div class="w-full h-0.5 bg-[#6323A7] transform rotate-45 relative top-0.5"></div>
                <div class="w-full h-0.5 bg-[#6323A7] transform -rotate-45 relative"></div>
              </div>
            </div>
            <ul class="nav-list gap-5 mx-auto mt-4 w-4/5 grid">
              <li class="relative">
                <button @click="toggleDropdown('machine')" class="dropdown-nav flex items-center">
                  Автоматы
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-5 w-5 text-gray-400 transition dropdown-icon"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M5.23 7.21a.75.75 0 011.06-.02L10 10.358l3.71-3.149a.75.75 0 111.02 1.096l-4.24 3.6a.75.75 0 01-.99 0l-4.24-3.6a.75.75 0 01-.02-1.06z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </button>
                <ul v-if="dropdowns.machine" class="dropdown-list w-48 bg-white">
                  <li>
                    <router-link to="/machine-state" class="block py-2 hover:bg-gray-100"
                      >Состояние автоматов</router-link
                    >
                  </li>
                  <li>
                    <router-link to="/" class="block py-2 hover:bg-gray-100"
                      >Список автоматов</router-link
                    >
                  </li>
                </ul>
              </li>
              <li class="relative">
                <button @click="toggleDropdown('goods')" class="dropdown-nav flex items-center">
                  Товары
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-5 w-5 text-gray-400"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M5.23 7.21a.75.75 0 011.06-.02L10 10.358l3.71-3.149a.75.75 0 111.02 1.096l-4.24 3.6a.75.75 0 01-.99 0l-4.24-3.6a.75.75 0 01-.02-1.06z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </button>
                <ul v-if="dropdowns.goods" class="dropdown-list w-48 bg-white">
                  <li>
                    <router-link to="/goods-state" class="block py-2 hover:bg-gray-100"
                      >Состояние загрузки</router-link
                    >
                  </li>
                  <li>
                    <router-link to="/goods-list" class="block py-2 hover:bg-gray-100"
                      >Список товаров</router-link
                    >
                  </li>
                </ul>
              </li>
              <li class="relative">
                <router-link to="/sales" class="hover:after:w-full">Журнал продаж</router-link>
              </li>
              <li class="relative">
                <button @click="toggleDropdown('stats')" class="dropdown-nav flex items-center">
                  Статистика
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-5 w-5 text-gray-400"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M5.23 7.21a.75.75 0 011.06-.02L10 10.358l3.71-3.149a.75.75 0 111.02 1.096l-4.24 3.6a.75.75 0 01-.99 0l-4.24-3.6a.75.75 0 01-.02-1.06z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </button>
                <ul v-if="dropdowns.stats" class="dropdown-list w-48 bg-white">
                  <li>
                    <router-link to="/stats" class="block py-2 hover:bg-gray-100"
                      >Общая статистика</router-link
                    >
                  </li>
                  <li>
                    <router-link to="/stats/by-days" class="block py-2 hover:bg-gray-100"
                      >Итоги по дням</router-link
                    >
                  </li>
                  <li>
                    <router-link to="/stats/collections" class="block py-2 hover:bg-gray-100"
                      >Инкассации</router-link
                    >
                  </li>
                  <li>
                    <router-link to="/stats/proceeds" class="block py-2 hover:bg-gray-100"
                      >Распределение выручки</router-link
                    >
                  </li>
                </ul>
              </li>
              <button v-if="user" class="drop-button flex flex-col gap-2">
                <span @click="toggleDropdown('actions'), toggleClass()" class="cursor-pointer flex">{{
                  userStore.user.user_name
                }}
                                <AccountStroke
                  class="transition-all"
                  :class="rotated === true ? 'rotate-180' : 'rotate-0'"
                />
                </span>
                <transition name="fade">
                <div class="dropdown" v-show="dropdowns.actions">
                  <ul class="bg-white text-left grid grid-rows-4">
                    <li class="w-full text-nowrap">
                      <RouterLink
                        v-if="userStore.user"
                        :to="{
                          name: 'user.edit',
                          path: 'user/:id/edit',
                          params: { id: userStore.user.id },
                        }"
                        class="py-2"
                        >Редактировать данные пользователя</RouterLink

                      class="py-2"  >
                    </li>
                    <li class="w-full text-wrap">
                      <RouterLink
                        v-if="userStore.user"
                        :to="{
                          name: 'user.requisites',
                          path: 'user/:id/requisites/',
                          params: { id: userStore.user.id },
                        }"

                        class="py-2">Редактировать реквизиты</RouterLink
                      >
                    </li>
                    <li class="w-full text-nowrap">
                      <RouterLink to="/feedback"
                      class="py-2">Обратная связь</RouterLink>
                    </li>
                    <li class="w-full text-nowrap">
                      <button v-if="userStore.user" @click="logout" class="py-2">Выйти</button>
                    </li>
                  </ul>
                </div>
              </transition>
              </button>
            </ul>
          </nav>
        </div>
      </transition>
    </div>
  </header>
</template>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
