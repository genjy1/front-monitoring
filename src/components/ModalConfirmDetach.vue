<template>
  <div
    class="fixed inset-0 flex items-center justify-center backdrop-blur-[4px]"
    @click.self="close"
  >
    <div class="bg-white rounded-lg shadow-lg p-6 max-w-md w-full">
      <h2 class="text-lg font-semibold mb-4">Подтверждение отвязки автомата</h2>
      <p class="mb-4">
        Вы уверены, что хотите отвязать автомат #{{ machineId }}? Это действие необратимо.
      </p>

      <form @submit.prevent="confirm">
        <input
          type="text"
          v-model="controller_id"
          placeholder="Введите номер контроллера, чтобы подтвердить отвязку автомата"
          class="w-full border rounded p-4 mb-4 outline-none"
        />
        <span v-if="errorMessage" class="text-red-600 text-sm">{{ errorMessage }}</span>
      </form>

      <div class="flex justify-end gap-4">
        <button
          class="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded"
          @click="close"
        >
          Отмена
        </button>
        <button class="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600" @click="confirm">
          Отвязать
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, defineProps, defineEmits } from 'vue'

defineProps(['machineId'])
const emit = defineEmits(['close', 'confirm']) // Определение событий

const controller_id = ref('')
const errorMessage = ref('')

// Закрытие модального окна
const close = () => {
  emit('close')
}

// Подтверждение отвязки с проверкой
const confirm = () => {
  if (!controller_id.value.trim()) {
    errorMessage.value = 'Введите номер контроллера для подтверждения.'
    return
  }

  emit('confirm', controller_id.value)
}
</script>

<style scoped>
/* Стили для модального окна */
</style>
