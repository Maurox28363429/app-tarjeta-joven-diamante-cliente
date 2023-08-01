import { number, object, string } from 'yup';

const REQUIRED_MESSAGE = 'Este campo es requerido';

export const consecutiveSchema = object({
  nombre: string().required(REQUIRED_MESSAGE),
  valor: number().required(REQUIRED_MESSAGE),
});
