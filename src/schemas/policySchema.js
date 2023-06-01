import { object, string } from "yup";

const REQUIRED_MESSAGE = "Este campo es requerido";

export const policySchema = object({
  dni: string().required(REQUIRED_MESSAGE),
  beneficiario_poliza_cedula: string().required(REQUIRED_MESSAGE),
  beneficiario_poliza_name: string().required(REQUIRED_MESSAGE),
  dni_text: string().required(REQUIRED_MESSAGE),
});
