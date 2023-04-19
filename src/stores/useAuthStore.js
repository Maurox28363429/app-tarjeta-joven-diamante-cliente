import { defineStore } from 'pinia'
import loginUser from 'src/api/loginUser'
import registerUser from 'src/api/registerUser'
import localStorageAuth from 'src/utils/localStorageAuth'
import membershipsTest from 'src/api/membershipsTest'
import ROLE_ID from 'src/utils/roleId'

export const useAuthStore = defineStore('userAuth', {
  state: () => ({
    user: localStorageAuth.getUser()?.user || null,
    token: localStorageAuth.getUser()?.token || null
  }),
  actions: {
    updated () {
      this.user = localStorageAuth.getUser()?.user || null
      this.token = localStorageAuth.getUser()?.token || null
    },
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

      this.router.push({ path: `/${ROLE_ID[this.user.role_id]}` })
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
      this.router.push({ path: `/${ROLE_ID[this.user.role_id]}` })
    },
    async addMembership ({ user_id }) {
      const { data } = await membershipsTest({ user_id })
      this.user.membresia = data
      localStorageAuth.setUser({ user: this.user, token: this.token })
    }
  }
})
