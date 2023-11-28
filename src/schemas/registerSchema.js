import { object, string, array } from 'yup';

import SCHEMAS_MESSAGE from 'src/shared/constansts/schemasMessage';

const requiredText = string().required(SCHEMAS_MESSAGE.required);

const password = string()
  .min(8, SCHEMAS_MESSAGE.invalidPassword)
  .required(SCHEMAS_MESSAGE.required);

const email = string()
  .email(SCHEMAS_MESSAGE.invalidEmail)
  .required(SCHEMAS_MESSAGE.required);

const provincia = array()
  .min(1, SCHEMAS_MESSAGE.requiredProvince)
  .required(SCHEMAS_MESSAGE.required);

export const registerSchema = object({
  name: requiredText,
  email,
  last_name: requiredText,
  phone: requiredText,
  password,
  sex: requiredText,
  provincia,
  vendedor: requiredText,
});
