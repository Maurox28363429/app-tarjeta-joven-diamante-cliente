import { instance } from '.'

export default async function changePassword ({
  email,
  recovery_cod,
  password
}) {
  return await instance.post('/putRecovery', {
    email,
    recovery_cod,
    password
  })
}
