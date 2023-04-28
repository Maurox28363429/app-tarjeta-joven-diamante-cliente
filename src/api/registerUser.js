import { instance } from '.'

export default async function registerUser ({
  name,
  email,
  password,
  active,
  role_id,
  phone,
  last_name,
  sex,
  address,
  vendedor
}) {
  return await instance.post('/register', {
    name,
    email,
    password,
    active,
    role_id,
    phone,
    last_name,
    sex,
    address,
    vendedor
  })
}
