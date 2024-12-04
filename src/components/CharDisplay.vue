<template>
  <div class="char-wrapper flex flex-col gap-2">
    <span class="label px-4 font-medium">{{ title }}</span>
    <div
      class="value border-2 rounded-full px-4 py-2 border-primary flex items-center justify-between hover:bg-primary hover:text-white transition-all ease-linear"
      :title="value"
    >
      <span>{{ shortenedValue }}</span>
      <button
        type="button"
        @click="copyToClipboard"
        class="copy-btn hover:text-white"
        :aria-label="'Скопировать ' + title"
      >
        <slot>
          <CopyIcon />
        </slot>
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import CopyIcon from '@/components/icons/CopyIcon.vue' // Ваш иконка для копирования

const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  value: {
    type: [String, Number],
    required: true,
  },
  maxLength: {
    type: Number,
    default: 16, // Максимальная длина текста перед обрезкой
  },
})

const shortenedValue = computed(() =>
  value.length > maxLength ? `${value.slice(0, maxLength)}...` : value,
)

const copyToClipboard = async () => {
  try {
    await navigator.clipboard.writeText(value.toString())
    console.log(`Скопировано: ${value}`)
  } catch (err) {
    console.error('Ошибка копирования:', err)
  }
}
</script>

<style scoped>
.char-wrapper .value {
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-color: #3d4070;
}
.copy-btn {
  background: none;
  border: none;
  cursor: pointer;
}
.label {
  color: #333;
}
</style>
