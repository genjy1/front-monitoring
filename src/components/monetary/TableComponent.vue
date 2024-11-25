<template>
  <div>
    <label class="block text-xl font-semibold text-gray-900 ml-4">{{ title }}</label>
    <table class="w-full text-sm text-left table-auto border-separate space-y-4">
      <thead>
        <tr class="border-b">
          <th class="py-2 px-4 text-gray-600">Номинал</th>
          <th class="py-2 px-4 text-gray-600">Статус</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in items" :key="index" class="transition-all hover:bg-gray-50">
          <td class="py-3 px-4">{{ item.value }}₸</td>
          <td class="w-[180px] sm:w-[280px]">
            <!-- Вставляем компонент ToggleSwitch и передаем состояние и обработчик изменения -->
            <ToggleSwitch
              :model-value="item.enabled"
              :is-modal-open="false"
              @update:modelValue="(value) => updateItemState(index, value)"
            />
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue'
import ToggleSwitch from '../ToggleSwitch.vue'

// Получаем props от родителя
defineProps({
  title: {
    type: String,
    required: true,
  },
  items: {
    type: Array,
    required: true,
  },
})

// Объявляем событие для обновления состояния в родителе
const emit = defineEmits()

// Обработчик обновления состояния в items
const updateItemState = (index, value) => {
  emit('update:itemState', { index, value })
}
</script>
