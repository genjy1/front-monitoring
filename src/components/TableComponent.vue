<script setup>
import Preloader from './Preloader.vue'

const props = defineProps({
  theader: Array,
  data: {
    type: Object,
    default: null,
  },
  cells: Array,
})
</script>

<template>
  <table class="sm:table hidden table-auto w-full border">
    <thead>
      <tr class="bg-[#eee]">
        <th class="font-normal py-2" v-for="(th, index) in theader" :key="index">{{ th }}</th>
      </tr>
    </thead>
    <tbody>
      <!-- Проверяем, что data не равно null и содержит данные -->
      <tr
        v-if="data && data.data"
        v-for="(td, index) in data.data"
        :key="index"
        class="border-b border-x even:bg-[#eee]"
      >
        <td class="text-center py-2 border-r">{{ td.id }}</td>
        <td class="text-center py-2 border-r">{{ td.dateTime || '-' }}</td>
        <td class="text-center py-2 border-r">{{ td.moneyReceived || '-' }}</td>
        <td class="text-center py-2 border-r">{{ td.changeGiven || '-' }}</td>
        <td class="text-center py-2 border-r">{{ td.products || '-' }}</td>
        <td class="text-center py-2">{{ td.revenue || '-' }}</td>
      </tr>
      <!-- Сообщение, если данных нет -->
      <tr v-else>
        <td colspan="6" class="text-center px-[50%] w-4/5 py-10">
          <Preloader />
        </td>
      </tr>
    </tbody>
  </table>
</template>
