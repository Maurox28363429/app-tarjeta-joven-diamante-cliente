import { object, string } from 'yup';

import { img } from './promotionsSchema';

import SCHEMAS_MESSAGE from 'src/shared/constansts/schemasMessage';

const requiredText = string().required(SCHEMAS_MESSAGE.required);

const fecha_tope_descuento = string()
  .nonNullable()
  .required(SCHEMAS_MESSAGE.required);

const offersSchema = object({
  descuento: requiredText,
  price_total: requiredText,
  description: requiredText,
  prioridad: requiredText,
  stock: requiredText,
  nombre: requiredText,
  fecha_tope_descuento,
  img,
});

export default offersSchema;
