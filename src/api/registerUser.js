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
  vendedor,
  provincia
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
    vendedor,
    provincia
  })
}
