<template>
  <!-- Заголовок списка -->
  <div class="head grid-cols-5 border-t hidden sm:grid">
    <div class="text-center border-x py-2">Дата и время</div>
    <div class="text-center border-x py-2">Принято денег</div>
    <div class="text-center border-x py-2">Выдано сдачи</div>
    <div class="text-center border-x py-2">Товары</div>
    <div class="text-center border-x py-2">Выручка</div>
  </div>

  <!-- Список продаж -->
  <ul class="sales" v-if="sales.length > 0">
    <li
      v-for="sale in sales"
      :key="sales.id"
      class="grid sm:grid-cols-5 gap-0 border-t last-of-type:border"
    >
      <div class="text-center border-x p-2">
        <span class="sm:hidden">Дата и время: </span>{{ sale.dateTime }}
      </div>
      <div class="text-center border-x p-2">
        <span class="sm:hidden">Принято денег</span>{{ sale.cash_received }}
      </div>
      <div class="text-center border-x p-2">
        <span class="sm:hidden">Выдано сдачи</span>{{ sale.change_given }}
      </div>
      <div class="text-center border-x p-2">
        <span class="sm:hidden">Товары</span>{{ sale.goods }}
      </div>
      <div class="text-center border-x p-2">
        <span class="sm:hidden">Выручка</span>{{ sale.revenue }}
      </div>
    </li>
  </ul>
</template>
<script setup>
defineProps({
  sales: Array,
})
</script>
