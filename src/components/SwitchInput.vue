<template>
  <label class="flex items-center cursor-pointer space-x-2">
    <!-- Скрытый чекбокс -->
    <input
      type="checkbox"
      :checked="modelValue.includes(value)"
      @change="toggleValue"
      class="hidden peer"
    />
    <!-- Визуальный переключатель -->
    <span
      class="w-10 h-6 flex items-center bg-gray-300 rounded-full p-1 duration-300 peer-checked:bg-blue-500"
    >
      <span
        class="w-4 h-4 bg-white rounded-full shadow-md transform duration-300 peer-checked:translate-x-4"
      ></span>
    </span>
    <span class="text-gray-700 font-medium">{{ label }}</span>
  </label>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue'

// Принимаем modelValue как массив и value как строку
const props = defineProps({
  modelValue: {
    type: Array,
    required: true,
    default: () => [], // Устанавливаем дефолтное значение как пустой массив
  },
  value: {
    type: String,
    required: true,
  },
  label: {
    type: String,
    required: true,
  },
})

// Отправка обновленного значения в родительский компонент
const emit = defineEmits(['update:modelValue'])

// Добавление или удаление значения из массива
const toggleValue = () => {
  const updatedValue = [...props.modelValue]
  const index = updatedValue.indexOf(props.value)
  if (index > -1) {
    updatedValue.splice(index, 1) // Удаляем, если уже есть
  } else {
    updatedValue.push(props.value) // Добавляем, если отсутствует
  }
  emit('update:modelValue', updatedValue)
}
</script>

<style scoped>
/* Стили для переключателя */
.peer:checked + span {
  background-color: #2563eb;
}

.peer:checked + span > span {
  transform: translateX(100%);
}

/* Стили для самого переключателя */
.peer + span {
  transition:
    background-color 0.3s ease,
    transform 0.3s ease;
}

span > span {
  transition: transform 0.3s ease;
}
</style>
