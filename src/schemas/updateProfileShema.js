import { object, string } from "yup";

const REQUIRED_MESSAGE = "Este campo es requerido";
const EMAIL_MESSAGE = "Ingrese un email valido";

export const updateProfileShema = object({
  name: string().required(REQUIRED_MESSAGE),
  email: string().email(EMAIL_MESSAGE).required(REQUIRED_MESSAGE),
  last_name: string().required(REQUIRED_MESSAGE),
  phone: string().required(REQUIRED_MESSAGE),
  sex: string(),
  address: string(),
});
