<template>
  <HeaderComponent />
  <div class="container requisites-container mt-24 w-4/5 mx-auto my-0">
    <h1 class="pb-4 text-2xl">Редактирование реквизитов организации</h1>
    <hr class="pb-4" />
    <p class="pb-4">Здесь вы можете изменить реквизиты</p>

    <div class="requisites">
      <SuccessComponent v-if="successMessage" :message="successMessage" />
      <ErrorComponent v-if="errors.length" :errors="errors" />

      <form
        @submit.prevent="submitForm"
        class="form form-horizontal form-requisites flex flex-col gap-4"
      >
        <div class="form-group flex-group flex flex-col">
          <label for="paymentAccount" class="requisites-label">Номер расч. счёта</label>
          <input
            type="text"
            id="paymentAccount"
            v-model="form.paymentAccount"
            placeholder="Номер расчетного счета"
            class="form-control requisites-control border px-4 py-2"
            required
          />
        </div>

        <div class="form-group flex-group flex flex-col">
          <label for="correspondingAccount" class="requisites-label">Номер корр. счёта</label>
          <input
            type="text"
            id="correspondingAccount"
            v-model="form.correspondingAccount"
            placeholder="Номер корреспондентского счета"
            class="form-control requisites-control border px-4 py-2"
            required
          />
        </div>

        <div class="form-group flex-group flex flex-col">
          <label for="BIK" class="requisites-label">Введите БИК</label>
          <input
            type="text"
            id="BIK"
            v-model="form.BIK"
            placeholder="Банковский идентификационный код"
            class="form-control requisites-control border px-4 py-2"
            required
          />
        </div>

        <div class="form-group flex-group flex flex-col">
          <label for="bankName" class="requisites-label">Наименование банка</label>
          <input
            type="text"
            id="bankName"
            v-model="form.bankName"
            placeholder="Полное наименование банка"
            class="form-control requisites-control border px-4 py-2"
            required
          />
        </div>

        <div class="form-group flex-group flex flex-col">
          <label for="INN" class="requisites-label">Введите свой ИНН</label>
          <input
            type="text"
            id="INN"
            v-model="form.INN"
            placeholder="ИНН"
            class="form-control requisites-control border px-4 py-2"
            required
          />
        </div>

        <div class="form-group">
          <button class="px-4 py-2 bg-[#6B23A7] text-white rounded" type="submit">
            Отправить реквизиты
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import axios from 'axios'
import SuccessComponent from '@/components/SuccessComponent.vue'
import ErrorComponent from '@/components/ErrorMessageComponent.vue'
import HeaderComponent from '@/components/HeaderComponent.vue'

const form = ref({
  paymentAccount: '',
  correspondingAccount: '',
  BIK: '',
  bankName: '',
  INN: '',
})
const successMessage = ref('')
const errors = ref([])

const submitForm = async () => {
  try {
    const response = await axios.post(`/api/requisites/${userId}`, form.value)
    successMessage.value = 'Реквизиты успешно отправлены!'
    errors.value = []
    // Очистка формы, если необходимо
    Object.keys(form.value).forEach((key) => (form.value[key] = ''))
  } catch (error) {
    errors.value = error.response?.data?.errors || ['Ошибка при отправке данных']
    successMessage.value = ''
  }
}
</script>

<style scoped>
/* Добавьте стили, если необходимо */
</style>
