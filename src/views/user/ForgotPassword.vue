<script setup>
import { ref } from 'vue'
import axios from 'axios'
import SuccessComponent from '@/components/SuccessComponent.vue'

const name = ref()
const message = ref()

const forgetPassword = () => {
  axios
    .post('/forgot-password-post', { name: name.value })
    .then((response) => (message.value = response.data.message))
}
</script>
<template>
  <div class="container mx-auto mt-24 w-4/5">
    <SuccessComponent v-if="message" :message="message" @close="message = ''" />

    <h1 class="pb-3 text-2xl">Восстановление доступа</h1>
    <hr />
    <p>
      Пожалуйста, укажите ваше <span>имя пользователя</span> и нажмите кнопку "Восстановить пароль".
      <br />
      Мы пришлем письмо со ссылкой для восстановления доступа на тот адрес электронной почты,
      который вы указывали при регистрации.
    </p>
    <form @submit.prevent="forgetPassword" class="grid">
      <label for="name">Имя пользователя</label>
      <input type="text" v-model="name" name="name" id="name" class="border" />
      <hr />
      <button type="submit">Восстановить пароль</button>
      <RouterLink to="/">Назад</RouterLink>
    </form>
  </div>
</template>
