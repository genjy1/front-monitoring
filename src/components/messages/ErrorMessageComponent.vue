<script setup>
import CloseIcon from '../icons/CloseIcon.vue'
const props = defineProps({
  text: String,
})

// Определение emit для отправки события
const emit = defineEmits(['close'])

// Метод для закрытия уведомления
const closeNotification = () => {
  emit('close')
}
</script>
<template>
  <div class="bg-red-500 flex justify-between items-center px-2" v-if="text">
    <p class="py-2 text-center text-white">{{ text }}</p>
    <button class="close-btn"><CloseIcon class="text-white" @click="closeNotification" /></button>
  </div>
</template>
