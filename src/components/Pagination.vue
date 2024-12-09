<template>
  <div class="links_wrapper flex items-center justify-between max-w-[420px] mx-auto my-0 py-4">
    <!-- Кнопка Previous -->
    <button
      class="btn py-2 px-4 border rounded-lg transition-all duration-200"
      :class="{
        'bg-gray-100 text-gray-700': links[0]?.url,
        'bg-gray-300 text-gray-500 cursor-not-allowed': !links[0]?.url,
      }"
      :disabled="!links[0]?.url"
      @click="handlePageChange(links[0]?.url)"
    >
      « Previous
    </button>

    <!-- Номера страниц -->
    <div class="flex gap-2 mx-4">
      <button
        v-for="(link, index) in links.slice(1, -1)"
        :key="index"
        class="btn py-2 px-4 border rounded-lg transition-all duration-200"
        :class="{
          'bg-blue-500 text-white font-bold': link.active,
          'bg-gray-100 text-gray-700': !link.active && link.url,
          'bg-gray-300 text-gray-500 cursor-not-allowed': !link.url,
        }"
        :disabled="!link.url"
        @click="handlePageChange(link.url)"
      >
        <span v-html="link.label"></span>
      </button>
    </div>

    <!-- Кнопка Next -->
    <button
      class="btn py-2 px-4 border rounded-lg transition-all duration-200"
      :class="{
        'bg-gray-100 text-gray-700': links[links.length - 1]?.url,
        'bg-gray-300 text-gray-500 cursor-not-allowed': !links[links.length - 1]?.url,
      }"
      :disabled="!links[links.length - 1]?.url"
      @click="handlePageChange(links[links.length - 1]?.url)"
    >
      Next »
    </button>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue'

defineProps({
  links: {
    type: Array,
    required: true,
    default: () => [],
  },
})

const emit = defineEmits(['page-change'])

const handlePageChange = (url) => {
  if (url) {
    emit('page-change', url)
  }
}
</script>

<style scoped>
.links_wrapper {
  gap: 1rem; /* Расстояние между элементами */
}

.btn {
  transition: all 0.2s ease;
}

.btn:hover:not(:disabled) {
  background-color: #0056b3;
  color: white;
}
</style>
