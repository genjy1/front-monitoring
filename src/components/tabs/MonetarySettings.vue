<template>
  <form @submit.prevent="saveSettings()" class="space-y-6">
    <div class="grid gap-6 border rounded-xl py-3">
      <!-- Номиналы купюр -->
      <TableComponent title="Номиналы купюр" :items="bills" @update:itemState="updateBillState" />

      <!-- Номиналы монет -->
      <TableComponent title="Номиналы монет" :items="coins" @update:itemState="updateCoinState" />

      <!-- Кнопка сохранить -->
      <div class="pt-4">
        <button
          type="submit"
          :disabled="isLoading"
          :class="[
            'py-3 mx-4 px-[5.41rem] sm:px-[12.75rem] text-white font-medium rounded-md transition duration-200',
            isHovered ? 'bg-blue-700' : 'bg-blue-600',
            'focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed',
          ]"
          @mouseover="isHovered = true"
          @mouseleave="isHovered = false"
        >
          {{ isLoading ? 'Сохранение...' : 'Сохранить изменения' }}
        </button>
        <p v-if="saveMessage" class="text-green-500 text-center">{{ saveMessage }}</p>
      </div>
    </div>
  </form>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import TableComponent from '../monetary/TableComponent.vue' // Импортируем компонент таблицы
import axios from 'axios'
import { useRoute } from 'vue-router'

// Состояние для кнопки "Сохранить изменения"
const isHovered = ref(false)
const isLoading = ref(false)
const saveMessage = ref('')

// Данные для номиналов купюр
const bills = reactive([
  { value: 10, enabled: false },
  { value: 50, enabled: false },
  { value: 100, enabled: false },
  { value: 500, enabled: false },
  { value: 1000, enabled: false },
  { value: 200, enabled: false },
  { value: 2000, enabled: false },
])

// Данные для номиналов монет
const coins = reactive([
  { value: 1, enabled: false },
  { value: 2, enabled: false },
  { value: 5, enabled: false },
  { value: 10, enabled: false },
])

// Обновляем состояние для купюр
const updateBillState = ({ index, value }) => {
  bills[index].enabled = value
}

// Обновляем состояние для монет
const updateCoinState = ({ index, value }) => {
  coins[index].enabled = value
}

// Функция для фильтрации значений
const filterEnabledValues = (list) => list.filter((item) => item.enabled).map((item) => item.value)

const route = useRoute()
const id = route.params.id

const getSettings = async () => {
  try {
    const response = await axios.get(`/machine/${id}/settings`)

    // Извлекаем данные для номиналов купюр и монет
    const gottenBills = response.data.bills.bills
    const gottenCoins = response.data.bills.coins

    // Обновляем массивы bills и coins, сохраняя оба значения (value и enabled)
    bills.splice(
      0,
      bills.length,
      ...gottenBills.map((bill) => ({
        value: bill.value,
        enabled: bill.enabled ?? false, // Если нет свойства enabled, устанавливаем его как false
      })),
    )

    coins.splice(
      0,
      coins.length,
      ...gottenCoins.map((coin) => ({
        value: coin.value,
        enabled: coin.enabled ?? true, // Если нет свойства enabled, устанавливаем его как true
      })),
    )
  } catch (error) {
    console.error('Ошибка при получении настроек:', error)
  }
}

const saveSettings = async () => {
  // Подготовка данных, которые будут отправлены на сервер
  const settingsData = {
    bills: bills.map((bill) => ({ value: bill.value, enabled: bill.enabled })),
    coins: coins.map((coin) => ({ value: coin.value, enabled: coin.enabled })),
  }

  try {
    // Отправка PATCH-запроса с данными
    const response = await axios.patch(`/machine/${id}/settings/bills`, settingsData)

    Object.assign(bills, response.data.bills.bills)
    Object.assign(coins, response.data.bills.coins)
  } catch (error) {
    // Обработка ошибок
    console.error('Ошибка при сохранении настроек:', error)
  }
}

onMounted(() => {
  getSettings()
})
</script>
