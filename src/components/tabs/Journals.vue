<template>
  <div class="wrapper">
    <ul class="events" v-if="events.length > 0">
      <div class="head grid-cols-3 border-t hidden sm:grid">
        <div class="text-center border-x py-2">Номер</div>
        <div class="text-center border-x py-2">Дата и время</div>
        <div class="text-center border-x py-2">Сообщение</div>
      </div>
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
    <div v-else>Пока событий не обнаружено</div>
  </div>
</template>

<script setup>
import axios from 'axios'
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const id = route.params.id
const events = ref([])

const shortenedMessage = (message) => {
  return message.length > 79 ? message.slice(0, 79) + '...' : message
}

// Функция для получения данных
const getEvents = async () => {
  try {
    const response = await axios.get(`/machine/${id}/events`)

    events.value = response.data.events
  } catch (error) {
    console.error('Ошибка при получении событий:', error)
  }
}

// Вызываем при монтировании компонента
onMounted(getEvents)
</script>
