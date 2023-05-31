import { object, string, array } from "yup";

const REQUIRED_MESSAGE = "Este campo es requerido";
const EMAIL_MESSAGE = "Ingrese un email valido";

export const registerSchema = object({
  name: string().required(REQUIRED_MESSAGE),
  email: string().email(EMAIL_MESSAGE).required(REQUIRED_MESSAGE),
  last_name: string().required(REQUIRED_MESSAGE),
  phone: string().required(REQUIRED_MESSAGE),
  password: string()
    .min(8, "Debe tener al menos 8 caracteres")
    .required(REQUIRED_MESSAGE),
  sex: string().required(REQUIRED_MESSAGE),
  provincia: array()
    .min(1, "Debe seleccionar al menos una provincia")
    .required(REQUIRED_MESSAGE),
  vendedor: string().required(REQUIRED_MESSAGE),
});
