import { defineStore } from 'pinia'

export const useRecoveryPasswordStore = defineStore('recoveryPassword', {
  state: () => ({
    email: ''
  }),
  actions: {
    setEmail (newEmail) {
      this.email = newEmail
    }
  }
})
