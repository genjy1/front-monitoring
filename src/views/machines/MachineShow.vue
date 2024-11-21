<template>
  <div>
    <HeaderComponent />
    <div class="container mt-24 mx-auto my-0 w-4/5">
      <!-- Условие, чтобы подождать загрузки данных -->
      <div v-if="machine" class="sm:w-2/5">
        <div class="flex machine-header border-b mb-2 items-center">
          <h1 class="text-2xl font-medium pb-2">Автомат #{{ machine.id }}</h1>
        </div>

        <SuccessComponent v-if="message" :message="message" @close="message = ''" />

        <ErrorMessageComponent
          v-if="machine.status !== 'Online'"
          :text="'Нет связи с автоматом. Удаленное управление недоступно'"
        />

        <!-- Проверка на истечение подписки -->
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
    </div>
  </div>
</template>

<script setup>
import HeaderComponent from '@/components/HeaderComponent.vue'
import TabsComponent from '@/components/TabsComponent.vue'
import axios from 'axios'
import { ref, onMounted, computed, defineProps, defineAsyncComponent } from 'vue'
import { useRoute } from 'vue-router'
import ErrorMessageComponent from '@/components/messages/ErrorMessageComponent.vue'
import Preloader from '@/components/Preloader.vue'
import SettingsIcon from '@/components/icons/SettingsIcon.vue'
import SuccessComponent from '@/components/messages/SuccessComponent.vue'

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
  // Можно добавить дополнительные табы в будущем
]
const route = useRoute()
const machine = ref(false)
const machineHeader = ref('')
const message = ref()
const activeTab = ref('information')

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

// Обновляем данные машины
</script>
