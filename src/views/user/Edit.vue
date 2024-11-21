<template>
  <HeaderComponent />
  <div class="mt-24 mx-auto w-4/5" v-if="userStore.user">
    <transition name="fade">
      <success-component
        v-if="successMessage"
        :message="successMessage"
        @close="successMessage = ''"
      />
    </transition>
    <h1 class="pb-4 text-2xl">Редактирование профиля</h1>
    <hr class="pb-4" />
    <p>Здесь вы можете изменить данные вашего аккаунта</p>

    <!-- Обновление ФИО -->
    <div class="actions-wrapper pt-4 grid grid-rows-1 gap-6">
      <form @submit.prevent="updateFio" class="grid sm:grid-cols-4 gap-2">
        <label for="fio" class="font-bold">ФИО (организация)</label>
        <EditInput :model-value="user.fio" :id="'fio'" input-type="text" />
        <SubmitButton inner-text="Изменить" class="sm:max-w-[144px]" />
      </form>

      <!-- Обновление имени пользователя -->
      <form @submit.prevent="updateUserName">
        <div class="form-group grid grid-rows-2">
          <div
            class="input-group sm:items-center justify-between sm:grid flex flex-col sm:grid-cols-4 gap-2"
          >
            <label for="user_name" class="font-bold">Имя пользователя:</label>
            <EditInput :model-value="user.user_name" :id="'user_name'" input-type="text" />
            <SubmitButton inner-text="Изменить" class="sm:max-w-[144px]" />
          </div>
          <div class="sub-wrapper sm:mt-auto mt-12">
            <p>От 2 до 64 символов, можно использовать буквы латинского алфавита (a-Z) и цифры</p>
          </div>
        </div>
      </form>

      <!-- Обновление email -->
      <form @submit.prevent="updateEmail" class="grid sm:grid-cols-4 gap-2">
        <label for="user_email" class="font-bold">Email</label>
        <EditInput :model-value="user.email" :id="'user_email'" input-type="email" />
        <SubmitButton inner-text="Изменить" class="sm:max-w-[144px]" />
      </form>

      <!-- Обновление временной зоны -->
      <form @submit.prevent="updateTimezone" class="grid sm:grid-cols-4 gap-2">
        <label for="user_tz" class="font-bold outline-none">Временная зона</label>
        <select
          v-model="user.user_tz"
          id="user_tz"
          class="border-2 border-[#6323A7] rounded px-4 py-2"
        >
          <option v-for="tz in timezones" :key="tz" :value="tz">{{ tz }}</option>
        </select>
        <SubmitButton inner-text="Изменить" class="sm:max-w-[144px]" />
      </form>

      <!-- Обновление пароля -->
      <form @submit.prevent="updatePassword" class="grid sm:grid-cols-4 gap-2">
        <label for="password" class="font-bold">Изменение пароля</label>
        <EditInput :model-value="user.password" :id="'password'" input-type="password" />
        <SubmitButton inner-text="Изменить" class="sm:max-w-[144px]" />
      </form>

      <!-- Если роль администратора, доступно обновление роли -->
      <div v-if="user.role === 'admin'">
        <form @submit.prevent="updateRole" class="flex items-center gap-2 border-b pb-4">
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
import { onMounted, ref, computed } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/userStore'
import SubmitButton from '@/components/forms/SubmitButton.vue'
import EditInput from '@/components/forms/Input.vue'
import SuccessComponent from '@/components/messages/SuccessComponent.vue'

const userStore = useUserStore()
const successMessage = ref('')
const timezones = Intl.supportedValuesOf('timeZone')
// Create a computed property to keep `user` reactive and tied to `userStore.user`
const user = computed(() => userStore.user || {})

// Fetch the user data when the component mounts
onMounted(async () => {
  await userStore.fetchUser()
})

// Create a router instance (if navigation is required)
const router = useRouter()

// Method to send an update request
const sendUpdateRequest = async (url, data) => {
  try {
    const response = await axios.patch(url, data)
    successMessage.value = response.data.message
    console.log(response.data.message)
  } catch (error) {
    console.error('Ошибка при обновлении данных:', error)
  }
}

// Update methods for each form field
const updateFio = async () => {
  await sendUpdateRequest(`/user/${user.value.id}/update/fio`, { fio: user.value.fio })
}
const updateUserName = async () => {
  await sendUpdateRequest(`/user/${user.value.id}/update/name`, { user_name: user.value.user_name })
}
const updateEmail = async () => {
  await sendUpdateRequest(`/user/${user.value.id}/update/email`, {
    user_email: user.value.user_email,
  })
}
const updateTimezone = async () => {
  await sendUpdateRequest(`/user/${user.value.id}/update/Tz`, { user_tz: user.value.user_tz })
}
const updatePassword = async () => {
  await sendUpdateRequest(`/user/${user.value.id}/update/password`, {
    password: user.value.password,
  })
}
const updateRole = async () => {
  await sendUpdateRequest(`/user/${user.value.id}/update/role`, { role: user.value.role })
}
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
