<template>
  <label class="flex items-center cursor-pointer">
    <input
      type="checkbox"
      :checked="modelValue"
      @change="$emit('update:modelValue', $event.target.checked)"
      class="hidden"
    />
    <div
      :class="modelValue ? 'bg-green-500' : 'bg-gray-400'"
      class="relative w-12 h-6 rounded-full shadow-inner"
    >
      <span
        :class="modelValue ? 'translate-x-full' : 'translate-x-0'"
        class="absolute block w-6 h-6 bg-white rounded-full shadow transition-transform duration-200"
      ></span>
    </div>
    <span class="ml-3 text-gray-600">{{ modelValue ? 'ВКЛ' : 'ВЫКЛ' }}</span>
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
})
</script>
