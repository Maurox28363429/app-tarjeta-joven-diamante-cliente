import { defineStore } from 'pinia'
import loginUser from 'src/api/loginUser'
import registerUser from 'src/api/registerUser'

/* eslint-disable camelcase */

export const useAuthStore = defineStore('userAuth', {
  state: () => ({
    user: JSON.parse(localStorage.getItem('user'))?.user || null,
    token: JSON.parse(localStorage.getItem('user'))?.token || null
  }),
  actions: {
    logout () {
      this.user = null
      this.token = null
      localStorage.removeItem('user')
    },
    async login ({ email, password }) {
      const { data } = await loginUser({ email, password })
      this.user = data.user
      this.token = data.token
      localStorage.setItem('user', JSON.stringify(data))

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
      localStorage.setItem('user', JSON.stringify(data))
      this.router.push('/memberships')
    }
  }
})
