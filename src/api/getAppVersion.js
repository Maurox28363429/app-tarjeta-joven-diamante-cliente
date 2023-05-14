import { instance } from '.'

export default async function getAppVersion () {
  const { data } = await instance.get('/versionapp')
  return data
}
