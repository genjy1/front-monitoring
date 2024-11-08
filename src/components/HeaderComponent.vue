<script setup>
import { onMounted, ref, watch } from 'vue'
import { useUserStore } from '@/stores/userStore'
import { useRouter } from 'vue-router'
import AccountStroke from './AccountStroke.vue'

// Подключаем хранилище пользователя
const userStore = useUserStore()
const router = useRouter()
const rotated = ref(false)

const toggleClass = () => {
  rotated.value = !rotated.value
}

// Реактивное состояние для дропдаунов
const dropdowns = ref({
  machine: false,
  goods: false,
  stats: false,
  actions: false,
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

// Загрузка данных пользователя при монтировании компонента
onMounted(async () => {
  await userStore.fetchUser()
})

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
  <header class="border-b bg-white border-gray-200 text-[#777] fixed w-full top-0">
    <div class="mx-auto my-0 w-4/5 py-4 items-center justify-between hidden sm:flex">
      <router-link
        to="/"
        class="font-semibold text-lg bg-[#6B23A7] text-white p-2 rounded-2xl border-transparent hover:bg-transparent hover:text-[#6B23A7] hover:border-[#6B23A7] transition-all ease-linear border-2"
      >
        VendShop Online
      </router-link>
      <nav class="list block">
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
              class="dropdown-list absolute left-0 mt-2 w-48 bg-white shadow-lg"
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
                <router-link to="/stats-by-days" class="block px-4 py-2 hover:bg-gray-100"
                  >Итоги по дням</router-link
                >
              </li>
              <li><a href="#" class="block px-4 py-2 hover:bg-gray-100">Инкассации</a></li>
              <hr />
              <li>
                <router-link to="/stats-proceeds" class="block px-4 py-2 hover:bg-gray-100"
                  >Распределение выручки</router-link
                >
              </li>
            </ul>
          </li>
        </ul>
      </nav>

      <div class="menu">
        <div v-if="user" class="drop-button flex items-center justify-between border-2 rounded p-2">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            class="mr-2"
          >
            <circle cx="12" cy="8" r="4" fill="#777" />
            <path d="M4 20c0-4 4-6 8-6s8 2 8 6" fill="none" stroke="#777" stroke-width="2" />
          </svg>
          <span @click="toggleDropdown('actions'), toggleClass()" class="cursor-pointer">{{
            userStore.user.user_name
          }}</span>
          <AccountStroke
            class="transition-all"
            :class="rotated === true ? 'rotate-180' : 'rotate-0'"
          />
        </div>
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
    </div>
  </header>
</template>

<style scoped>
/* Анимация для fade */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
