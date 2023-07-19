import { object, string } from 'yup';

const REQUIRED_MESSAGE = 'Este campo es requerido';

export const createSosSchema = object({
  name: string().required(REQUIRED_MESSAGE),
  phone: string()
    .min(6, 'Se requiere mínimo 6 dígitos')
    .required(REQUIRED_MESSAGE),
  descripcion: string().required(REQUIRED_MESSAGE),
});
