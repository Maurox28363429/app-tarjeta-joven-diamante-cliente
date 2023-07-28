import { object, string } from 'yup';

const REQUIRED_MESSAGE = 'Este campo es requerido';

export const directivosSchema = object({
  nombre: string().required(REQUIRED_MESSAGE),
  rol: string().required(REQUIRED_MESSAGE),
  telefono: string().required(REQUIRED_MESSAGE),
});
