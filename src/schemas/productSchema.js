import { object, string } from 'yup';

import SCHEMAS_MESSAGE from 'src/shared/constansts/schemasMessage';

const requiredText = string().required(SCHEMAS_MESSAGE.required);

const category_id = object({
  label: requiredText,
  value: requiredText,
});

export const productSchema = object({
  descripcion: requiredText,
  precio: requiredText,
  stock: requiredText,
  whatsap: requiredText,
  category_id,
  nombre: requiredText,
});

export const productCategorySchema = object({
  name: requiredText,
  icon: requiredText,
});
