import axios from "axios";

export const API_URL = "https://app.form.phoenixtechsa.com/api";
export const APP_URL = "https://app.form.phoenixtechsa.com";

export const instance = axios.create({
  baseURL: process.env.VUE_APP_API_URL,
  headers: { "X-Custom-Header": "foobar" },
});
