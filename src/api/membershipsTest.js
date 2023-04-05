import { instance } from '.'

export default async function membershipsTest ({ user_id }) {
  return await instance.post('/prueba-membresia', {
    user_id
  })
}
