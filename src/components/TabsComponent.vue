<script setup>
import { ref, computed, onMounted, watch, nextTick, onBeforeUnmount } from 'vue'
import MachineInfo from './tabs/MachineInfo.vue'
import MachineSettings from './tabs/MachineSettings.vue'
import MonetarySettings from './tabs/MonetarySettings.vue'
import Journals from './tabs/Journals.vue'
import Positions from './tabs/Positions.vue'

// Props
const props = defineProps({
  tabs: Array,
  activeTab: String,
  machine: Object,
  data: Object,
})

// Emit
const emit = defineEmits(['update:activeTab'])

// Динамические компоненты
const components = {
  MachineInfo,
  MachineSettings,
  MonetarySettings,
  Journals,
  Positions,
}

// Состояние прокрутки и слайдера
const tabsContainer = ref(null)
const tabsContent = ref(null)
const isScrollable = ref(false)
const scrollPosition = ref(0)

// Состояние свайпа
const touchStartX = ref(0)
const touchEndX = ref(0)

// Проверяем состояние прокрутки
const checkScrollState = () => {
  const container = tabsContainer.value
  const content = tabsContent.value
  if (container && content) {
    isScrollable.value = content.scrollWidth > container.clientWidth
    adjustScrollPosition()
  } else {
    console.error('Tabs container or content is not found')
  }
}

// Ограничиваем позицию скролла
const adjustScrollPosition = () => {
  const container = tabsContainer.value
  const content = tabsContent.value
  if (container && content) {
    const maxScroll = container.clientWidth - content.scrollWidth
    scrollPosition.value = Math.min(0, Math.max(scrollPosition.value, maxScroll))
  }
}

// Обновляем активный таб
const updateActiveTab = (tabName) => {
  emit('update:activeTab', tabName)
  scrollToActiveTab()
}

// Прокрутка табов с анимацией
const scrollTabs = (direction) => {
  const container = tabsContainer.value
  const step = 150
  if (container) {
    if (direction === 'left') {
      scrollPosition.value = Math.min(scrollPosition.value + step, 0)
    } else if (direction === 'right') {
      const maxScroll = container.clientWidth - tabsContent.value.scrollWidth
      scrollPosition.value = Math.max(scrollPosition.value - step, maxScroll)
    }
  }
}

// Автоматическая прокрутка к активному табу
const scrollToActiveTab = () => {
  const activeTabElement = document.querySelector(`[data-tab="${props.activeTab}"]`)
  const container = tabsContainer.value
  if (activeTabElement && container) {
    const activeLeft = activeTabElement.offsetLeft
    const activeWidth = activeTabElement.offsetWidth
    const containerWidth = container.clientWidth

    let newScrollPosition = scrollPosition.value
    if (activeLeft < -newScrollPosition) {
      newScrollPosition = -activeLeft
    } else if (activeLeft + activeWidth > -newScrollPosition + containerWidth) {
      newScrollPosition = -(activeLeft + activeWidth - containerWidth)
    }
    scrollPosition.value = Math.min(
      0,
      Math.max(newScrollPosition, containerWidth - tabsContent.value.scrollWidth),
    )
  } else {
    console.error('Active tab or container is not found')
  }
}

// Активный контент
const activeTabContent = computed(() => {
  const tab = props.tabs.find((t) => t.name === props.activeTab)
  return tab ? components[tab.component] : null
})

// Проверка на null и управление состоянием после монтирования компонента
onMounted(() => {
  nextTick(() => {
    checkScrollState()
    scrollToActiveTab()
  })
})

watch(() => props.tabs, checkScrollState)
watch(
  () => props.activeTab,
  () => {
    nextTick(() => {
      scrollToActiveTab()
      checkScrollState()
    })
  },
)

watch(
  () => props.tabs.length,
  () => {
    // Обновляем состояние прокрутки при изменении длины массива табов
    nextTick(checkScrollState)
  },
)

// ResizeObserver для отслеживания изменений размера
let resizeObserver

onMounted(() => {
  resizeObserver = new ResizeObserver(() => {
    nextTick(() => {
      checkScrollState()
      scrollToActiveTab()
    })
  })

  if (tabsContainer.value && tabsContent.value) {
    resizeObserver.observe(tabsContainer.value)
    resizeObserver.observe(tabsContent.value)
  }
})

onBeforeUnmount(() => {
  if (resizeObserver) {
    resizeObserver.disconnect()
  }
})

// Обработчики свайпов
const handleTouchStart = (event) => {
  touchStartX.value = event.touches[0].clientX
}

const handleTouchMove = (event) => {
  touchEndX.value = event.touches[0].clientX
}

const handleTouchEnd = () => {
  if (touchStartX.value - touchEndX.value > 50) {
    scrollTabs('right') // свайп влево
  } else if (touchEndX.value - touchStartX.value > 50) {
    scrollTabs('left') // свайп вправо
  }
}
</script>

<template>
  <div>
    <!-- Контейнер с кнопками прокрутки -->
    <div class="relative border-b border-gray-300 my-4" v-if="tabs.length">
      <!-- Кнопка "Прокрутить влево" -->
      <button
        v-show="isScrollable"
        class="absolute -top-1 z-10 bg-white border rounded-full p-2 shadow hover:bg-gray-100 focus:ring focus:ring-blue-300 transition disabled:opacity-50"
        :disabled="scrollPosition >= 0"
        @click="scrollTabs('left')"
      >
        &larr;
      </button>

      <!-- Контейнер табов -->
      <div
        ref="tabsContainer"
        class="relative flex overflow-hidden no-scrollbar"
        @touchstart="handleTouchStart"
        @touchmove="handleTouchMove"
        @touchend="handleTouchEnd"
      >
        <div
          ref="tabsContent"
          class="flex space-x-4 transition-transform duration-300"
          :style="{ transform: `translateX(${scrollPosition}px)` }"
        >
          <button
            v-for="tab in tabs"
            :key="tab.name"
            :data-tab="tab.name"
            @click="updateActiveTab(tab.name)"
            class="relative px-4 py-2 text-sm font-medium transition whitespace-nowrap"
            :class="[
              activeTab === tab.name
                ? 'text-blue-600 border-b-2 border-blue-500'
                : 'text-gray-500 hover:text-gray-700',
            ]"
          >
            {{ tab.label }}
            <span
              v-if="activeTab === tab.name"
              class="absolute bottom-0 left-0 h-1 bg-blue-500 transition-transform indicator"
            />
          </button>
        </div>
      </div>

      <!-- Кнопка "Прокрутить вправо" -->
      <button
        v-show="isScrollable"
        class="absolute -top-1 -right-0 z-10 bg-white border rounded-full p-2 shadow hover:bg-gray-100 focus:ring focus:ring-blue-300 transition disabled:opacity-50"
        @click="scrollTabs('right')"
      >
        &rarr;
      </button>
    </div>

    <!-- Содержимое активного таба -->
    <transition name="fade" mode="out-in">
      <div :key="activeTab" class="w-full pt-4">
        <component :is="activeTabContent" :machine="machine" :data="data" />
      </div>
    </transition>
  </div>
</template>

<style scoped>
.no-scrollbar {
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
}

.no-scrollbar::-webkit-scrollbar {
  display: none; /* Chrome, Safari, Opera */
}

.indicator {
  transition:
    transform 0.3s ease,
    width 0.3s ease;
}

button:disabled {
  cursor: not-allowed;
}
</style>
