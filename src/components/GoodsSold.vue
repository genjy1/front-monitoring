``
<template>
  <!-- Заголовок списка -->
  <div class="head grid-cols-7 border-t hidden sm:grid">
    <div class="text-center border-x py-2">Дата и время</div>
    <div class="text-center border-x py-2">Код</div>
    <div class="text-center border-x py-2">Успешно</div>
    <div class="text-center border-x py-2">Название</div>
    <div class="text-center border-x py-2">Цена</div>
    <div class="text-center border-x py-2">Количество</div>
    <div class="text-center border-x py-2">Выручка</div>
  </div>

  <!-- Список выданных товаров -->
  <ul class="sales" v-if="goods.length > 0">
    <li
      v-for="good in goods"
      :key="goods.id"
      class="grid sm:grid-cols-7 gap-0 border-t last-of-type:border"
    >
      <div class="text-center border-x p-2">
        <span class="sm:hidden">Дата и время: </span>
        {{ new Date(good.created_at).toLocaleDateString('ru') }}
      </div>
      <div class="text-center border-x p-2">
        <span class="sm:hidden">Код</span>
        {{ good.code }}
      </div>
      <div class="text-center border-x p-2">
        <span class="sm:hidden" :class="good.complete ? 'bg-green-300' : 'bg-red-300'"
          >Успешно</span
        >
        {{ good.complete }}
      </div>
      <div class="text-center border-x p-2">
        <span class="sm:hidden">Название</span>
        {{ good.name }}
      </div>
      <div class="text-center border-x p-2">
        <span class="sm:hidden">Цена</span>
        {{ good.price }}
      </div>
      <div class="text-center border-x p-2">
        <span class="sm:hidden">Количество</span>
        {{ good.quantity }}
      </div>
      <div class="text-center border-x p-2">
        <span class="sm:hidden">Выручка</span>
        {{ good.revenue }}
      </div>
    </li>
  </ul>
</template>
<script setup>
defineProps({
  goods: Array,
})
</script>
