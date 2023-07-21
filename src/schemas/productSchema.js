import { object, string } from 'yup';

const REQUIRED_MESSAGE = 'Este campo es requerido';

export const productSchema = object({
  descripcion: string().required(REQUIRED_MESSAGE),
  precio: string().required(REQUIRED_MESSAGE),
  stock: string().required(REQUIRED_MESSAGE),
  whatsap: string().required(REQUIRED_MESSAGE),
  nombre: string().required(REQUIRED_MESSAGE),
});
