import axios from 'axios'

export const API_URL = 'https://api.tarjetajovendiamante.com/api'
export const APP_URL = 'https://api.tarjetajovendiamante.com'

export const instance = axios.create({
  baseURL: API_URL,
  headers: { 'X-Custom-Header': 'foobar' }
})
