<template>
  <div class="">
    <!-- Контейнер с горизонтальной прокруткой -->
    <div class="hidden sm:block overflow-x-auto">
      <div class="grid grid-cols-8 gap-2 text-left bg-gray-100 rounded-t-md">
        <!-- Заголовки таблицы -->
        <div class="font-semibold px-4 py-2">Код</div>
        <div class="font-semibold px-4 py-2">Название</div>
        <div class="font-semibold px-4 py-2">Включена</div>
        <div class="font-semibold px-4 py-2">Доступна</div>
        <div class="font-semibold px-4 py-2">Цена</div>
        <div class="font-semibold px-4 py-2">Остаток</div>
        <div class="font-semibold px-4 py-2">Емкость</div>
        <div class="font-semibold px-4 py-2">Годен до</div>
      </div>

      <!-- Строки данных -->
      <div
        v-for="(item, index) in positions"
        :key="item.code"
        class="grid grid-cols-8 gap-2 border-b text-sm"
      >
        <div class="px-4 py-2">{{ item.code }}</div>
        <div class="px-4 py-2 truncate">{{ item.name }}</div>
        <div class="px-4 py-2 flex justify-center">
          {{ item.enabled ? 'Да' : 'Нет' }}
        </div>
        <div class="px-4 py-2 flex justify-center">
          {{ item.available ? 'Да' : 'Нет' }}
        </div>
        <div class="px-4 py-2">{{ item.price }}</div>
        <div class="px-4 py-2">{{ item.stock }}</div>
        <div class="px-4 py-2">{{ item.capacity }}</div>
        <div class="px-4 py-2">{{ item.expiryDate }}</div>
      </div>
    </div>
    <!-- Карточки для мобильных устройств -->
    <div
      v-for="(item, index) in positions"
      :key="item.code"
      class="md:hidden border rounded-md mb-4 p-4 bg-white shadow"
    >
      <div class="grid grid-cols-2 gap-4 mb-2">
        <div class="font-semibold">Код:</div>
        <div>{{ item.code }}</div>
        <div class="font-semibold">Название:</div>
        <div>{{ item.name }}</div>
        <div class="font-semibold">Включена:</div>
        <div>
          {{ item.enabled ? 'Да' : 'Нет' }}
        </div>
        <div class="font-semibold">Доступна:</div>
        <div>
          {{ item.available ? 'Да' : 'Нет' }}
        </div>
        <div class="font-semibold">Цена:</div>
        <div>{{ item.price }}</div>
        <div class="font-semibold">Остаток:</div>
        <div>{{ item.stock }}</div>
        <div class="font-semibold">Емкость:</div>
        <div>{{ item.capacity }}</div>
        <div class="font-semibold">Годен до:</div>
        <div>{{ item.expiryDate }}</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const positions = ref([
  {
    code: '111',
    name: 'Короткое название',
    enabled: true,
    available: true,
    price: 1,
    stock: 'ОТКЛ',
    capacity: 'ОТКЛ',
    expiryDate: 'ОТКЛ',
  },
  {
    code: '112',
    name: 'Длинное название товара для теста',
    enabled: true,
    available: true,
    price: 1,
    stock: 'ОТКЛ',
    capacity: 'ОТКЛ',
    expiryDate: 'ОТКЛ',
  },
  {
    code: '113',
    name: 'Ещё длиннее название для проверки, обрезки текста',
    enabled: true,
    available: true,
    price: 1,
    stock: 'ОТКЛ',
    capacity: 'ОТКЛ',
    expiryDate: 'ОТКЛ',
  },
])

const saveSettings = () => {
  console.log('Сохранение данных:', positions.value)
  alert('Настройки сохранены!')
}
</script>

<style scoped>
/* Добавление гибкости к таблице */
.overflow-x-auto {
  max-width: 100%;
  overflow-x: auto;
}
</style>
