import { instance } from '.'

export default async function getUser (id) {
  const { data } = await instance.get(`/user/${id}?includes[]=membresia`)
  return data
}
