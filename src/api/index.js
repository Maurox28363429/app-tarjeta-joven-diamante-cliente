import axios from 'axios';
import { Notify } from 'quasar';

export const instance = axios.create({
  baseURL: 'https://api.tarjetajovendiamante.com/api/',
  headers: { 'X-Custom-Header': 'foobar' },
});

instance.defaults.headers.common['Content-Type'] = 'application/json';

instance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error?.code === 'ERR_NETWORK') {
      Notify.create({
        message: 'Verifica tu conexión a internet',
        type: 'warning',
        icon: 'report_problem',
      });
    }
    console.log(error, 'error');
    return Promise.reject(error);
  }
);
