import { instance } from '.'
import { convertToFormdata } from 'src/utils/convertToFormdata'

export default async function updateUser ({ id, data }) {
  const formData = convertToFormdata(data)

  return await instance.post(`user/${id}`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}
