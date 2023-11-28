import { object, string } from 'yup';
import SCHEMAS_MESSAGE from 'src/shared/constansts/schemasMessage';

const requireText = string().required(SCHEMAS_MESSAGE.required);

const phone = string()
  .min(6, SCHEMAS_MESSAGE.invalidPhoneLength)
  .required(SCHEMAS_MESSAGE.required);

export const createSosSchema = object({
  name: requireText,
  phone,
  descripcion: requireText,
});
