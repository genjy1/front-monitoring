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
    <div class="my-4 border rounded-2xl p-4">
      <!-- Таблица настроек -->
      <form @submit.prevent="settingsLoaded ? updateSettings() : saveSettings()">
        <div class="grid grid-cols-2 gap-y-4 gap-x-6">
          <div v-for="(setting, index) in settingsList" :key="index">
            <div class="text-gray-700 font-medium" :title="setting.title">
              {{ setting.label }}
            </div>
            <ToggleSwitch v-model="setting.value" />
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
        </div>

        <div class="mt-6">
          <button
            :disabled="isLoading"
            class="px-4 py-2 bg-blue-500 text-white rounded-md w-full sm:w-auto"
          >
            {{
              isLoading
                ? 'Загрузка...'
                : settingsLoaded
                  ? 'Обновить настройки'
                  : 'Сохранить настройки'
            }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, markRaw } from 'vue'
import { useRoute } from 'vue-router'
import axios from 'axios'
import ToggleSwitch from '../ToggleSwitch.vue'
import OnlineKassaModal from '../kassa/OnlineKassaModal.vue'
import QrPaymentModal from '../kassa/QrPaymentModal.vue'

// Модальные окна
const isModalOpen = ref(false)
const activeModal = ref(null)

// Реактивные значения
const settingsLoaded = ref(false)
const isLoading = ref(false)
const route = useRoute()
const id = route.params.id
const cleLogin = ref('')
const clePassword = ref('')
const drawerCapacity = ref(0)

const settingsList = ref([
  {
    key: 'cvEnabled',
    label: 'Монетоприемник',
    title: 'Включение или выключение монетоприемника',
    value: ref(false),
  },
  {
    key: 'bvEnabled',
    label: 'Купюроприемник',
    title: 'Включение или выключение купюроприемника',
    value: ref(false),
  },
  {
    key: 'rcEnabled',
    label: 'Модуль рециклинга',
    title: 'Включение или выключение модуля рециклинга купюр',
    value: ref(false),
  },
  {
    key: 'cleEnabled',
    label: 'Эквайринг',
    title: 'Включение или выключение модуля безналичной оплаты',
    value: ref(false),
  },
  {
    key: 'qrPaymentEnabled',
    label: 'QR-платежи',
    title: 'Включение или выключение платежей по QR-коду',
    value: ref(false),
  },
  {
    key: 'oneSale',
    label: 'Режим одной продажи',
    title: 'Автоматически выдавать сдачу после выдачи одного товара',
    value: ref(false),
  },
  {
    key: 'freeChange',
    label: 'Возможность размена',
    title: 'Разрешить выдачу сдачи без покупки (размен купюр)',
    value: ref(false),
  },
  {
    key: 'kkmEnabled',
    label: 'Кассовый аппарат',
    title: 'Включение или выключение контрольно-кассовой машины',
    value: ref(false),
  },
])

// Получение настроек
const getSettings = async () => {
  isLoading.value = true
  try {
    const response = await axios.get(`/machine/${id}/settings`)
    if (response.status === 200 && response.data && response.data.settings) {
      const settings = response.data.settings

      settingsList.value.forEach((item) => {
        if (typeof item.value === 'object' && 'value' in item.value) {
          // Если item.value — это ref, обновляем значение
          item.value.value = settings[item.key] ?? false
        } else {
          // Если item.value не ref, преобразуем в ref
          item.value = ref(settings[item.key] ?? false)
          // console.warn(`Преобразовано в ref:`, item)
        }
      })

      cleLogin.value = settings.cleLogin ?? ''
      clePassword.value = settings.clePassword ?? ''
      drawerCapacity.value = settings.drawerCapacity ?? 0
      settingsLoaded.value = true
    }
  } catch (error) {
    console.error('Ошибка при загрузке настроек:', error)
  } finally {
    isLoading.value = false
  }
}

// Сохранение настроек
const saveSettings = async () => {
  isLoading.value = true
  const settings = settingsList.value.reduce(
    (acc, item) => ({ ...acc, [item.key]: item.value.value }),
    {
      cleLogin: cleLogin.value,
      clePassword: clePassword.value,
      drawerCapacity: drawerCapacity.value,
    },
  )

  try {
    await axios.post(`/machine/${id}/settings/post`, settings)
    settingsLoaded.value = true
  } catch (error) {
    console.error('Ошибка сохранения настроек:', error)
  } finally {
    isLoading.value = false
  }
}

// Обновление настроек
const updateSettings = async () => {
  isLoading.value = true
  const settings = settingsList.value.reduce((acc, item) => ({ ...acc, [item.key]: item.value }), {
    cleLogin: cleLogin.value,
    clePassword: clePassword.value,
    drawerCapacity: drawerCapacity.value,
  })

  try {
    await axios.patch(`/machine/${id}/settings/update`, settings)
  } catch (error) {
    console.error('Ошибка обновления настроек:', error)
  } finally {
    isLoading.value = false
  }
}

// Управление модальными окнами
const closeModals = () => {
  isModalOpen.value = false
  activeModal.value = null
}

const openModal = async (modal) => {
  activeModal.value =
    modal === 'OnlineKassaModal'
      ? (await import('../kassa/OnlineKassaModal.vue')).default
      : (await import('../kassa/QrPaymentModal.vue')).default

  isModalOpen.value = true
}

// Хуки
onMounted(getSettings)
</script>
