<template>
  <div>
    <!-- Модальные окна -->
    <div
      v-if="isModalOpen"
      class="modal absolute w-screen top-0 left-0 h-screen backdrop-blur-sm backdrop-contrast-50 transition-all"
      @click="closeModals"
    >
      <component
        :is="activeModal"
        class="relative w-2/5 top-10 z-50 bg-white"
        @close="closeModals"
        @click.stop
      />
    </div>

    <!-- Основные настройки -->
    <div class="my-4">
      <!-- Таблица настроек -->
      <div>
        <form
          @submit.prevent="settingsLoaded ? updateSettings() : saveSettings()"
          :class="settingsLoaded ? 'border border-red-500' : 'border border-green-500'"
        >
          <div class="grid grid-cols-2 gap-y-4 gap-x-6">
            <!-- Монетоприемник -->
            <div class="text-gray-700 font-medium" title="Включение или выключение монетоприемника">
              Монетоприемник
            </div>
            <div>
              <label class="flex items-center cursor-pointer">
                <input type="checkbox" v-model="cvEnabled" class="hidden" />
                <div
                  :class="cvEnabled ? 'bg-green-500' : 'bg-gray-400'"
                  class="relative w-12 h-6 rounded-full shadow-inner"
                >
                  <span
                    :class="cvEnabled ? 'translate-x-full' : 'translate-x-0'"
                    class="absolute block w-6 h-6 bg-white rounded-full shadow transition-transform duration-200"
                  ></span>
                </div>
                <span class="ml-3 text-gray-600">{{ cvEnabled ? 'ВКЛ' : 'ВЫКЛ' }}</span>
              </label>
            </div>

            <!-- Купюроприемник -->
            <div class="text-gray-700 font-medium" title="Включение или выключение купюроприемника">
              Купюроприемник
            </div>
            <div>
              <label class="flex items-center cursor-pointer">
                <input type="checkbox" v-model="bvEnabled" class="hidden" />
                <div
                  :class="bvEnabled ? 'bg-green-500' : 'bg-gray-400'"
                  class="relative w-12 h-6 rounded-full shadow-inner"
                >
                  <span
                    :class="bvEnabled ? 'translate-x-full' : 'translate-x-0'"
                    class="absolute block w-6 h-6 bg-white rounded-full shadow transition-transform duration-200"
                  ></span>
                </div>
                <span class="ml-3 text-gray-600">{{ bvEnabled ? 'ВКЛ' : 'ВЫКЛ' }}</span>
              </label>
            </div>

            <!-- Модуль рециклинга -->
            <div
              class="text-gray-700 font-medium"
              title="Включение или выключение модуля рециклинга купюр"
            >
              Модуль рециклинга
            </div>
            <div>
              <label class="flex items-center cursor-pointer">
                <input type="checkbox" v-model="rcEnabled" class="hidden" />
                <div
                  :class="rcEnabled ? 'bg-green-500' : 'bg-gray-400'"
                  class="relative w-12 h-6 rounded-full shadow-inner"
                >
                  <span
                    :class="rcEnabled ? 'translate-x-full' : 'translate-x-0'"
                    class="absolute block w-6 h-6 bg-white rounded-full shadow transition-transform duration-200"
                  ></span>
                </div>
                <span class="ml-3 text-gray-600">{{ rcEnabled ? 'ВКЛ' : 'ВЫКЛ' }}</span>
              </label>
            </div>

            <!-- Эквайринг -->
            <div
              class="text-gray-700 font-medium"
              title="Включение или выключение модуля безналичной оплаты"
            >
              Эквайринг
            </div>
            <div>
              <label class="flex items-center cursor-pointer">
                <input type="checkbox" v-model="cleEnabled" class="hidden" />
                <div
                  :class="cleEnabled ? 'bg-green-500' : 'bg-gray-400'"
                  class="relative w-12 h-6 rounded-full shadow-inner"
                >
                  <span
                    :class="cleEnabled ? 'translate-x-full' : 'translate-x-0'"
                    class="absolute block w-6 h-6 bg-white rounded-full shadow transition-transform duration-200"
                  ></span>
                </div>
                <span class="ml-3 text-gray-600">{{ cleEnabled ? 'ВКЛ' : 'ВЫКЛ' }}</span>
              </label>
            </div>

            <!-- Эквайринг. Логин -->
            <div class="text-gray-700 font-medium" title="Логин (для терминалов 2CAN)">
              Эквайринг. Логин
            </div>
            <div>
              <input
                type="text"
                v-model="cleLogin"
                placeholder="Эквайринг. Логин"
                class="w-full p-2 border border-gray-300 rounded-md"
              />
            </div>

            <!-- Эквайринг. Пароль -->
            <div class="text-gray-700 font-medium" title="Секретный ключ (для терминалов 2CAN)">
              Эквайринг. Пароль
            </div>
            <div>
              <input
                type="password"
                v-model="clePassword"
                placeholder="Эквайринг. Пароль"
                class="w-full p-2 border border-gray-300 rounded-md"
              />
            </div>

            <!-- QR-платежи -->
            <div
              class="text-gray-700 font-medium"
              title="Включение или выключение платежей по QR-коду"
            >
              QR-платежи
            </div>
            <div>
              <label class="flex items-center cursor-pointer">
                <input type="checkbox" v-model="qrPaymentEnabled" class="hidden" />
                <div
                  :class="qrPaymentEnabled ? 'bg-green-500' : 'bg-gray-400'"
                  class="relative w-12 h-6 rounded-full shadow-inner"
                >
                  <span
                    :class="qrPaymentEnabled ? 'translate-x-full' : 'translate-x-0'"
                    class="absolute block w-6 h-6 bg-white rounded-full shadow transition-transform duration-200"
                  ></span>
                </div>
                <span class="ml-3 text-gray-600">{{ qrPaymentEnabled ? 'ВКЛ' : 'ВЫКЛ' }}</span>
              </label>
            </div>

            <!-- Режим одной продажи -->
            <div
              class="text-gray-700 font-medium"
              title="Автоматически выдавать сдачу после выдачи одного товара"
            >
              Режим одной продажи
            </div>
            <div>
              <label class="flex items-center cursor-pointer">
                <input type="checkbox" v-model="oneSale" class="hidden" />
                <div
                  :class="oneSale ? 'bg-green-500' : 'bg-gray-400'"
                  class="relative w-12 h-6 rounded-full shadow-inner"
                >
                  <span
                    :class="oneSale ? 'translate-x-full' : 'translate-x-0'"
                    class="absolute block w-6 h-6 bg-white rounded-full shadow transition-transform duration-200"
                  ></span>
                </div>
                <span class="ml-3 text-gray-600">{{ oneSale ? 'ВКЛ' : 'ВЫКЛ' }}</span>
              </label>
            </div>

            <!-- Возможность размена -->
            <div
              class="text-gray-700 font-medium"
              title="Разрешить выдачу сдачи без покупки (размен купюр)"
            >
              Возможность размена
            </div>
            <div>
              <label class="flex items-center cursor-pointer">
                <input type="checkbox" v-model="freeChange" class="hidden" />
                <div
                  :class="freeChange ? 'bg-green-500' : 'bg-gray-400'"
                  class="relative w-12 h-6 rounded-full shadow-inner"
                >
                  <span
                    :class="freeChange ? 'translate-x-full' : 'translate-x-0'"
                    class="absolute block w-6 h-6 bg-white rounded-full shadow transition-transform duration-200"
                  ></span>
                </div>
                <span class="ml-3 text-gray-600">{{ freeChange ? 'ВКЛ' : 'ВЫКЛ' }}</span>
              </label>
            </div>

            <!-- Емкость денежного ящика -->
            <div
              class="text-gray-700 font-medium"
              title="Максимальное количество монет в денежном ящике"
            >
              Емкость денежного ящика
            </div>
            <div>
              <input
                type="number"
                v-model="drawerCapacity"
                placeholder="Емкость денежного ящика"
                class="w-full p-2 border border-gray-300 rounded-md"
              />
            </div>

            <!-- Кассовый аппарат -->
            <div
              class="text-gray-700 font-medium"
              title="Включение или выключение контрольно-кассовой машины"
            >
              Кассовый аппарат
            </div>
            <div>
              <label class="flex items-center cursor-pointer">
                <input type="checkbox" v-model="kkmEnabled" class="hidden" />
                <div
                  :class="kkmEnabled ? 'bg-green-500' : 'bg-gray-400'"
                  class="relative w-12 h-6 rounded-full shadow-inner"
                >
                  <span
                    :class="kkmEnabled ? 'translate-x-full' : 'translate-x-0'"
                    class="absolute block w-6 h-6 bg-white rounded-full shadow transition-transform duration-200"
                  ></span>
                </div>
                <span class="ml-3 text-gray-600">{{ kkmEnabled ? 'ВКЛ' : 'ВЫКЛ' }}</span>
              </label>
            </div>
          </div>
          <div class="mt-6">
            <button @click="saveSettings" class="px-4 py-2 bg-blue-500 text-white rounded-md">
              {{ settingsLoaded ? 'Обновить настройки' : 'Сохранить настройки' }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import axios from 'axios'
import { ref, onMounted, onBeforeUnmount, markRaw, warn, watchEffect } from 'vue'
import OnlineKassaModal from '../kassa/OnlineKassaModal.vue'
import QrPaymentModal from '../kassa/QrPaymentModal.vue'
import { useRoute } from 'vue-router'

//Использование внешних библиотек vue-router, axios, e.t.c.

const route = useRoute()
markRaw(OnlineKassaModal)
markRaw(QrPaymentModal)

//Реактивные значения

const settingsLoaded = ref(false)
const id = route.params.id
const cvEnabled = ref(false)
const bvEnabled = ref(false)
const rcEnabled = ref(false)
const cleEnabled = ref(false)
const cleLogin = ref('')
const clePassword = ref('')
const qrPaymentEnabled = ref(false)
const oneSale = ref(false)
const freeChange = ref(false)
const drawerCapacity = ref(0)
const kkmEnabled = ref(false)
const isModalOpen = ref(false)
const activeModal = ref(null)

//Инициализация функций

const getSettings = async () => {
  try {
    const response = await axios.get(`/machine/${id}/settings`)
    if (response.status === 200 && response.data && response.data.settings) {
      const settings = response.data.settings

      cvEnabled.value = settings.cvEnabled ?? false
      bvEnabled.value = settings.bvEnabled ?? false
      rcEnabled.value = settings.rcEnabled ?? false
      cleEnabled.value = settings.cleEnabled ?? false
      cleLogin.value = settings.cleLogin ?? ''
      clePassword.value = settings.clePassword ?? ''
      qrPaymentEnabled.value = settings.qrPaymentEnabled ?? false
      oneSale.value = settings.oneSale ?? false
      freeChange.value = settings.freeChange ?? false
      drawerCapacity.value = settings.drawerCapacity ?? 0
      kkmEnabled.value = settings.kkmEnabled ?? false

      settingsLoaded.value = true
    } else {
      console.error('Ответ сервера некорректен:', response.data)
    }
  } catch (error) {
    console.error('Ошибка при загрузке настроек:', error)
  }
}

const saveSettings = async () => {
  const settings = {
    cvEnabled: cvEnabled.value,
    bvEnabled: bvEnabled.value,
    rcEnabled: rcEnabled.value,
    cleEnabled: cleEnabled.value,
    cleLogin: cleLogin.value,
    clePassword: clePassword.value,
    qrPaymentEnabled: qrPaymentEnabled.value,
    oneSale: oneSale.value,
    freeChange: freeChange.value,
    drawerCapacity: drawerCapacity.value,
    kkmEnabled: kkmEnabled.value,
  }

  try {
    // Отправляем данные на сервер с помощью axios
    const response = await axios.post(`/machine/${id}/settings/post`, settings)
  } catch (error) {
    console.warn(error)
  }
}

const closeModals = () => {
  isModalOpen.value = false
  activeModal.value = null
}

const openModal = (modal) => {
  if (modal === 'OnlineKassaModal') {
    activeModal.value = OnlineKassaModal
  } else if (modal === 'QrPaymentModal') {
    activeModal.value = QrPaymentModal
  }
  isModalOpen.value = true
}

const toggleSwitch = (index) => {
  settings[index].value = !settings[index].value
}

const handleEscape = (event) => {
  if (event.key === 'Escape') {
    closeModals()
  }
}

//Использование vue хуков

onMounted(async () => {
  await getSettings()
  window.addEventListener('keydown', handleEscape)
})

onBeforeUnmount(() => {
  window.removeEventListener('keydown', handleEscape)
})
</script>
