<template>
  <div>
    <HeaderComponent class="z-0" />
    <div class="container mt-[5.5rem] mx-auto my-0 w-4/5 sm:grid sm:grid-cols-2 justify-stretch">
      <div v-if="machine" class="machine-info">
        <div class="flex machine-header border-b mb-2 items-center justify-between">
          <h1 class="text-2xl font-medium pb-2">Автомат #{{ machine.id }}</h1>
          <button
            class="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
            @click="openModal"
          >
            Отвязать автомат
          </button>
        </div>

        <SuccessComponent v-if="message" :message="message" @close="message = ''" />
        <ErrorMessageComponent
          v-if="machine.status !== 'Online'"
          :text="errorText"
          @close="errorText = ''"
        />
        <p v-if="subscriptionIsNotToday" class="text-red-800">
          Внимание: подписка истекает {{ machine.subscription_until }}!
        </p>

        <p class="text-justify">
          Основные сведения об автомате. <br />
          Вы можете изменить некоторые поля и нажать "Сохранить", чтобы запомнить изменения.
          Некоторые функции могут быть доступны только в режиме "Online".
        </p>
        <TabsComponent
          :tabs="tabs"
          :active-tab.sync="activeTab"
          @update:activeTab="changeActiveTab"
          :machine="machine"
          :data="data"
        />
      </div>
      <Preloader v-else class="relative left-[50vmax] mt-96" />
      <div
        class="hidden sm:block machine-img w-auto h-[824px] bg-contain bg-center bg-no-repeat"
        :class="
          machine
            ? 'bg-[url(https://vend-shop.com/image/cache/catalog/SM%206367%20Original/sm-vendor-lond-vendshop-torgovyj-avtomat-left-350x650.png)]'
            : ''
        "
      ></div>
    </div>

    <!-- Модальное окно для подтверждения отвязки автомата -->
    <ModalConfirmDetach
      v-if="isDetaching"
      :machine-id="machine.id"
      @close="closeModal"
      @confirm="detach"
      class="z-[9999]"
    />
  </div>
</template>

<script setup>
import axios from 'axios'
import { ref, onMounted, computed, defineProps, defineAsyncComponent } from 'vue'
import { useRoute } from 'vue-router'
import ErrorMessageComponent from '@/components/messages/ErrorMessageComponent.vue'
import Preloader from '@/components/Preloader.vue'
import SuccessComponent from '@/components/messages/SuccessComponent.vue'
import ModalConfirmDetach from '@/components/ModalConfirmDetach.vue' // Модальное окно
import HeaderComponent from '@/components/HeaderComponent.vue'
import TabsComponent from '@/components/TabsComponent.vue'

const errorText = ref('Нет связи с автоматом. Удаленное управление недоступно')
const tabs = [
  {
    name: 'information',
    label: 'Информация',
    component: 'MachineInfo',
    icon: defineAsyncComponent(() => import('@/components/icons/InfoIcon.vue')),
  },
  {
    name: 'settings',
    label: 'Настройки автомата',
    component: 'MachineSettings',
    icon: defineAsyncComponent(() => import('@/components/icons/SettingsIcon.vue')),
  },
  {
    name: 'monetary',
    label: 'Номиналы',
    component: 'MonetarySettings',
    icon: defineAsyncComponent(() => import('@/components/icons/MoneyIcon.vue')),
  },
  {
    name: 'journals',
    label: 'Журналы',
    component: 'Journals',
    icon: defineAsyncComponent(() => import('@/components/icons/JournalIcon.vue')),
  },
  {
    name: 'positions',
    label: 'Позиции',
    component: 'Positions',
    icon: defineAsyncComponent(() => import('@/components/icons/SettingsIcon.vue')),
  },
]
const route = useRoute()
const machine = ref(false)
const machineHeader = ref('')
const message = ref()
const activeTab = ref('information')
const isDetaching = ref(false) // Состояние открытия модального окна

const changeActiveTab = (newTab) => {
  activeTab.value = newTab
}

// Инициализация данных для формы
const data = ref({
  number: '',
  address: '',
  name: '',
  balance: '',
})

// Синхронизируем данные формы с machine после загрузки
onMounted(async () => {
  try {
    const response = await axios.get(`http://127.0.0.1:8000/api/machine/${route.params.id}`)
    machine.value = response.data
    machineHeader.value = `Автомат #${machine.value.id}`

    // Устанавливаем начальные значения формы
    data.value = {
      number: machine.value.number,
      address: machine.value.address,
      name: machine.value.name,
      balance: machine.value.balance,
    }
  } catch (error) {
    console.error('Ошибка при загрузке данных машины:', error)
  }
})

// Вычисляемое свойство, проверяющее, истекает ли подписка не сегодня
const subscriptionIsNotToday = computed(() => {
  const today = new Date().toISOString().slice(0, 10)
  return machine.value.subscription_until !== today
})

// Логика отвязки автомата с передачей controller_id
const detach = async (controllerId) => {
  try {
    const response = await axios.patch(`/machine/${machine.value.id}/detach`, {
      controller_id: controllerId,
    })
    const { success, error } = response.data

    if (success) {
      message.value = 'Автомат успешно отвязан'
    } else if (error) {
      errorText.value = error
    }
  } catch (error) {
    console.error('Ошибка при отвязке автомата:', error)
  } finally {
    closeModal()
  }
}

// Открытие модального окна
const openModal = () => {
  isDetaching.value = true
}

// Закрытие модального окна
const closeModal = () => {
  isDetaching.value = false
}
</script>
