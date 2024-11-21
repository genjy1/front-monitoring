<template>
  <HeaderComponent />
  <main class="mx-auto mt-20 w-4/5">
    <h1 class="text-3xl pb-2 font-semibold flex items-center justify-between mt-24">
      Состояние загрузки
    </h1>
    <hr />

    <div class="accordeon">
      <div>
        <!-- Заголовок аккордеона -->
        <button
          class="accordeon-name cursor-pointer flex w-full items-center justify-between py-2"
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
            class="accordeon-content bg-white grid grid-cols-2 sm:grid-cols-6 gap-2"
          >
            <button
              v-for="(column, index) in columns"
              @click="toggleColumn(column, index)"
              class="filter-button rounded border border-[#6B23A7] px-2 py-1 hover:border-white hover:bg-[#6B23A7] hover:text-white transition-all"
            >
              {{ column[1] }}
            </button>
          </div>
        </transition>
      </div>
    </div>
    <!-- Table for larger screens -->
    <table class="table-auto w-full border-x mt-6 hidden sm:table">
      <thead>
        <tr class="capitalize border-y bg-gray-200">
          <th class="font-normal border-r py-2 px-4" v-if="columns.number[0]"># автомата</th>
          <th class="font-normal border-r py-2 px-4" v-if="columns.address[0]">адрес</th>
          <th class="font-normal border-r py-2 px-4" v-if="columns.machine[0]">автомат</th>
          <th class="font-normal border-r py-2 px-4" v-if="columns.goodNumber[0]"># продукта</th>
          <th class="font-normal border-r py-2 px-4" v-if="columns.goodCode[0]">код продукта</th>
          <th class="font-normal border-r py-2 px-4" v-if="columns.good[0]">продукт</th>
          <th class="font-normal border-r py-2 px-4" v-if="columns.valid[0]">годен до</th>
          <th class="font-normal border-r py-2 px-4" v-if="columns.capacity[0]">вместимость</th>
          <th class="font-normal border-r py-2 px-4" v-if="columns.remains[0]">остаток</th>
          <th class="font-normal py-2 px-4" v-if="columns.add[0]">добавить</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="good in goods" :key="good.id" class="border-y hover:bg-gray-100/75">
          <td class="font-normal border-r py-2 px-4 text-center">{{ good.machine.id }}</td>
          <td class="font-normal border-r py-2 px-4 text-center" v-if="columns.address[0]">
            {{ good.machine.address }}
          </td>
          <td class="font-normal border-r py-2 px-4 text-center" v-if="columns.machine[0]">
            {{ good.machine.name || 'N/A' }}
          </td>
          <td class="font-normal border-r py-2 px-4 text-center" v-if="columns.goodNumber[0]">
            {{ good.id }}
          </td>
          <td class="font-normal border-r py-2 px-4 text-center" v-if="columns.goodCode[0]">
            {{ good.code }}
          </td>
          <td class="font-normal border-r py-2 px-4 text-center" v-if="columns.good[0]">
            {{ good.name }}
          </td>
          <td class="font-normal border-r py-2 px-4 text-center" v-if="columns.valid[0]">
            {{ good.valid || 'n/a' }}
          </td>
          <td class="font-normal border-r py-2 px-4 text-center" v-if="columns.capacity[0]">
            {{ good.machine.capacity || 'N/A' }}
          </td>
          <td class="font-normal border-r py-2 px-4 text-center" v-if="columns.remains[0]">
            {{ good.remains }}
          </td>
          <td class="font-normal py-2 px-4 text-center" v-if="columns.add[0]">0</td>
        </tr>
      </tbody>
    </table>

    <!-- Card layout for smaller screens -->
    <div class="grid grid-cols-1 gap-4 mt-6 sm:hidden">
      <div
        v-for="good in goods"
        :key="good.id"
        class="bg-white border rounded-lg shadow-lg p-4 hover:bg-gray-100 transition-colors"
      >
        <div class="font-bold text-lg text-gray-800 mb-2"># автомата: {{ good.id }}</div>
        <div class="text-sm text-gray-600 mb-2" v-if="columns.address[0]">
          <span class="font-semibold">Адрес:</span> {{ good.machine.address }}
        </div>
        <div class="text-sm text-gray-600 mb-2" v-if="columns.machine[0]">
          <span class="font-semibold">Автомат:</span> {{ good.machine.name || 'N/A' }}
        </div>
        <div class="text-sm text-gray-600 mb-2" v-if="columns.goodNumber[0]">
          <span class="font-semibold"># продукта:</span> {{ good.id }}
        </div>
        <div class="text-sm text-gray-600 mb-2" v-if="columns.goodCode[0]">
          <span class="font-semibold">Код продукта:</span> {{ good.code }}
        </div>
        <div class="text-sm text-gray-600 mb-2" v-if="columns.good[0]">
          <span class="font-semibold">Продукт:</span> {{ good.name }}
        </div>
        <div class="text-sm text-gray-600 mb-2" v-if="columns.valid[0]">
          <span class="font-semibold">Годен до:</span> {{ good.valid || 'n/a' }}
        </div>
        <div class="text-sm text-gray-600 mb-2" v-if="columns.capacity[0]">
          <span class="font-semibold">Вместимость:</span> {{ good.machine.capacity || 'N/A' }}
        </div>
        <div class="text-sm text-gray-600 mb-2" v-if="columns.remains[0]">
          <span class="font-semibold">Остаток:</span> {{ good.remains }}
        </div>
      </div>
    </div>
    <Pagination :links="links" @page-change="onPageChange" />
  </main>
</template>

<script setup>
import HeaderComponent from '@/components/HeaderComponent.vue'
import AccountStroke from '@/components/icons/AccountStroke.vue'
import { ref, watchEffect, onBeforeUnmount, onMounted } from 'vue'
import axios from 'axios'
import Pagination from '@/components/Pagination.vue'
import { useGoodsStateColumnsStore } from '@/stores/goodsStateColumns'

const columnsStore = useGoodsStateColumnsStore()
const columns = columnsStore.$state
const goods = ref([])
const counter = ref(1)
const links = ref()
const rotated = ref(false)
const isOpen = ref(false)

const toggleColumn = (column, index) => {
  columnsStore.toggleColumn(column) // Переключаем состояние и сохраняем
  activeIndex.value = index
}

const toggle = () => {
  isOpen.value = !isOpen.value
}

const toggleClass = () => {
  rotated.value = !rotated.value
}

const fetchGoods = async () => {
  try {
    const response = await axios.get(`/goods/state?page=${counter.value}`)
    goods.value = response.data.data
    links.value = response.data.links
  } catch (error) {
    console.error('Ошибка при загрузке товаров:', error)
  }
}

// Обработчик изменения страницы
const onPageChange = (url) => {
  const page = new URL(url).searchParams.get('page')
  counter.value = page
  fetchGoods()
}

onBeforeUnmount(() => {
  columnsStore.saveColumns()
})

onMounted(() => {
  columnsStore.loadColumns() // Загружаем сохранённое состояние столбцов})
})
watchEffect(fetchGoods)
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
