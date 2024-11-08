// stores/userStore.js
import { defineStore } from 'pinia'
import axios from 'axios'

export const useUserStore = defineStore('user', {
  state: () => ({
    user: null, // Данные о пользователе
  }),

  actions: {
    async fetchUser() {
      try {
        const response = await axios.get('user')
        this.user = response.data
      } catch (error) {
        console.error('Не удалось получить данные пользователя', error)
        this.user = null
      }
    },

    // Действие для выхода
    async logout() {
      try {
        // Отправляем запрос на сервер для выхода
        await axios.post('/logout')

        // Очистка данных пользователя в хранилище
        this.user = null

        // Удаление токена из локального хранилища (если есть)
        localStorage.removeItem('token')
        sessionStorage.removeItem('token')
      } catch (error) {
        console.error('Ошибка при выходе из системы', error)
      }
    },
  },
})
