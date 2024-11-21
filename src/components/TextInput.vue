<template>
  <div class="form-group">
    <label :for="id" class="block text-sm font-medium text-gray-700">
      {{ label }}
    </label>
    <input
      :id="id"
      :type="type"
      :placeholder="placeholder"
      :value="modelValue"
      @input="onInput"
      class="mt-1 block w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-500"
    />
  </div>
</template>

<script setup>
defineProps({
  modelValue: {
    type: String,
    required: true,
  },
  id: {
    type: String,
    required: false,
    default: null,
  },
  label: {
    type: String,
    required: false,
    default: '',
  },
  type: {
    type: String,
    required: false,
    default: 'text',
  },
  placeholder: {
    type: String,
    required: false,
    default: '',
  },
})

defineEmits(['update:modelValue'])

// Метод для обработки ввода
const onInput = (event) => {
  emit('update:modelValue', event.target.value)
}
</script>
