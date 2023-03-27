import { defineStore } from 'pinia'
import loginUser from 'src/api/loginUser'
import registerUser from 'src/api/registerUser'
import localStorageAuth from 'src/utils/localStorageAuth'

/* eslint-disable camelcase */

export const useAuthStore = defineStore('userAuth', {
  state: () => ({
    user: localStorageAuth.getUser()?.user || null,
    token: localStorageAuth.getUser()?.token || null
  }),
  actions: {
    logout () {
      this.user = null
      this.token = null
      localStorageAuth.removeUser()
    },
    async login ({ email, password }) {
      const { data } = await loginUser({ email, password })
      this.user = data.user
      this.token = data.token
      localStorageAuth.setUser(data)

      if (
        this.user.membresia?.status === 'activa' ||
        this.user.membresia?.days > 0
      ) {
        this.router.push('/home')
      } else {
        this.router.push('/memberships')
      }
    },
    async register ({ name, email, last_name, phone, sex, password, role_id }) {
      const { data } = await registerUser({
        name,
        email,
        last_name,
        phone,
        sex,
        password,
        role_id
      })
      this.user = data.user
      this.token = data.token
      localStorageAuth.setUser(data)
      this.router.push('/memberships')
    }
  }
})
