import { object, string, mixed } from 'yup';

const REQUIRED_MESSAGE = 'Este campo es requerido';

const offersSchema = object({
  descuento: string().required(REQUIRED_MESSAGE),
  price_total: string().required(REQUIRED_MESSAGE),
  description: string().required(REQUIRED_MESSAGE),
  prioridad: string().required(REQUIRED_MESSAGE),
  stock: string().required(REQUIRED_MESSAGE),
  nombre: string().required(REQUIRED_MESSAGE),
  fecha_tope_descuento: string().nonNullable().required(REQUIRED_MESSAGE),
  img: mixed()
    .required(REQUIRED_MESSAGE)
    .test(
      'formato',
      'Solo se aceptan los siguientes formatos: .jpeg, .jpg y .png',
      (value) => {
        console.log(value, 'value');
        return (
          !value ||
          (value &&
            ['image/jpeg', 'image/png', 'image/jpg'].includes(value.type))
        );
      }
    ),
});

export default offersSchema;
