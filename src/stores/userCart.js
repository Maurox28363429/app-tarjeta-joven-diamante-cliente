import { defineStore } from 'pinia'
import getUser from '../api/getUser'

export const userCart = defineStore('cart', {
  client: {},
  actions: {
    setClient (id) {
      return getUser(id).then((response) => {
        this.client = response
        return this.client
      })
    },
    getClient () {
      return this.client
    }
  }
})
