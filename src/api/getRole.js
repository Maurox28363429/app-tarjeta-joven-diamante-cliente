import { instance } from '.'

export default async function getRoles () {
  return await instance.get('/roles')
}
