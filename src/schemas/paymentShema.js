import { object, string, number } from 'yup';

import SCHEMAS_MESSAGE from 'src/shared/constansts/schemasMessage';

const requiredText = string().required(SCHEMAS_MESSAGE.required);
const requiredNumber = number().required(SCHEMAS_MESSAGE.required);

const membresia_id = object()
  .shape({ label: string(), value: number() })
  .required(SCHEMAS_MESSAGE.required);

const user_id = object()
  .shape({ label: string(), value: number() })
  .required(SCHEMAS_MESSAGE.required);

export const paymentShema = object().shape({
  img: requiredText,
  referencia: number(),
  membresia_id: requiredNumber,
  payment: requiredNumber,
  user_id: requiredNumber,
});

export const paymentShemaUpdate = object().shape({
  membresia_id,
  user_id,
});
