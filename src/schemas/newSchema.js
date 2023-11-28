import { object, string } from 'yup';

import SCHEMAS_MESSAGE from 'src/shared/constansts/schemasMessage';

const requiredText = string().required(SCHEMAS_MESSAGE.required);

export const newSchema = object({
  titulo: requiredText,
  descripcion: requiredText,
  prioridad: requiredText,
  img: requiredText,
  link_youtube: requiredText,
  link_facebook: requiredText,
  link_instragram: requiredText,
  link_web: requiredText,
  link_otros: requiredText,
});
