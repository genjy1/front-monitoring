<template>
  <div>
    <HeaderComponent />
    <div class="container mt-24 mx-auto w-4/5">
      <ViewHeader :text="header" />
      <hr class="my-2" />
      <div class="accordeon">
        <div>
          <!-- Заголовок аккордеона -->
          <button
            class="accordeon-name cursor-pointer flex w-full items-center py-2"
            @click="toggle(), toggleClass()"
          >
            {{ isOpen ? 'Закрыть фильтр' : 'Открыть фильтр' }}
            <AccountStroke
              class="transition-all ease-linear"
              :class="rotated === true ? 'rotate-180' : 'rotate-0'"
            />
          </button>
          <!-- Содержимое с анимацией -->
          <transition name="slide">
            <div
              v-show="isOpen"
              class="accordeon-content bg-white grid grid-cols-2 sm:grid-cols-9 gap-2"
            >
              <button
                v-for="(column, index) in columns"
                @click="toggleColumn(column, index)"
                class="rounded border border-[#6B23A7] px-2 py-1 hover:border-white hover:bg-[#6B23A7] hover:text-white transition-all"
                :class="
                  activeIndex === index
                    ? 'border-white bg-[#6B23A7] text-white'
                    : 'border-[#6B23A7]'
                "
              >
                {{ column[1] }}
              </button>
            </div>
          </transition>
        </div>
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

      <div class="grid grid-cols-1 sm:hidden gap-4 mt-4">
        <div
          v-for="machine in machines.data"
          :key="machine.id"
          class="border p-4 rounded-lg shadow"
        >
          <h3 class="font-bold text-lg mb-2">Автомат #{{ machine.id }}</h3>

          <!-- Поля карточки -->
          <div v-if="columns.number && columns.number[0] === true">
            <p><strong>Номер:</strong> {{ machine.number }}</p>
          </div>
          <div v-if="columns.name && columns.name[0] === true">
            <p><strong>Имя:</strong> {{ machine.name }}</p>
          </div>
          <div v-if="columns.address && columns.address[0] === true">
            <p><strong>Адрес:</strong> {{ machine.address }}</p>
          </div>
          <div v-if="columns.status && columns.status[0] === true">
            <p>
              <strong>Статус:</strong>
              <span :class="machine.status === 'Online' ? 'text-green-800' : 'text-red-800'">
                {{ machine.status }}
              </span>
            </p>
          </div>
          <div v-if="columns.condition && columns.condition[0] === true">
            <p><strong>Состояние:</strong> {{ machine.condition }}</p>
          </div>
          <div v-if="columns.errors && columns.errors[0] === true">
            <p><strong>Ошибки:</strong> {{ machine.errors }}</p>
          </div>
          <div v-if="columns.waterLevel && columns.waterLevel[0] === true">
            <p><strong>Уровень воды:</strong> {{ machine.water_level }}</p>
          </div>
          <div v-if="columns.temperature && columns.temperature[0] === true">
            <p><strong>Температура:</strong> {{ machine.temperature }}</p>
          </div>
          <div v-if="columns.cashCounter && columns.cashCounter[0] === true">
            <p><strong>Счётчик денег:</strong> {{ machine.cash_counter }}</p>
          </div>
          <div v-if="columns.cashBox && columns.cashBox[0] === true">
            <p><strong>Кэшбокс:</strong> {{ machine.cash_box }}</p>
          </div>
          <div v-if="columns.stacker && columns.stacker[0] === true">
            <p><strong>Стэкер:</strong> {{ machine.stacker }}</p>
          </div>
          <div v-if="columns.change && columns.change[0] === true">
            <p><strong>Сдача:</strong> {{ machine.change }}</p>
          </div>
          <div v-if="columns.tubes && columns.tubes[0] === true">
            <p><strong>Тубы:</strong> {{ machine.tubes }}</p>
          </div>
          <div v-if="columns.recycling && columns.recycling[0] === true">
            <p><strong>Рециклинг:</strong> {{ machine.recycling }}</p>
          </div>
          <div v-if="columns.balance && columns.balance[0] === true">
            <p><strong>Баланс:</strong> {{ machine.balance }}</p>
          </div>
          <div v-if="columns.goodsSold && columns.goodsSold[0] === true">
            <p><strong>Продано товаров:</strong> {{ machine.goods_sold }}</p>
          </div>
          <div v-if="columns.revenue && columns.revenue[0] === true">
            <p><strong>Выручка:</strong> {{ machine.revenue }}</p>
          </div>
        </div>
      </div>

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
import AccountStroke from '@/components/AccountStroke.vue'

const header = 'Состояние автоматов'
const machines = ref([])
const isOpen = ref(false)
const rotated = ref(false)
const toggled = ref(false)
const activeIndex = ref(null)

const userStore = useUserStore()
const columnsStore = useColumnsStore()
const columns = columnsStore.$state // Используем все состояние хранилища

const toggleColumn = (column, index) => {
  columnsStore.toggleColumn(column) // Переключаем состояние и сохраняем
  activeIndex.value = index
}

const onPageChange = async (url) => {
  const response = await axios.get(url)
  machines.value = response.data
}

const toggleClass = () => {
  rotated.value = !rotated.value
}

const toggle = () => {
  isOpen.value = !isOpen.value
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
/* Анимация для открытия/закрытия */
.slide-enter-active,
.slide-leave-active {
  transition: all 0.3s ease;
  overflow: hidden; /* Скрываем содержимое, выходящее за пределы */
}
.slide-enter-from,
.slide-leave-to {
  height: 0;
  opacity: 0;
}
.slide-enter-to,
.slide-leave-from {
  height: auto;
  opacity: 1;
}
</style>
