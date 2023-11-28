import { object, string, mixed } from 'yup';
import SCHEMAS_MESSAGE from 'src/shared/constansts/schemasMessage';

const requiredText = string().required(SCHEMAS_MESSAGE.required);

export const img = mixed()
  .required(SCHEMAS_MESSAGE.required)
  .test('formato', SCHEMAS_MESSAGE.invalidImageFormat, (value) => {
    return (
      !value ||
      (value && ['image/jpeg', 'image/png', 'image/jpg'].includes(value.type))
    );
  });

export const promotionsSchema = object({
  titulo: requiredText,
  categoria: requiredText,
  descripcion: requiredText,
  prioridad: requiredText,
  img,
  link_youtube: requiredText,
  link_facebook: requiredText,
  link_instragram: requiredText,
  link_web: requiredText,
  link_otros: requiredText,
});
