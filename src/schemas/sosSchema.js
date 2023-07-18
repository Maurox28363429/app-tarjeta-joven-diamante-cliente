import { object, string } from 'yup';

const REQUIRED_MESSAGE = 'Este campo es requerido';

export const createSosSchema = object({
  name: string().required(REQUIRED_MESSAGE),
  phone: string().required(REQUIRED_MESSAGE),
  descripcion: string().required(REQUIRED_MESSAGE),
  img: string().required(REQUIRED_MESSAGE),
});

export const updateSosSchema = object({
  name: string(),
  phone: string(),
  descripcion: string(),
  img: string(),
});
