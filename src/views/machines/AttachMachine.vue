<template>
  <HeaderComponent />
  <div class="container mx-auto mt-24 w-4/5">
    <h1 class="text-2xl font-medium">Привязка автомата</h1>
    <SuccessComponent v-if="message" :message="message" @close="message = ''" />
    <ErrorMessageComponent v-if="errorMessage" :text="errorMessage" @close="text = ''" />
    <hr class="my-4" />
    <p>
      Для выполнения привязки предварительно разрешите автомату подключение к сети и работу
      <br class="pb-2" />
      мониторинга. Привязка осуществляется по ID контроллера автомата и ID текущей сессии. <br />
      ID контроллера автомата выводится в меню
      <span
        class="highlight border px-2 rounded-md border-red-600 hover:bg-red-600 hover:text-white cursor-default"
        >Настройки > Автомат > Инфо > ID контроллера</span
      >.
      <br class="pb-2" />
      ID текущей сессии выводится в меню
      <span
        class="highlight border px-2 rounded-md border-red-600 hover:bg-red-600 hover:text-white cursor-default"
        >Настройки > Мониторинг > Показать UID</span
      >.
      <br class="pb-2" />
      Обратите внимание, что ID сессии
      <b>изменится</b>
      сразу после перезапуска автомата!
    </p>
    <div class="form-wrapper">
      <form @submit.prevent="attach" class="border-y my-4 py-2">
        <div class="input-group grid grid-rows-3">
          <label for="controller_id">ID контроллера</label>
          <input
            type="text"
            name="controller_id"
            id="controller_id"
            class="border px-4 py-2 rounded"
            v-model="data.controller_id"
          />
          <p>8 символов</p>
        </div>
        <div class="input-group grid grid-rows-3">
          <label for="session_id">ID сессии</label>
          <input
            type="text"
            v-model="data.session_id"
            name="session_id"
            id="session_id"
            class="border px-4 py-2 rounded"
          />
          <p>8 символов</p>
        </div>
        <button type="submit" class="py-2 px-4 bg-[#286090] text-white rounded">Привязать</button>
      </form>
    </div>
    <RouterLink to="/">Назад</RouterLink>
  </div>
</template>
<script setup>
import axios from 'axios'
import HeaderComponent from '@/components/HeaderComponent.vue'
import SuccessComponent from '@/components/messages/SuccessComponent.vue'
import ErrorMessageComponent from '@/components/messages/ErrorMessageComponent.vue'
import { ref } from 'vue'

const message = ref('')
const errorMessage = ref('')
const data = ref({
  controller_id: '',
  session_id: '',
})

const attach = async () => {
  try {
    // Асинхронный запрос
    const response = await axios.post('/attach', data.value)
    // Установка сообщения
    message.value = response.data.message
    // Сброс данных формы
    data.value = { controller_id: '', session_id: '' }
  } catch (error) {
    console.warn(error)
    // Обработка ошибок
    errorMessage.value = error
    message.value = 'Произошла ошибка при привязке автомата. Попробуйте снова.'
  }
}
</script>
