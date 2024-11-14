<template>
  <div
    class="success border rounded border-green-800 py-2 px-4 text-green-800 my-2 grid grid-cols-2 items-center"
  >
    <span class="text-left">{{ message }}</span>
    <button
      class="flex items-center justify-center rounded-full h-9 w-9 border border-green-800 justify-self-end cursor-pointer"
      @click="closeNotification"
    >
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        stroke="currentColor"
        stroke-width="1"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <line x1="18" y1="6" x2="6" y2="18" />
        <line x1="6" y1="6" x2="18" y2="18" />
      </svg>
    </button>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue'

const props = defineProps({
  message: String,
})

// Определение emit для отправки события
const emit = defineEmits(['close'])

// Метод для закрытия уведомления
const closeNotification = () => {
  emit('close')
}
</script>
