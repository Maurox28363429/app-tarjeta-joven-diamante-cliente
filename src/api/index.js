import axios from "axios";

const API_URL = "https://app.form.phoenixtechsa.com/api";

export const instance = axios.create({
  baseURL: API_URL,
  headers: { "X-Custom-Header": "foobar" },
});
