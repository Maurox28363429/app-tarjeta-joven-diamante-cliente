import { object, string } from 'yup';
import SCHEMAS_MESSAGE from 'src/shared/constansts/schemasMessage';

export const emailSchema = object({
  email: string()
    .email(SCHEMAS_MESSAGE.invalidEmail)
    .required(SCHEMAS_MESSAGE.required),
});
