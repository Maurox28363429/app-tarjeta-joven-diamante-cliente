import { object, string } from 'yup';

const REQUIRED_MESSAGE = 'Este campo es requerido';

export const sendPaymentShema = object({
  img: string().required(REQUIRED_MESSAGE),
  referencia: string().required(REQUIRED_MESSAGE),
});
