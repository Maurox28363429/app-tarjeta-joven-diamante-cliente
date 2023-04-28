import axios from 'axios'

export const instance = axios.create({
  baseURL: process.env.VUE_APP_API_URL,
  headers: { 'X-Custom-Header': 'foobar' }
})
