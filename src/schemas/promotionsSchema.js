import { object, string } from 'yup';

const REQUIRED_MESSAGE = 'Este campo es requerido';

export const promotionsSchema = object({
  titulo: string().required(REQUIRED_MESSAGE),
  categoria: string().required(REQUIRED_MESSAGE),
  descripcion: string().required(REQUIRED_MESSAGE),
  prioridad: string().required(REQUIRED_MESSAGE),
  img: string().required(REQUIRED_MESSAGE),
  link_youtube: string().required(REQUIRED_MESSAGE),
  link_facebook: string().required(REQUIRED_MESSAGE),
  link_instragram: string().required(REQUIRED_MESSAGE),
  link_web: string().required(REQUIRED_MESSAGE),
  link_otros: string().required(REQUIRED_MESSAGE),
});
