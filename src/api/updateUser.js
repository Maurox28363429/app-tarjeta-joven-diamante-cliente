import { instance } from '.'

export default async function updateUser ({
  name,
  email,
  active,
  role_id,
  phone,
  last_name,
  sex,
  address,
  id,
  img
}) {
  const formData = new FormData()
  formData.append('name', name)
  formData.append('email', email)
  formData.append('active', active)
  formData.append('role_id', role_id)
  formData.append('phone', phone)
  formData.append('last_name', last_name)
  formData.append('sex', sex)
  formData.append('address', address)
  formData.append('img', img)

  return await instance.put(`user/${id}`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}
