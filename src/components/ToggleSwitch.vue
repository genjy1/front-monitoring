<template>
  <label class="flex items-center cursor-pointer gap-2">
    <input
      type="checkbox"
      :checked="modelValue"
      @change="$emit('update:modelValue', $event.target.checked)"
      class="hidden"
    />
    <div
      :class="[
        modelValue ? 'bg-green-500' : 'bg-gray-400',
        isModalOpen ? '-z-50' : '',
        'relative w-12 h-6 rounded-full shadow-inner',
      ]"
    >
      <span
        :class="[
          modelValue ? 'translate-x-full' : 'translate-x-0',
          'absolute block w-6 h-6 bg-white rounded-full shadow transition-transform duration-200',
        ]"
      ></span>
    </div>
    <span class="text-gray-600 selection:bg-none">{{ modelValue ? 'ВКЛ' : 'ВЫКЛ' }}</span>
  </label>
</template>

<script setup>
import { defineProps } from 'vue'

// Определяем пропс modelValue
defineProps({
  modelValue: {
    type: Boolean,
    required: true,
  },
  isModalOpen: {
    type: Boolean,
    default: false,
  },
})
</script>
