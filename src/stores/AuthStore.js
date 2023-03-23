import { defineStore } from 'pinia'

export const useAuthStore = defineStore('userAuth', {
  state: () => ({
    userAuth: JSON.parse(localStorage.getItem('user')) || null
  }),
  actions: {
    clearUser () {
      localStorage.removeItem('user')
    },
    saveUser (user) {
      localStorage.setItem('user', JSON.stringify(user))
    }
  }
})
