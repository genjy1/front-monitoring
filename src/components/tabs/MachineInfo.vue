<template>
  <form @submit.prevent="updateMachine">
    <ul>
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
</template>
<script setup>
import axios from 'axios'
import { defineProps } from 'vue'
import SubmitButton from '../forms/SubmitButton.vue'
import { useRoute } from 'vue-router'

const props = defineProps({
  machine: {},
  data: {},
})

const route = useRoute()

const updateMachine = async () => {
  try {
    console.log(props.data)

    const response = await axios.patch(`/machine/${route.params.id}/update`, props.data)

    // Используем Object.assign для обновления machine, чтобы Vue отслеживал изменения
    Object.assign(props.machine, response.data)

    // Обновляем заголовок
    // machineHeader.value = `Автомат #${machine.value.id}`
    // message.value = response.data.message
  } catch (error) {
    console.error('Ошибка при обновлении данных машины:', error)
  }
}
</script>
