<template>
  <div
    class="modal absolute w-screen top-0 left-0 h-screen backdrop-blur-sm backdrop-contrast-50"
    v-show="isOnlineKassaOpen || isQrPaymentOpen"
    @click="closeModals()"
  >
    <OnlineKassaModal
      class="relative w-2/5 top-10 z-50 bg-white"
      v-show="isOnlineKassaOpen"
      @close="isOnlineKassaOpen = false"
      @click.stop
    />
    <QrPaymentModal v-show="isQrPaymentOpen" @close="isQrPaymentOpen = false" @click.stop />
  </div>

  <div class="grid grid-cols-1 md:grid-cols-2 gap-4 border border-gray-300 rounded-lg p-4 -z-50">
    <div v-for="(item, index) in settings" :key="index" class="flex flex-col gap-1">
      <label :title="item.tooltip" class="text-sm font-medium text-gray-700">
        {{ item.label }}
      </label>

      <div v-if="item.type === 'switch'" class="flex items-center">
        <label class="relative inline-flex items-center cursor-pointer -z-40">
          <input
            type="checkbox"
            class="sr-only peer"
            :checked="item.value"
            @change="toggleSwitch(index)"
          />
          <div
            class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-500 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"
          ></div>
          <span class="ml-2 text-sm text-gray-700">
            {{ item.value ? 'ВКЛ' : 'ВЫКЛ' }}
          </span>
        </label>
      </div>

      <input
        v-else-if="item.type === 'text'"
        v-model="item.value"
        type="text"
        :placeholder="item.placeholder"
        class="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-500"
      />

      <input
        v-else-if="item.type === 'number'"
        v-model.number="item.value"
        type="number"
        :placeholder="item.placeholder"
        class="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-500"
      />

      <!-- <a v-else-if="item.type === 'link'" :href="item.link" class="text-blue-600 hover:underline">
        {{ item.linkText }}
      </a> -->
      <button
        v-else-if="item.type === 'link'"
        @click="handleButtonClick(item.modal)"
        class="text-blue-600 hover:underline block text-left outline-none"
      >
        {{ item.linkText }}
      </button>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref, onMounted, onBeforeUnmount } from 'vue'
import OnlineKassaModal from '../kassa/OnlineKassaModal.vue'
import QrPaymentModal from '../kassa/QrPaymentModal.vue'

const isOnlineKassaOpen = ref(false)
const isQrPaymentOpen = ref(false)

const settings = reactive([
  {
    label: 'Монетоприемник',
    tooltip: 'Включение или выключение монетоприемника',
    type: 'switch',
    value: false,
  },
  {
    label: 'Купюроприемник',
    tooltip: 'Включение или выключение купюроприемника',
    type: 'switch',
    value: false,
  },
  {
    label: 'Модуль рециклинга',
    tooltip: 'Включение или выключение модуля рециклинга купюр',
    type: 'switch',
    value: false,
  },
  {
    label: 'Эквайринг',
    tooltip: 'Включение или выключение модуля безналичной оплаты',
    type: 'switch',
    value: true,
  },
  {
    label: 'Эквайринг. Логин',
    tooltip: 'Логин (для терминалов 2CAN)',
    type: 'text',
    value: '',
    placeholder: 'Эквайринг. Логин',
  },
  {
    label: 'Эквайринг. Пароль',
    tooltip: 'Секретный ключ (для терминалов 2CAN)',
    type: 'text',
    value: '',
    placeholder: 'Эквайринг. Пароль',
  },
  {
    label: 'QR-платежи',
    tooltip: 'Включение или выключение платежей по QR-коду',
    type: 'switch',
    value: false,
  },
  {
    label: 'Режим одной продажи',
    tooltip: 'Автоматически выдавать сдачу после выдачи одного товара',
    type: 'switch',
    value: true,
  },
  {
    label: 'Возможность размена',
    tooltip: 'Разрешить выдачу сдачи без покупки (размен купюр)',
    type: 'switch',
    value: true,
  },
  {
    label: 'Емкость денежного ящика',
    tooltip: 'Максимальное количество монет в денежном ящике',
    type: 'number',
    value: 800,
    placeholder: 'Емкость денежного ящика',
  },
  {
    label: 'Кассовый аппарат',
    tooltip: 'Включение или выключение контрольно-кассовой машины',
    type: 'switch',
    value: true,
  },
  {
    label: 'Параметры онлайн-кассы',
    tooltip: '',
    type: 'link',
    modal: 'onlineKassa',
    linkText: 'Открыть настройки',
  },
  {
    label: 'Параметры QR-платежей',
    tooltip: '',
    type: 'link',
    modal: 'qrPayment',
    linkText: 'Открыть настройки',
  },
])

const closeModals = () => {
  isOnlineKassaOpen.value = false
  isQrPaymentOpen.value = false
}

const toggleSwitch = (index) => {
  settings[index].value = !settings[index].value
}

const handleButtonClick = (modal) => {
  if (modal === 'onlineKassa') {
    isOnlineKassaOpen.value = true
  } else if (modal === 'qrPayment') {
    isQrPaymentOpen.value = true
  }
}

// Обработчик для нажатия клавиши Escape
const handleEscape = (event) => {
  if (event.key === 'Escape') {
    closeModals()
  }
}

// Подписка и отписка от события keydown
onMounted(() => {
  window.addEventListener('keydown', handleEscape)
})
onBeforeUnmount(() => {
  window.removeEventListener('keydown', handleEscape)
})
</script>
