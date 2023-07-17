import { object, string, number } from 'yup';

const REQUIRED_MESSAGE = 'Este campo es requerido';

export const paymentShema = object().shape({
  img: string().required(REQUIRED_MESSAGE),
  referencia: number(),
  membresia_id: number().required(REQUIRED_MESSAGE),
  payment: number().required(REQUIRED_MESSAGE),
  user_id: number().required(REQUIRED_MESSAGE),
});

export const paymentShemaUpdate = object().shape({
  membresia_id: object()
    .shape({ label: string(), value: number() })
    .required(REQUIRED_MESSAGE),
  user_id: object()
    .shape({ label: string(), value: number() })
    .required(REQUIRED_MESSAGE),
});
