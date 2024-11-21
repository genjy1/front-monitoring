<template>
  <HeaderComponent />
  <div class="container requisites-container mt-24 w-4/5 mx-auto my-0">
    <h1 class="pb-4 text-2xl">Редактирование реквизитов организации</h1>
    <hr class="pb-4" />
    <p class="pb-4">Здесь вы можете изменить реквизиты</p>

    <div class="requisites">
      <SuccessComponent v-if="successMessage" :message="successMessage" @close="message = ''" />
      <ErrorComponent v-if="errors.length" :errors="errors" />

      <form
        @submit.prevent="submitForm"
        class="form form-horizontal form-requisites flex flex-col gap-4"
        v-if="requisites"
      >
        <div class="form-group flex-group flex flex-col">
          <label for="paymentAccount" class="requisites-label">Номер расч. счёта</label>
          <Input v-model="form.paymentAccount" id="paymentAccount" input-type="text" />
          <span v-if="formErrors.paymentAccount" class="text-red-500">
            {{ formErrors.paymentAccount }}
          </span>
        </div>

        <div class="form-group flex-group flex flex-col">
          <label for="correspondingAccount" class="requisites-label">Номер корр. счёта</label>
          <Input v-model="form.correspondingAccount" id="correspondingAccount" input-type="text" />
          <span v-if="formErrors.correspondingAccount" class="text-red-500">
            {{ formErrors.correspondingAccount }}
          </span>
        </div>

        <div class="form-group flex-group flex flex-col">
          <label for="BIK" class="requisites-label">Введите БИК</label>
          <Input v-model="form.BIK" id="BIK" input-type="text" />
          <span v-if="formErrors.BIK" class="text-red-500">{{ formErrors.BIK }}</span>
        </div>

        <div class="form-group flex-group flex flex-col">
          <label for="bankName" class="requisites-label">Наименование банка</label>
          <Input v-model="form.bankName" id="bankName" input-type="text" />
          <span v-if="formErrors.bankName" class="text-red-500">{{ formErrors.bankName }}</span>
        </div>

        <div class="form-group flex-group flex flex-col">
          <label for="INN" class="requisites-label">Введите свой ИНН</label>
          <Input
            v-model="form.INN"
            id="INN"
            v-model:model-value="requisites.INN"
            input-type="text"
          />
          <span v-if="formErrors.INN" class="text-red-500">{{ formErrors.INN }}</span>
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
import { onMounted, ref, watchEffect } from 'vue'
import axios from 'axios'
import SuccessComponent from '@/components/messages/SuccessComponent.vue'
import ErrorComponent from '@/components/messages/ErrorMessageComponent.vue'
import HeaderComponent from '@/components/HeaderComponent.vue'
import Input from '@/components/forms/Input.vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const requisites = ref({})

const form = ref({
  paymentAccount: '',
  correspondingAccount: '',
  BIK: '',
  bankName: '',
  INN: '',
  user_id: route.params.id,
})
const successMessage = ref('')
const errors = ref([])
const formErrors = ref({}) // Для ошибок валидации формы

// Метод валидации
const validateForm = () => {
  const newErrors = {}

  if (!form.value.paymentAccount) {
    newErrors.paymentAccount = 'Поле "Номер расч. счёта" обязательно для заполнения.'
  }
  if (!form.value.correspondingAccount) {
    newErrors.correspondingAccount = 'Поле "Номер корр. счёта" обязательно для заполнения.'
  }
  if (!form.value.BIK) {
    newErrors.BIK = 'Поле "БИК" обязательно для заполнения.'
  }
  if (!form.value.bankName) {
    newErrors.bankName = 'Поле "Наименование банка" обязательно для заполнения.'
  } else if (form.value.bankName.length > 150) {
    newErrors.bankName = 'Максимальная длина поля "Наименование банка" — 150 символов.'
  }
  if (!form.value.INN) {
    newErrors.INN = 'Поле "ИНН" обязательно для заполнения.'
  } else if (!/^\d+$/.test(form.value.INN)) {
    newErrors.INN = 'Поле "ИНН" должно содержать только цифры.'
  }

  formErrors.value = newErrors
  return Object.keys(newErrors).length === 0
}

// Метод отправки данных
const submitForm = async () => {
  if (!validateForm()) {
    return
  }

  try {
    const response = await axios.post(`/user/${route.params.id}/requisites/create`, form.value)
    successMessage.value = 'Реквизиты успешно отправлены!'
    errors.value = []
    formErrors.value = {}

    requisites.value = response.data

    // Очистка формы
    Object.keys(form.value).forEach((key) => (form.value[key] = ''))
  } catch (error) {
    errors.value = error.response?.data?.errors || ['Ошибка при отправке данных']
    successMessage.value = ''
  }
}

onMounted(async () => {
  try {
    const response = await axios.get(`/user/${route.params.id}/requisites/`)
    requisites.value = response.data

    // Заполняем форму
    form.value = {
      paymentAccount: requisites.value.paymentAccount || '',
      correspondingAccount: requisites.value.correspondingAccount || '',
      BIK: requisites.value.BIK || '',
      bankName: requisites.value.bankName || '',
      INN: requisites.value.INN || '',
      user_id: route.params.id,
    }
  } catch (error) {
    errors.value = ['Ошибка загрузки данных с сервера']
    requisites.value = {} // Обнуляем requisites для предотвращения ошибок
  }
})
</script>

<style scoped>
.text-red-500 {
  color: #f00;
  font-size: 0.875rem;
}
</style>
