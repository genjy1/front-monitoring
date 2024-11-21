<template>
  <input
    :id="id"
    class="border-2 border-[#6323A7] rounded px-4 py-2 outline-none transition-all duration-300 ease-in-out focus:border-[#8230da] focus:outline-none focus:ring-2 focus:ring-[#6223A7]"
    :value="modelValue"
    :type="inputType"
    @input="$emit('update:modelValue', $event.target.value)"
  />
</template>
<script setup>
import { defineProps } from 'vue'
const props = defineProps({
  id: String,
  modelValue: String,
  inputType: String,
})

const emit = defineEmits(['update:modelValue'])
</script>
