import { number, object, string } from 'yup';

import SCHEMAS_MESSAGE from 'src/shared/constansts/schemasMessage';

export const consecutiveSchema = object({
  nombre: string().required(SCHEMAS_MESSAGE.required),
  valor: number().required(SCHEMAS_MESSAGE.required),
});
