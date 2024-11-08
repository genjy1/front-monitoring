import { defineStore } from 'pinia'
import axios from 'axios'

export const useUserStore = defineStore('user', {
  state: () => ({
    user: null,
    token: localStorage.getItem('token') || null,
  }),
  actions: {
    async fetchUser() {
      if (!this.token) return

      try {
        const response = await axios.get('http://127.0.0.1:8000/api/user', {
          headers: {
            Authorization: `Bearer ${this.token}`,
          },
        })
        this.user = response.data
      } catch (error) {
        console.error('Error fetching user data:', error)
      }
    },
    setUser(data) {
      this.user = data
    },
  },
})
