import { object, string } from 'yup';

import SCHEMAS_MESSAGE from 'src/shared/constansts/schemasMessage';

const requiredText = string().required(SCHEMAS_MESSAGE.required);
const parentesco = string().required(SCHEMAS_MESSAGE.required);

export const policySchema = object({
  dni: requiredText,
  beneficiario_poliza_cedula: requiredText,
  beneficiario_poliza_name: requiredText,
  dni_text: requiredText,
  parentesco,
});
