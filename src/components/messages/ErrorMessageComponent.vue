<script setup>
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
  <div class="bg-red-500" @click="closeNotification">
    <p class="py-2 text-center">{{ text }}</p>
  </div>
</template>
