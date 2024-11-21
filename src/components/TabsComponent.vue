<template>
  <div>
    <!-- Навигация табов -->
    <div class="flex flex-wrap justify-between items-center py-3">
      <button
        v-for="tab in tabs"
        :key="tab.name"
        @click="$emit('update:activeTab', tab.name)"
        class="border-transparent focus-within:border-blue-500 flex justify-between sm:items-center sm:gap-2 w-full sm:w-auto"
        :class="[
          ' py-2 rounded-t-md text-sm font-semibold focus:outline-none',
          activeTab === tab.name
            ? 'text-blue-600 border-blue-500 border-b-2'
            : 'text-gray-500 hover:text-gray-700 border-b-2',
        ]"
      >
        <component class="w-4 text-center" :is="tab.icon" />
        <span class="self-end sm:self-auto">{{ tab.label }}</span>
      </button>
    </div>

    <!-- Содержимое активного таба -->
    <transition name="fade" mode="out-in">
      <div :key="activeTab" class="tab-content">
        <component :is="activeTabContent" :machine="machine" :data="data" />
      </div>
    </transition>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import MachineInfo from './tabs/MachineInfo.vue'
import MachineSettings from './tabs/MachineSettings.vue'
import MonetarySettings from './tabs/MonetarySettings.vue'

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
<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
