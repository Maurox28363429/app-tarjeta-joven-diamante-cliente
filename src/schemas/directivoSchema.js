import { object, string } from 'yup';

const REQUIRED_MESSAGE = 'Este campo es requerido';

export const directivosSchema = object({
  nombre: string().required(REQUIRED_MESSAGE),
  rol: string().required(REQUIRED_MESSAGE),
  telefono: string()
    .min(8, 'debe tener 8 digitos')
    .max(8, 'Debe tener 8 digitos')
    .required(REQUIRED_MESSAGE),
});
