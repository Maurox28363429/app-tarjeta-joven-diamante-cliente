import { instance } from '.'

export default async function updateUser ({
  name,
  email,
  password,
  active,
  role_id,
  phone,
  last_name,
  sex,
  address,
  id,
  img
}) {
  return await instance.put(`user/${id}`, {
    name,
    email,
    password,
    active,
    role_id,
    phone,
    last_name,
    sex,
    address,
    img
  })
}
