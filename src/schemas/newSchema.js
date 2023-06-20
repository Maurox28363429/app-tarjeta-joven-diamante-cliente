import { object, string } from 'yup';

const REQUIRED_MESSAGE = 'Este campo es requerido';

export const newSchema = object({
  titulo: string().required(REQUIRED_MESSAGE),
  descripcion: string().required(REQUIRED_MESSAGE),
  prioridad: string().required(REQUIRED_MESSAGE),
  img: string().required(REQUIRED_MESSAGE),
});
