<script setup>
import { defineProps, defineEmits } from 'vue'

// Определяем пропсы и задаем значение по умолчанию
const props = defineProps({
  isOpen: {
    type: Boolean,
    default: false,
  },
  newGood: {
    type: Object,
    default: () => ({ code: '', name: '' }),
  },
})

// Определяем emit для управления событиями
const emit = defineEmits(['close', 'submitGood'])

// Функция для закрытия модального окна
const closeModal = () => {
  emit('close')
}

// Функция для добавления нового товара
const addGood = () => {
  emit('submitGood', props.newGood) // Отправляем данные товара через событие
  closeModal() // Закрываем модальное окно после сохранения
}
</script>

<template>
  <dialog class="modal rounded sm:w-1/4 w-4/5 mt-24" v-bind:open="props.isOpen">
    <header class="border-b">
      <div class="container-modal flex justify-between gap-2 p-[15px]">
        Добавить новую запись
        <button @click="closeModal" class="close rounded-full border-black cursor-pointer border-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="24"
            height="24"
            fill="red"
          >
            <line x1="8" y1="8" x2="16" y2="16" stroke="#000000" stroke-width="2" />
            <line x1="16" y1="8" x2="8" y2="16" stroke="#000000" stroke-width="2" />
          </svg>
        </button>
      </div>
    </header>
    <form @submit.prevent="addGood" class="flex flex-col p-[15px] m-0 gap-2">
      <label for="code" class="flex flex-col">
        Код товара
        <input
          v-model="props.newGood.code"
          type="text"
          id="code"
          class="px-4 py-2 border rounded"
        />
      </label>
      <label for="name" class="flex flex-col">
        Наименование товара
        <input
          v-model="props.newGood.name"
          type="text"
          id="name"
          class="px-4 py-2 border rounded"
        />
      </label>
      <button type="submit" class="bg-[#337ab7] rounded text-white px-2 py-4">Сохранить</button>
    </form>
  </dialog>
</template>
