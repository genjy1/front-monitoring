<template>
  <div>
    <HeaderComponent />
    <div class="container mt-24 mx-auto my-0 w-4/5">
      <!-- Условие, чтобы подождать загрузки данных -->
      <div v-if="machine" class="sm:w-2/5">
        <ViewHeader class="border-b mb-2" :text="machineHeader" />

        <SuccessComponent v-if="message" :message="message" />

        <ErrorMessageComponent
          v-if="machine.status !== 'Online'"
          :text="'Нет связи с автоматом. Удаленное управление недоступно'"
        />

        <!-- Проверка на истечение подписки -->
        <p v-if="subscriptionIsNotToday" class="text-red-800">
          Внимание: подписка истекает {{ machine.subscription_until }}!
        </p>

        <p class="text-justify">
          Основные сведения об автомате. <br />
          Вы можете изменить некоторые поля и нажать "Сохранить", чтобы запомнить изменения.
          Некоторые функции могут быть доступны только в режиме "Online".
        </p>

        <form @submit.prevent="updateMachine">
          <ul class="py-2">
            <li class="border-y py-2 grid grid-cols-2">
              <span class="block"> ID автомата</span><span>{{ machine.id }}</span>
            </li>
            <li class="border-b py-2 grid grid-cols-2">
              <span class="block">ID контроллера </span><span>{{ machine.controller_id }}</span>
            </li>
            <li class="border-b py-2 grid grid-cols-2">
              <span class="block">Версия ПО </span><span>{{ machine.software_version }}</span>
            </li>
            <li class="border-b py-2 grid grid-cols-2">
              <span class="block">Подписка действует до </span
              ><span>{{ machine.subscription_until }}</span>
            </li>
            <li class="border-b py-2 grid grid-cols-2">
              <span class="block">Статус </span>
              <span :class="machine.status === 'Online' ? 'text-green-800' : 'text-red-800'">{{
                machine.status
              }}</span>
            </li>
            <li class="border-b py-2 grid grid-cols-2">
              <span class="block">Текущие ошибки </span><span>{{ machine.errors }}</span>
            </li>
            <li class="border-b py-2 grid grid-cols-2">
              <span class="block">Состояние </span><span>{{ machine.condition }}</span>
            </li>
            <li class="border-b py-2 grid grid-cols-2">
              <span class="block">Дата и время запуска </span><span>{{ machine.created_at }}</span>
            </li>
            <li class="border-b py-2 grid grid-cols-2">
              <span class="block">Текущий баланс </span><input v-model="data.balance" />
            </li>
            <li class="border-b py-2 grid grid-cols-2">
              <span class="block">Номер автомата </span><input v-model="data.number" />
            </li>
            <li class="border-b py-2 grid grid-cols-2">
              <span class="block">Имя автомата </span><input v-model="data.name" />
            </li>
            <li class="border-b py-2 grid grid-cols-2">
              <span class="block">Адрес </span><input v-model="data.address" />
            </li>
          </ul>
          <SubmitButton inner-text="Сохранить изменения" class="mt-2" />
        </form>
      </div>
      <Preloader v-else class="relative left-[50vmax] mt-96" />
    </div>
  </div>
</template>

<script setup>
import HeaderComponent from '@/components/HeaderComponent.vue'
import axios from 'axios'
import { ref, onMounted, computed } from 'vue'
import { useRoute } from 'vue-router'
import ErrorMessageComponent from '@/components/ErrorMessageComponent.vue'
import Preloader from '@/components/Preloader.vue'
import ViewHeader from '@/components/ViewHeader.vue'
import SubmitButton from '@/components/SubmitButton.vue'
import SuccessComponent from '@/components/SuccessComponent.vue'

const route = useRoute()
const machine = ref(false)
const machineHeader = ref('')
const message = ref()

// Инициализация данных для формы
const data = ref({
  number: '',
  address: '',
  name: '',
  balance: '',
})

// Синхронизируем данные формы с machine после загрузки
onMounted(async () => {
  try {
    const response = await axios.get(`http://127.0.0.1:8000/api/machine/${route.params.id}`)
    machine.value = response.data
    machineHeader.value = `Автомат #${machine.value.id}`

    // Устанавливаем начальные значения формы
    data.value = {
      number: machine.value.number,
      address: machine.value.address,
      name: machine.value.name,
      balance: machine.value.balance,
    }
  } catch (error) {
    console.error('Ошибка при загрузке данных машины:', error)
  }
})

// Вычисляемое свойство, проверяющее, истекает ли подписка не сегодня
const subscriptionIsNotToday = computed(() => {
  const today = new Date().toISOString().slice(0, 10)
  return machine.value.subscription_until !== today
})

// Обновляем данные машины
const updateMachine = async () => {
  try {
    const response = await axios.patch(`/machine/${route.params.id}/update`, data.value)

    // Используем Object.assign для обновления machine, чтобы Vue отслеживал изменения
    Object.assign(machine.value, response.data)

    // Обновляем заголовок
    machineHeader.value = `Автомат #${machine.value.id}`
    message.value = response.data.message
  } catch (error) {
    console.error('Ошибка при обновлении данных машины:', error)
  }
}
</script>
