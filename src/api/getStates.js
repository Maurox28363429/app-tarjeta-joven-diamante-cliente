import { instance } from '.'

export default async function getStates () {
  const { data } = await instance.get('/provincias')
  return data
}
