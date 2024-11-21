<template>
  <form @submit.prevent="saveSettings" class="space-y-6 bg-white w-3/5 mt-20 mx-auto p-4 rounded">
    <div class="grid gap-4">
      <!-- Провайдер -->
      <div class="modal-header flex items-center justify-between">
        <h3>Настройки QR-платежей</h3>
        <button type="button" class="close" @click="$emit('close')"><CloseIcon /></button>
      </div>
      <div>
        <label for="provider" class="block text-sm font-medium text-gray-700"> Провайдер </label>
        <select
          id="provider"
          v-model="form.provider"
          class="mt-1 block w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-500"
        >
          <option value="0">KaspiPay</option>
          <option value="1">СБП (Paymaster)</option>
        </select>
      </div>

      <!-- API-ключ -->
      <div v-show="form.provider === '0'" class="grid gap-2">
        <label for="api_key" class="text-sm font-medium text-gray-700">API-ключ</label>
        <input
          id="api_key"
          v-model="form.api_key"
          type="text"
          placeholder="Введите API-ключ"
          class="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-500"
        />
      </div>

      <!-- ID торговой точки -->
      <div v-show="form.provider === '0'" class="grid gap-2">
        <label for="tradepoint_id" class="text-sm font-medium text-gray-700">
          ID торговой точки
        </label>
        <input
          id="tradepoint_id"
          v-model.number="form.tradepoint_id"
          type="number"
          placeholder="Введите ID торговой точки"
          class="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-500"
        />
      </div>

      <!-- Способы оплаты -->
      <div v-show="form.provider === '0'" class="grid gap-2">
        <label class="text-sm font-medium text-gray-700">Способы оплаты</label>
        <div class="flex flex-wrap gap-4">
          <label class="flex items-center space-x-2">
            <input
              type="checkbox"
              value="Gold"
              v-model="form.payment_methods"
              class="form-checkbox"
            />
            <span>GOLD</span>
          </label>
          <label class="flex items-center space-x-2">
            <input
              type="checkbox"
              value="Red"
              v-model="form.payment_methods"
              class="form-checkbox"
            />
            <span>RED</span>
          </label>
          <label class="flex items-center space-x-2">
            <input
              type="checkbox"
              value="Loan"
              v-model="form.payment_methods"
              class="form-checkbox"
            />
            <span>Кредит</span>
          </label>
        </div>
      </div>

      <!-- ID терминала -->
      <div v-show="form.provider === '1'" class="grid gap-2">
        <label for="pos_id" class="text-sm font-medium text-gray-700">ID терминала</label>
        <input
          id="pos_id"
          v-model="form.pos_id"
          type="text"
          placeholder="Введите ID терминала"
          class="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-500"
        />
      </div>

      <!-- Секретный ключ -->
      <div v-show="form.provider === '1'" class="grid gap-2">
        <label for="secret_key" class="text-sm font-medium text-gray-700"> Секретный ключ </label>
        <input
          id="secret_key"
          v-model="form.secret_key"
          type="text"
          placeholder="Введите секретный ключ"
          class="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-500"
        />
      </div>
    </div>

    <!-- Кнопка сохранить -->
    <div class="pt-4">
      <button type="submit" class="px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700">
        Сохранить изменения
      </button>
    </div>
  </form>
</template>

<script setup>
import { reactive } from 'vue'
import CloseIcon from '../icons/CloseIcon.vue'

// Начальные данные формы
const form = reactive({
  provider: '0', // Провайдер (KaspiPay по умолчанию)
  api_key: '',
  tradepoint_id: null,
  payment_methods: ['Gold'], // Способы оплаты (GOLD по умолчанию)
  pos_id: '',
  secret_key: '',
})

// Метод сохранения
const saveSettings = () => {
  console.log('Отправленные данные:', form)
  alert('Настройки сохранены!')
}
</script>

<style scoped>
/* Стили для чекбоксов */
.form-checkbox:checked {
  border-color: #2563eb;
  background-color: #2563eb;
}
</style>
