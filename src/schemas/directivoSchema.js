import { object, string } from 'yup';

import SCHEMAS_MESSAGE from 'src/shared/constansts/schemasMessage';

const requiredText = string().required(SCHEMAS_MESSAGE.required);
const telefono = string()
  .min(6, SCHEMAS_MESSAGE.invalidPhoneLength)
  .required(SCHEMAS_MESSAGE.required);

export const directivosSchema = object({
  nombre: requiredText,
  rol: requiredText,
  telefono,
});
