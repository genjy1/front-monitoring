<template>
  <form
    @submit.prevent="saveSettings"
    class="space-y-6 bg-white w-full max-w-lg mt-20 mx-auto p-6 rounded shadow-lg"
  >
    <!-- Заголовок модального окна -->
    <div class="flex items-center justify-between">
      <h3 class="text-xl font-semibold">Настройки QR-платежей</h3>
      <button type="button" @click="$emit('close')" class="text-gray-500 hover:text-gray-700">
        <CloseIcon />
      </button>
    </div>

    <div class="grid gap-4">
      <!-- Выбор провайдера -->
      <div>
        <label for="provider" class="block text-sm font-medium text-gray-700">Провайдер</label>
        <select
          id="provider"
          v-model="form.provider"
          class="mt-1 block w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-500"
        >
          <option value="0">KaspiPay</option>
          <option value="1">СБП (Paymaster)</option>
        </select>
      </div>

      <!-- Настройки KaspiPay -->
      <div v-if="form.provider === '0'" class="grid gap-4">
        <TextInput
          v-model="form.api_key"
          id="api_key"
          label="API-ключ"
          placeholder="Введите API-ключ"
          required
        />
        <NumberInput
          v-model="form.tradepoint_id"
          id="tradepoint_id"
          label="ID торговой точки"
          placeholder="Введите ID торговой точки"
        />

        <!-- Способы оплаты -->
        <fieldset>
          <legend class="text-sm font-medium text-gray-700">Способы оплаты</legend>
          <div class="flex flex-wrap gap-4">
            <SwitchInput
              v-for="method in paymentMethods"
              :key="method.value"
              :value="method.value"
              :label="method.label"
              v-model="form.payment_methods"
            />
          </div>
        </fieldset>
      </div>

      <!-- Настройки Paymaster -->
      <div v-if="form.provider === '1'" class="grid gap-4">
        <TextInput
          v-model="form.pos_id"
          id="pos_id"
          label="ID терминала"
          placeholder="Введите ID терминала"
          required
        />
        <TextInput
          v-model="form.secret_key"
          id="secret_key"
          label="Секретный ключ"
          placeholder="Введите секретный ключ"
          required
        />
      </div>
    </div>

    <!-- Кнопка "Сохранить" -->
    <div class="pt-4">
      <button
        type="submit"
        class="w-full px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700"
      >
        Сохранить изменения
      </button>
    </div>
  </form>
</template>

<script setup>
import { reactive } from 'vue'
import CloseIcon from '../icons/CloseIcon.vue'
import TextInput from '../TextInput.vue'
import NumberInput from '../NumberInput.vue'
import SwitchInput from '../SwitchInput.vue'

// Данные формы
const form = reactive({
  provider: '0', // KaspiPay по умолчанию
  api_key: '',
  tradepoint_id: null,
  payment_methods: ['Gold'], // По умолчанию включен GOLD
  pos_id: '',
  secret_key: '',
})

// Опции способов оплаты
const paymentMethods = [
  { value: 'Gold', label: 'GOLD' },
  { value: 'Red', label: 'RED' },
  { value: 'Loan', label: 'Кредит' },
]

// Сохранение настроек
const saveSettings = () => {
  console.log('Отправленные данные:', form)
  alert('Настройки сохранены!')
}
</script>

<style scoped>
/* Стили для модального окна */
.form-checkbox:checked {
  border-color: #2563eb;
  background-color: #2563eb;
}
</style>
