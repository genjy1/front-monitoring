<template>
  <HeaderComponent />
  <div class="container requisites-container mt-24 w-4/5 mx-auto my-0">
    <h1 class="pb-4 text-2xl">Редактирование реквизитов организации</h1>
    <hr class="pb-4" />
    <p class="pb-4">Здесь вы можете изменить реквизиты</p>

    <div class="requisites flex flex-col">
      <form @submit.prevent="getBankByQuery" class="relative bank-data">
        <div class="h-[76px]">
          <label for="bankQuery" class="block mb-2 text-gray-700"> Данные о банке </label>
          <input
            id="bankQuery"
            type="text"
            v-model="bankQuery"
            placeholder="Введите название банка"
            @input="handleInput"
            class="border-2 border-purple-900 rounded px-3 py-2 w-full focus:outline-none focus:ring focus:ring-purple-300"
          />
          <CloseIcon
            class="relative z-[9999] text-purple-900 -top-[2.18rem] left-[92%] sm:left-[98%] cursor-pointer"
            @click="
              [
                (bankQuery = ''),
                (bankDataFromSuggestions.Адрес = ''),
                (bankDataFromSuggestions.БИК = ''),
                (bankDataFromSuggestions.Корреспондетский_счёт = ''),
                (bankDataFromSuggestions.Название = ''),
              ]
            "
          />

          <!-- Выпадающий список подсказок -->
          <ul
            v-if="bankSuggestions.length && bankQuery"
            class="absolute bg-white border border-gray-300 rounded mt-1 w-full max-h-40 overflow-y-auto shadow-lg z-10 top-20"
          >
            <li
              v-for="(suggest, index) in bankSuggestions"
              :key="index"
              @click="selectSuggestion(suggest.value, index)"
              @mouseover="hoveredIndex = index"
              :class="['px-3 py-2 cursor-pointer', hoveredIndex === index ? 'bg-purple-100' : '']"
            >
              {{ suggest.value }}
            </li>
          </ul>

          <div class="grid grid-rows-4 gap-4 -mt-2">
            <div
              class="label-group"
              v-for="(value, key) in bankDataFromSuggestions"
              :key="key"
              v-if="bankQuery"
            >
              <label :for="translate[key]">{{ key.replace(/_/g, ' ') }}</label>
              <input
                type="text"
                :value="value"
                disabled
                :id="translate[key]"
                :name="translate[key]"
                class="border-2 border-purple-900 rounded px-3 py-2 w-full focus:outline-none focus:ring focus:ring-purple-300"
              />
            </div>
          </div>

          <!-- Обработка загрузки -->
          <p v-if="isLoading" class="text-gray-500 mt-2">Загрузка...</p>

          <!-- Обработка ошибок -->
          <p v-if="error" class="text-red-500 mt-2">{{ error }}</p>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue'
import axios from 'axios'
import CloseIcon from '@/components/icons/CloseIcon.vue'
import HeaderComponent from '@/components/HeaderComponent.vue'

// Реактивные переменные
const bankQuery = ref('')
const bankSuggestions = ref([])
const selectedIndex = ref(0)
const bankDataFromSuggestions = reactive({
  БИК: '',
  Название: '',
  Корреспондетский_счёт: '',
  Адрес: '',
})
const translate = {
  БИК: 'bic',
  Название: 'name',
  Корреспондетский_счёт: 'correspondent_account',
  Адрес: 'address',
}
const hoveredIndex = ref(-1) // Индекс выбранного элемента
const isLoading = ref(false) // Индикатор загрузки
const error = ref('') // Сообщение об ошибке

// Получение подсказок
const getBankByQuery = async () => {
  const url = 'http://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/bank'
  const token = 'abd915c8f10e1e5daae553fa92a6b6e7e71c841b'

  const options = {
    method: 'POST',
    headers: {
      Authorization: `Token ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ query: bankQuery.value }),
  }

  try {
    const response = await fetch(url, options)
    const data = await response.json()

    bankSuggestions.value = data.suggestions
  } catch (err) {
    console.error(err)
  }
}

const getDataOfSelectedBank = () => {}

// Обработка ввода
const handleInput = () => {
  if (bankQuery.value.trim()) {
    getBankByQuery()
  } else {
    bankSuggestions.value = []
  }
}

// Выбор подсказки
const selectSuggestion = (value, index) => {
  bankQuery.value = value

  selectedIndex.value = bankSuggestions.value[index].data
  bankDataFromSuggestions.БИК = selectedIndex.value.bic
  bankDataFromSuggestions.Название = selectedIndex.value.correspondent_account
  bankDataFromSuggestions.Корреспондетский_счёт = selectedIndex.value.name.payment
  bankDataFromSuggestions.Адрес = selectedIndex.value.address.value

  bankSuggestions.value = [] // Очистка списка после выбора
}
</script>

<style scoped>
/* Улучшенный стиль подсказок */
.text-gray-700 {
  color: #4a4a4a;
}

.bg-purple-100 {
  background-color: #f3e8ff;
}

.cursor-pointer:hover {
  background-color: #e9d8fd;
}
</style>
