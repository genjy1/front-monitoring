<template>
  <div>
    <HeaderComponent />
    <div class="container mt-24 mx-auto w-4/5">
      <ViewHeader :text="header" />
      <hr class="my-2" />
      <div class="filter-wrapper grid grid-cols-8 gap-2">
        <button
          v-for="column in columns"
          @click="toggleColumn(column)"
          class="rounded border border-[#6B23A7] px-2 py-1"
          :inner-h-t-m-l="column[0] === true ? 'Показать' : 'Скрыть'"
        >
          {{ column[1] }}
        </button>
      </div>
      <table class="hidden sm:table table-auto w-full border mt-4">
        <thead>
          <tr class="border-b bg-[#eee]">
            <th class="border-r py-2 font-normal">#</th>
            <transition name="fade" v-if="columns.number && columns.number[0] === true">
              <th class="border-r py-2 font-normal">Номер</th>
            </transition>
            <transition name="fade" v-if="columns.name && columns.name[0] === true">
              <th class="border-r py-2 font-normal">Имя</th>
            </transition>
            <transition name="fade" v-if="columns.address && columns.address[0] === true">
              <th class="border-r py-2 font-normal">Адрес</th>
            </transition>
            <transition name="fade" v-if="columns.status && columns.status[0] === true">
              <th class="border-r py-2 font-normal">Статус</th>
            </transition>
            <transition name="fade" v-if="columns.condition && columns.condition[0] === true">
              <th class="border-r py-2 font-normal">Состояние</th>
            </transition>
            <transition name="fade" v-if="columns.errors && columns.errors[0] === true">
              <th class="border-r py-2 font-normal">Ошибки</th>
            </transition>
            <transition name="fade" v-if="columns.waterLevel && columns.waterLevel[0] === true">
              <th class="border-r py-2 font-normal">Уровень воды</th>
            </transition>
            <transition name="fade" v-if="columns.temperature && columns.temperature[0] === true">
              <th class="border-r py-2 font-normal">Температура</th>
            </transition>
            <transition name="fade" v-if="columns.cashCounter && columns.cashCounter[0] === true">
              <th class="border-r py-2 font-normal">Счётчик денег</th>
            </transition>
            <transition name="fade" v-if="columns.cashBox && columns.cashBox[0] === true">
              <th class="border-r py-2 font-normal">Кэшбокс</th>
            </transition>
            <transition name="fade" v-if="columns.stacker && columns.stacker[0] === true">
              <th class="border-r py-2 font-normal">Стэкер</th>
            </transition>
            <transition name="fade" v-if="columns.change && columns.change[0] === true">
              <th class="border-r py-2 font-normal">Сдача</th>
            </transition>
            <transition name="fade" v-if="columns.tubes && columns.tubes[0] === true">
              <th class="border-r py-2 font-normal">Тубы</th>
            </transition>
            <transition name="fade" v-if="columns.recycling && columns.recycling[0] === true">
              <th class="border-r py-2 font-normal">Рециклинг</th>
            </transition>
            <transition name="fade" v-if="columns.balance && columns.balance[0] === true">
              <th class="border-r py-2 font-normal">Баланс</th>
            </transition>
            <transition name="fade" v-if="columns.goodsSold && columns.goodsSold[0] === true">
              <th class="border-r py-2 font-normal">Продано товаров</th>
            </transition>
            <transition name="fade" v-if="columns.revenue && columns.revenue[0] === true">
              <th class="border-r py-2 font-normal">Выручка</th>
            </transition>
          </tr>
        </thead>
        <tbody>
          <tr v-for="machine in machines.data" :key="machine.id" class="border-b">
            <td class="py-2 text-center border-r">{{ machine.id }}</td>
            <transition name="fade" v-if="columns.number && columns.number[0] === true">
              <td class="py-2 border-r text-center">{{ machine.number }}</td>
            </transition>
            <transition name="fade" v-if="columns.name && columns.name[0] === true">
              <td class="py-2 border-r text-center">{{ machine.name }}</td>
            </transition>
            <transition name="fade" v-if="columns.address && columns.address[0] === true">
              <td class="py-2 border-r text-center">{{ machine.address }}</td>
            </transition>
            <transition name="fade" v-if="columns.status && columns.status[0] === true">
              <td
                class="py-2 border-r text-center"
                :class="machine.status === 'Online' ? 'text-green-800' : 'text-red-800'"
              >
                {{ machine.status }}
              </td>
            </transition>
            <transition name="fade" v-if="columns.condition && columns.condition[0] === true">
              <td class="py-2 border-r text-center">{{ machine.condition }}</td>
            </transition>
            <transition name="fade" v-if="columns.errors && columns.errors[0] === true">
              <td class="py-2 border-r text-center">{{ machine.errors }}</td>
            </transition>
            <transition name="fade" v-if="columns.cashCounter && columns.cashCounter[0] === true">
              <td class="py-2 border-r text-center">{{ machine.cash_counter }}</td>
            </transition>
            <transition name="fade" v-if="columns.change && columns.change[0] === true">
              <td class="py-2 border-r text-center">{{ machine.change }}</td>
            </transition>
            <transition name="fade" v-if="columns.tubes && columns.tubes[0] === true">
              <td class="py-2 border-r text-center">{{ machine.tubes }}</td>
            </transition>
            <transition name="fade" v-if="columns.recycling && columns.recycling[0] === true">
              <td class="py-2 border-r text-center">{{ machine.recycling }}</td>
            </transition>
            <transition name="fade" v-if="columns.balance && columns.balance[0] === true">
              <td class="py-2 border-r text-center">{{ machine.balance }}</td>
            </transition>
            <transition name="fade" v-if="columns.goodsSold && columns.goodsSold[0] === true">
              <td class="py-2 border-r text-center">{{ machine.goods_sold }}</td>
            </transition>
            <transition name="fade" v-if="columns.revenue && columns.revenue[0] === true">
              <td class="py-2 text-center">{{ machine.revenue }}</td>
            </transition>
          </tr>
        </tbody>
      </table>
      <Pagination :links="machines.links" @page-change="onPageChange" />
    </div>
  </div>
</template>

<script setup>
import HeaderComponent from '@/components/HeaderComponent.vue'
import ViewHeader from '@/components/ViewHeader.vue'
import Pagination from '@/components/Pagination.vue'
import { useUserStore } from '@/stores/userStore'
import { useColumnsStore } from '@/stores/columns'
import axios from 'axios'
import { onMounted, ref, onBeforeUnmount } from 'vue'

const header = 'Состояние автоматов'
const machines = ref([])

const userStore = useUserStore()
const columnsStore = useColumnsStore()
const columns = columnsStore.$state // Используем все состояние хранилища

const toggleColumn = (column) => {
  columnsStore.toggleColumn(column) // Переключаем состояние и сохраняем
}

const onPageChange = async (url) => {
  const response = await axios.get(url)
  machines.value = response.data
}

// Сохраняем столбцы перед размонтированием компонента
onBeforeUnmount(() => {
  columnsStore.saveColumns()
})

onMounted(async () => {
  if (!userStore.user) {
    await userStore.fetchUser()
  }

  columnsStore.loadColumns() // Загружаем сохранённое состояние столбцов

  const response = await axios.get(`http://127.0.0.1:8000/api/user/${userStore.user.id}/machines/`)
  machines.value = response.data
})
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition:
    opacity 0.5s ease,
    transform 0.5s ease;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>
