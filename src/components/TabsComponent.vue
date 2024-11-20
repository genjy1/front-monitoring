<template>
  <div>
    <!-- Навигация табов -->
    <div class="flex justify-between py-4">
      <button
        v-for="tab in tabs"
        :key="tab.name"
        @click="$emit('update:activeTab', tab.name)"
        class="border-transparent focus-within:border-blue-500"
        :class="[
          'px-6 py-2 rounded-t-md text-sm font-semibold focus:outline-none',
          activeTab === tab.name
            ? 'text-blue-600 border-blue-500 border-b-2'
            : 'text-gray-500 hover:text-gray-700 border-b-2',
        ]"
      >
        {{ tab.label }}
      </button>
    </div>

    <!-- Содержимое активного таба -->
    <div>
      <component :is="activeTabContent" :machine="machine" :data="data" />
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import MachineInfo from './MachineInfo.vue'
import MachineSettings from './MachineSettings.vue'
import MonetarySettings from './MonetarySettings.vue'

const props = defineProps({
  tabs: Array,
  activeTab: String,
  machine: Object,
  data: Object,
})

defineEmits(['update:activeTab'])

// Динамически подгружаемые компоненты для каждого таба
const components = {
  MachineInfo,
  MachineSettings,
  MonetarySettings,
}

// Вычисляемое содержимое активного таба
const activeTabContent = computed(() => {
  const tab = props.tabs.find((t) => t.name === props.activeTab)
  return tab ? components[tab.component] : null
})
</script>
