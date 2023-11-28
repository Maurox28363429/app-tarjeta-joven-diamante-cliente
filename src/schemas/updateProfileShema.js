import { object, string } from 'yup';

import SCHEMAS_MESSAGE from 'src/shared/constansts/schemasMessage';

const requiredText = string().required(SCHEMAS_MESSAGE.required);
const email = string()
  .email(SCHEMAS_MESSAGE.invalidEmail)
  .required(SCHEMAS_MESSAGE.required);

export const updateProfileShema = object({
  name: requiredText,
  email,
  last_name: requiredText,
  phone: requiredText,
  sex: string(),
  address: string(),
  dni: string(),
  beneficiario_poliza_cedula: string(),
  beneficiario_poliza_name: string(),
  fecha_nacimiento: string(),
});
