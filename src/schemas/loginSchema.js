import { object, string } from 'yup';

import SCHEMAS_MESSAGE from 'src/shared/constansts/schemasMessage';

const password = string().required(SCHEMAS_MESSAGE.required);
const email = string()
  .email(SCHEMAS_MESSAGE.invalidEmail)
  .required(SCHEMAS_MESSAGE.required);

export const loginSchema = object({
  email,
  password,
});
