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
          <Input :model-value="form.paymentAccount" id="paymentAccount" input-type="text" />
        </div>

        <div class="form-group flex-group flex flex-col">
          <label for="correspondingAccount" class="requisites-label">Номер корр. счёта</label>
          <Input
            :model-value="form.correspondingAccount"
            id="correspondingAccount"
            input-type="text"
          />
        </div>

        <div class="form-group flex-group flex flex-col">
          <label for="BIK" class="requisites-label">Введите БИК</label>
          <Input :model-value="form.BIK" id="BIK" input-type="text" />
        </div>

        <div class="form-group flex-group flex flex-col">
          <label for="bankName" class="requisites-label">Наименование банка</label>
          <Input :model-value="form.bankName" id="bankName" input-type="text" />
        </div>

        <div class="form-group flex-group flex flex-col">
          <label for="INN" class="requisites-label">Введите свой ИНН</label>
          <Input :model-value="form.INN" id="bankName" input-type="text" />
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
import Input from '@/components/Input.vue'

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
