/* eslint-disable camelcase */
import { instance } from '.'

export default function registerUser ({
  name,
  email,
  password,
  active,
  role_id,
  phone,
  last_name,
  sex,
  address
}) {
  return instance.post('/register', {
    name,
    email,
    password,
    active,
    role_id,
    phone,
    last_name,
    sex,
    address
  })
}
