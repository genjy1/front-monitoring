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
          @change="emit('update:provider', form.provider)"
        >
          <option value="0">KaspiPay</option>
          <option value="1">СБП (Paymaster)</option>
        </select>
        <span v-if="errors.provider" class="text-red-500 text-xs">{{ errors.provider }}</span>
      </div>

      <!-- Настройки KaspiPay -->
      <div v-if="form.provider === '0'" class="grid gap-4">
        <TextInput
          v-model="form.api_key"
          id="api_key"
          label="API-ключ"
          placeholder="Введите API-ключ"
          required
          @input="onInput('api_key', form.api_key)"
        />
        <span v-if="errors.api_key" class="text-red-500 text-xs">{{ errors.api_key }}</span>

        <NumberInput
          v-model="form.tradepoint_id"
          id="tradepoint_id"
          label="ID торговой точки"
          placeholder="Введите ID торговой точки"
          @input="onInput('tradepoint_id', form.tradepoint_id)"
        />
        <span v-if="errors.tradepoint_id" class="text-red-500 text-xs">{{
          errors.tradepoint_id
        }}</span>

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
              @input="onInput('payment_methods', form.payment_methods)"
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
          @input="onInput('pos_id', form.pos_id)"
        />
        <span v-if="errors.pos_id" class="text-red-500 text-xs">{{ errors.pos_id }}</span>

        <TextInput
          v-model="form.secret_key"
          id="secret_key"
          label="Секретный ключ"
          placeholder="Введите секретный ключ"
          required
          @input="onInput('secret_key', form.secret_key)"
        />
        <span v-if="errors.secret_key" class="text-red-500 text-xs">{{ errors.secret_key }}</span>
      </div>
    </div>

    <!-- Кнопка "Сохранить" -->
    <div class="pt-4">
      <button
        type="submit"
        class="w-full px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700"
        :disabled="isSubmitting"
      >
        Сохранить изменения
      </button>
    </div>
  </form>
</template>

<script setup>
import { reactive, ref, onMounted, defineEmits } from 'vue'
import { useRoute } from 'vue-router'
import CloseIcon from '../icons/CloseIcon.vue'
import TextInput from '../TextInput.vue'
import NumberInput from '../NumberInput.vue'
import SwitchInput from '../SwitchInput.vue'
import axios from 'axios'

// Define the events to be emitted
const emit = defineEmits([
  'close',
  'update:provider',
  'update:api_key',
  'update:tradepoint_id',
  'update:payment_methods',
  'update:pos_id',
  'update:secret_key',
])

const route = useRoute()
const id = route.params.id

const form = ref({
  provider: '0', // KaspiPay по умолчанию
  api_key: '',
  tradepoint_id: null,
  payment_methods: ['Gold'], // По умолчанию включен GOLD
  pos_id: '',
  secret_key: '',
})

const errors = ref({
  provider: '',
  api_key: '',
  tradepoint_id: '',
  pos_id: '',
  secret_key: '',
})

const paymentMethods = [
  { value: 'Gold', label: 'GOLD' },
  { value: 'Red', label: 'RED' },
  { value: 'Loan', label: 'Кредит' },
]

const isSubmitting = ref(false)

const getSettings = async () => {
  try {
    const response = await axios.get(`/machine/${id}/settings/qr`)
    const parsedData = JSON.parse(response.data.qr_settings).qr_payments_settings

    if (parsedData === null) {
      form.value = {
        provider: '0', // Default to 'KaspiPay'
        api_key: '',
        tradepoint_id: null,
        payment_methods: ['Gold'], // Default selected payment method
        pos_id: '',
        secret_key: '',
      }
    } else {
      form.value = parsedData
    }
  } catch (error) {
    console.error('Error fetching settings:', error)
    form.value = {
      provider: '0', // Default to 'KaspiPay'
      api_key: '',
      tradepoint_id: null,
      payment_methods: ['Gold'], // Default selected payment method
      pos_id: '',
      secret_key: '',
    }
  }
}

const validateForm = () => {
  let isValid = true
  errors.value = {
    provider: '',
    api_key: '',
    tradepoint_id: '',
    pos_id: '',
    secret_key: '',
  }

  if (form.value.provider === 0) {
    if (!form.value.provider) {
      errors.value.provider = 'Пожалуйста, выберите провайдера.'
      isValid = false
    }

    if (form.value.provider === '0' && !form.value.api_key) {
      errors.value.api_key = 'API-ключ обязателен.'
      isValid = false
    }
  }

  if (form.value.provider === '0' && !form.value.tradepoint_id) {
    errors.value.tradepoint_id = 'ID торговой точки обязателен.'
    isValid = false
  }

  if (form.value.provider === '1' && !form.value.pos_id) {
    errors.value.pos_id = 'ID терминала обязателен.'
    isValid = false
  }

  if (form.value.provider === '1' && !form.value.secret_key) {
    errors.value.secret_key = 'Секретный ключ обязателен.'
    isValid = false
  }

  return isValid
}

const saveSettings = async () => {
  const qrPaymentsSettings = form.value || '{}' // Убедитесь, что это не пусто

  console.log(qrPaymentsSettings)

  try {
    const response = await axios.patch(`/machine/${id}/settings/qr/update`, {
      qr_payments_settings: qrPaymentsSettings,
    })
    console.log('Настройки обновлены:', response.data)
  } catch (error) {
    console.error('Ошибка при сохранении настроек:', error)
    alert('Произошла ошибка при сохранении.')
  }
}

onMounted(getSettings)

const onInput = (field, value) => {
  emit(`update:${field}`, value)
}
</script>

<style scoped>
/* Стили для модального окна */
.form-checkbox:checked {
  border-color: #2563eb;
  background-color: #2563eb;
}
</style>
