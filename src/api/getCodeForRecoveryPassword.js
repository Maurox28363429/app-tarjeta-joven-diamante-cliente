import { instance } from '.'

export default async function getCodeForRecoveryPassword ({ email }) {
  return await instance.post('/getRecovery', {
    email
  })
}
