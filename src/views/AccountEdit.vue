<template>
  <HeaderComponent />
  <div>
    <h1 class="pb-4 text-2xl">Редактирование профиля</h1>
    <hr class="pb-4" />
    <p>Здесь вы можете изменить данные вашего аккаунта</p>

    <!-- Обновление ФИО -->
    <div class="actions-wrapper pt-4 flex-col flex gap-4">
      <form @submit.prevent="updateFio" class="flex flex-col gap-2 border-b pb-4">
        <label for="fio" class="font-bold">ФИО (организация)</label>
        <input type="text" v-model="user.fio" id="fio" class="border rounded px-4 py-2" />
        <button type="submit" class="border rounded sm:max-w-[90px] text-sm py-2">Изменить</button>
      </form>

      <!-- Обновление имени пользователя -->
      <form @submit.prevent="updateUserName" class="flex flex-col gap-2 border-b pb-4">
        <label for="user_name" class="font-bold">Имя пользователя:</label>
        <input
          type="text"
          v-model="user.user_name"
          id="user_name"
          class="border rounded px-4 py-2"
        />
        <button type="submit" class="border rounded sm:max-w-[90px] text-sm py-2">Изменить</button>
        <p>От 2 до 64 символов, можно использовать буквы латинского алфавита (a-Z) и цифры</p>
      </form>

      <!-- Обновление email -->
      <form @submit.prevent="updateEmail" class="flex flex-col gap-2 border-b pb-4">
        <label for="user_email" class="font-bold">Email</label>
        <input
          type="email"
          v-model="user.user_email"
          id="user_email"
          class="border rounded px-4 py-2"
        />
        <button type="submit" class="border rounded sm:max-w-[90px] text-sm py-2">Изменить</button>
      </form>

      <!-- Обновление временной зоны -->
      <form @submit.prevent="updateTimezone" class="flex flex-col gap-2 border-b pb-4">
        <label for="user_tz" class="font-bold">Временная зона</label>
        <select v-model="user.user_tz" id="user_tz" class="border rounded px-4 py-2">
          <option v-for="tz in timezones" :key="tz" :value="tz">{{ tz }}</option>
        </select>
        <button type="submit" class="border rounded sm:max-w-[90px] text-sm py-2">Изменить</button>
      </form>

      <!-- Обновление пароля -->
      <form @submit.prevent="updatePassword" class="flex flex-col gap-2 border-b pb-4">
        <label for="password" class="font-bold">Изменение пароля</label>
        <input
          type="password"
          v-model="user.password"
          id="password"
          class="border rounded px-4 py-2"
        />
        <button type="submit" class="border rounded sm:max-w-[90px] text-sm py-2">Изменить</button>
      </form>

      <!-- Если роль администратора, доступно обновление роли -->
      <div v-if="user.role === 'admin'">
        <form @submit.prevent="updateRole" class="flex flex-col gap-2 border-b pb-4">
          <label for="role" class="flex flex-col">
            Роль
            <input type="text" v-model="user.role" id="role" class="border rounded px-4 py-2" />
          </label>
          <button type="submit" class="border rounded mx-auto my-0 max-w-[300px] px-4 py-2">
            Отправить
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import HeaderComponent from '@/components/HeaderComponent.vue'
import { ref } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'

// Состояние пользователя и временные зоны
const user = ref({
  id: 1, // Это будет динамично, например, можно брать из глобального состояния
  fio: '',
  user_name: '',
  user_email: '',
  user_tz: '',
  password: '',
  role: '',
})

const timezones = 'тимезонес))'

// Создаем экземпляр роутера для навигации (если нужно)
const router = useRouter()

// Метод для отправки запроса
const sendUpdateRequest = async (url, data) => {
  try {
    const response = await axios.patch(url, data)
    console.log(response.data.message)
  } catch (error) {
    console.error('Ошибка при обновлении данных:', error)
  }
}

// Обновление ФИО
const updateFio = async () => {
  await sendUpdateRequest(`/user/${user.value.id}/update/fio`, { fio: user.value.fio })
}

// Обновление имени пользователя
const updateUserName = async () => {
  await sendUpdateRequest(`/user/${user.value.id}/update/name`, { user_name: user.value.user_name })
}

// Обновление email
const updateEmail = async () => {
  await sendUpdateRequest(`/user/${user.value.id}/update/email`, {
    user_email: user.value.user_email,
  })
}

// Обновление временной зоны
const updateTimezone = async () => {
  await sendUpdateRequest(`/user/${user.value.id}/update/Tz`, { user_tz: user.value.user_tz })
}

// Обновление пароля
const updatePassword = async () => {
  await sendUpdateRequest(`/user/${user.value.id}/update/password`, {
    password: user.value.password,
  })
}

// Обновление роли
const updateRole = async () => {
  await sendUpdateRequest(`/user/${user.value.id}/update/role`, { role: user.value.role })
}
</script>

<style scoped>
/* Добавьте нужные стили для вашего компонента */
</style>
