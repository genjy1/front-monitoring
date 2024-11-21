<template>
  <form @submit.prevent="saveSettings" class="space-y-6">
    <div class="grid gap-6 border rounded-xl py-3">
      <!-- Номиналы купюр -->
      <div class="border-b">
        <label class="block text-xl font-semibold text-gray-900 ml-4">Номиналы купюр</label>
        <table class="w-full text-sm text-left table-auto border-separate space-y-4">
          <thead>
            <tr class="border-b">
              <th class="py-2 px-4 text-gray-600">Номинал</th>
              <th class="py-2 px-4 text-gray-600">Статус</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(bill, index) in bills" :key="index" class="transition-all hover:bg-gray-50">
              <td class="py-3 px-4">{{ bill.value }}₸</td>
              <td class="py-3 px-4">
                <label class="inline-flex items-center cursor-pointer">
                  <!-- Переключатель для номиналов купюр -->
                  <input type="checkbox" v-model="bill.enabled" class="toggle-switch" />
                  <span class="ml-2 text-gray-700">{{ bill.enabled ? 'ВКЛ' : 'ВЫКЛ' }}</span>
                </label>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Номиналы монет -->
      <div>
        <label class="block text-xl font-semibold text-gray-900 ml-4">Номиналы монет</label>
        <table class="w-full text-sm text-left table-auto border-separate space-y-4">
          <thead>
            <tr class="border-b">
              <th class="py-2 px-4 text-gray-600">Номинал</th>
              <th class="py-2 px-4 text-gray-600">Статус</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(coin, index) in coins" :key="index" class="transition-all hover:bg-gray-50">
              <td class="py-3 px-4">{{ coin.value }}₸</td>
              <td class="py-3 px-4">
                <label class="inline-flex items-center cursor-pointer">
                  <!-- Переключатель для номиналов монет -->
                  <input type="checkbox" v-model="coin.enabled" class="toggle-switch" />
                  <span class="ml-2 text-gray-700">{{ coin.enabled ? 'ВКЛ' : 'ВЫКЛ' }}</span>
                </label>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Кнопка сохранить -->
      <div class="pt-4">
        <button
          type="submit"
          class="py-3 bg-blue-600 mx-4 px-[5.41rem] sm:px-[12.75rem] text-white font-medium rounded-md hover:bg-blue-700 transition duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Сохранить изменения
        </button>
      </div>
    </div>
  </form>
</template>

<script setup>
import { reactive } from 'vue'

// Начальные данные для номиналов купюр
const bills = reactive([
  { value: 10, enabled: false },
  { value: 50, enabled: true },
  { value: 100, enabled: true },
  { value: 500, enabled: false },
  { value: 1000, enabled: false },
  { value: 200, enabled: false },
  { value: 2000, enabled: false },
])

// Начальные данные для номиналов монет
const coins = reactive([
  { value: 1, enabled: true },
  { value: 2, enabled: true },
  { value: 5, enabled: true },
  { value: 10, enabled: true },
])

// Метод для сохранения данных
const saveSettings = () => {
  const settings = {
    bills: bills.filter((bill) => bill.enabled).map((bill) => bill.value),
    coins: coins.filter((coin) => coin.enabled).map((coin) => coin.value),
  }
  console.log('Сохраненные данные:', settings)
  alert('Настройки сохранены!')
}
</script>

<style scoped>
/* Стиль для переключателей */
.toggle-switch {
  appearance: none;
  width: 50px;
  height: 26px;
  background-color: #d1d5db;
  border-radius: 9999px;
  position: relative;
  transition: background-color 0.3s ease;
}

.toggle-switch:checked {
  background-color: #2563eb; /* Синий цвет для включенного состояния */
}

.toggle-switch:checked::before {
  transform: translateX(24px); /* Сдвигаем "мячик" при включении */
}

.toggle-switch::before {
  content: '';
  position: absolute;
  top: 3px;
  left: 3px;
  width: 20px;
  height: 20px;
  background-color: white;
  border-radius: 50%;
  transition: transform 0.3s ease;
}

button:hover {
  background-color: #2563eb; /* Цвет при наведении */
}

button:focus {
  outline: none;
  box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.5); /* Добавляем эффект фокуса для кнопок */
}
</style>
