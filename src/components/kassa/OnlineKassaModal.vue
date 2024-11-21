<!-- OnlineKassaModal.vue -->
<template>
  <div>
    <form
      role="form"
      method="post"
      class="space-y-6 modal w-3/5 mx-auto p-4 bg-white rounded-lg shadow-lg"
    >
      <div class="modal-header flex items-center justify-between">
        <h3>Настройки онлайн-кассы</h3>
        <button type="button" @click="$emit('close')">
          <CloseIcon />
        </button>
      </div>
      <!-- Провайдер -->
      <div class="grid gap-2">
        <label for="provider" class="text-sm font-medium text-gray-700"> Провайдер </label>
        <select
          class="form-control px-3 py-2 border rounded-md focus:ring focus:ring-blue-500"
          name="okkm[provider]"
          id="provider"
          v-model="form.provider"
        >
          <option value="0">nanokassa.ru</option>
          <option value="1">initpro.ru</option>
          <option value="2">orangedata.ru</option>
          <option value="3">rekassa.kz</option>
          <option value="4">initpro.ru (V2)</option>
        </select>
      </div>

      <!-- Уникальный номер кассы -->
      <div class="grid gap-2">
        <label for="kassaid" class="text-sm font-medium text-gray-700">
          Уникальный номер вашей онлайн-кассы (kassaid)
        </label>
        <input
          type="text"
          name="okkm[kassaid]"
          id="kassaid"
          class="form-control px-3 py-2 border rounded-md focus:ring focus:ring-blue-500"
          v-model="form.kassaid"
        />
      </div>

      <!-- Пароль для кассы -->
      <div class="grid gap-2">
        <label for="kassatoken" class="text-sm font-medium text-gray-700">
          Пароль для кассы (kassatoken)
        </label>
        <input
          type="text"
          name="okkm[kassatoken]"
          id="kassatoken"
          class="form-control px-3 py-2 border rounded-md focus:ring focus:ring-blue-500"
          v-model="form.kassatoken"
        />
      </div>

      <!-- ИНН -->
      <div class="grid gap-2">
        <label for="inn" class="text-sm font-medium text-gray-700"> ИНН </label>
        <input
          type="text"
          name="okkm[inn]"
          id="inn"
          class="form-control px-3 py-2 border rounded-md focus:ring focus:ring-blue-500"
          v-model="form.inn"
        />
      </div>

      <!-- Группа -->
      <div class="grid gap-2">
        <label for="group" class="text-sm font-medium text-gray-700"> Группа </label>
        <input
          type="text"
          name="okkm[group]"
          id="group"
          class="form-control px-3 py-2 border rounded-md focus:ring focus:ring-blue-500"
          v-model="form.group"
        />
      </div>

      <!-- Версия ФФД -->
      <div class="grid gap-2">
        <label for="ffd_version" class="text-sm font-medium text-gray-700"> Версия ФФД </label>
        <select
          class="form-control px-3 py-2 border rounded-md focus:ring focus:ring-blue-500"
          name="okkm[ffd_version]"
          id="ffd_version"
          v-model="form.ffd_version"
        >
          <option value="2">1.05</option>
          <option value="4">1.20</option>
        </select>
      </div>

      <!-- Серийный номер -->
      <div class="grid gap-2">
        <label for="serial_number" class="text-sm font-medium text-gray-700">
          Серийный номер
        </label>
        <input
          type="text"
          name="okkm[serial_number]"
          id="serial_number"
          class="form-control px-3 py-2 border rounded-md focus:ring focus:ring-blue-500"
          v-model="form.serial_number"
        />
      </div>

      <!-- Адрес установки автомата -->
      <div class="grid gap-2">
        <label for="kassa_vend_address" class="text-sm font-medium text-gray-700">
          Адрес установки автомата
        </label>
        <input
          type="text"
          name="okkm[kassa_vend_address]"
          id="kassa_vend_address"
          class="form-control px-3 py-2 border rounded-md focus:ring focus:ring-blue-500"
          v-model="form.kassa_vend_address"
        />
      </div>

      <!-- Кнопка Сохранить -->
      <div class="pt-4">
        <button
          type="submit"
          name="command"
          value="okkm_settings_save"
          class="btn btn-primary px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700"
        >
          <span class="glyphicon glyphicon-ok"></span>
          Сохранить изменения
        </button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { reactive } from 'vue'
import CloseIcon from '../icons/CloseIcon.vue'
defineProps(['show'])

const form = reactive({
  provider: '1',
  kassaid: '2561',
  kassatoken: 'f9dae5e2efcd4dad8f8f0983bd446f42',
  inn: '',
  group: 'vend',
  ffd_version: '2',
  serial_number: '',
  kassa_vend_address: 'Сергиев посад',
})
</script>

<style scoped>
.modal {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1000;
}
</style>
