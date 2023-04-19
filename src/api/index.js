import axios from "axios";

export const API_URL = "https://api.tarjetajovendiamante.com/api";
export const APP_URL = "https://api.tarjetajovendiamante.com";

console.log("API_URL", process.env);
export const instance = axios.create({
  baseURL: process.env.VUE_APP_API_URL,
  headers: { "X-Custom-Header": "foobar" },
});
