import { object, string } from 'yup';

import SCHEMAS_MESSAGE from 'src/shared/constansts/schemasMessage';

const requiredText = string().required(SCHEMAS_MESSAGE.required);

export const passwordSchema = object({
  password: requiredText,
});
