import { object, string } from "yup";

const REQUIRED_MESSAGE = "Este campo es requerido";
const EMAIL_MESSAGE = "Ingrese un email valido";

export const loginSchema = object({
  email: string().email(EMAIL_MESSAGE).required(REQUIRED_MESSAGE),
  password: string().required(REQUIRED_MESSAGE),
});
