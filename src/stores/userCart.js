import { defineStore } from 'pinia'
import getUser from '../api/getUser'

export const userCart = defineStore('recoveryPassword', {
  client: {},
  actions: {
    setClient (id) {
      getUser(id).then((response) => {
        this.client = response
      })
      return this.client
    }
  }
})
