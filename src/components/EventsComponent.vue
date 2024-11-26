<template>
  <!-- Заголовок списка -->
  <div class="head grid-cols-3 border-t hidden sm:grid">
    <div class="text-center border-x py-2">Номер</div>
    <div class="text-center border-x py-2">Дата и время</div>
    <div class="text-center border-x py-2">Сообщение</div>
  </div>

  <!-- Список событий -->
  <ul class="events" v-if="events.length > 0">
    <li
      v-for="event in events"
      :key="event.id"
      class="grid sm:grid-cols-3 gap-0 border-t last-of-type:border"
    >
      <div class="text-center border-x p-2"><span>Номер: </span>{{ event.local_id }}</div>
      <div class="text-center border-x p-2"><span>Дата и время: </span>{{ event.datetime }}</div>
      <div class="text-center border-x p-2" :title="event.message">
        <span>Сообщение: </span>
        {{ shortenedMessage(event.message) }}
      </div>
    </li>
  </ul>
</template>
<script setup>
const shortenedMessage = (message) => {
  if (!message) return 'Сообщение отсутствует'
  return message.length > 79 ? message.slice(0, 79) + '...' : message
}
defineProps({
  events: Array,
})
</script>
