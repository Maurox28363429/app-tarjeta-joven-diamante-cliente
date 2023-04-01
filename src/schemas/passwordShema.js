import { object, string } from 'yup'

const REQUIRED_MESSAGE = 'Este campo es requerido'

export const passwordSchema = object({
  password: string().required(REQUIRED_MESSAGE)
})
