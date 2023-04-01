import { instance } from '.'

/* eslint-disable camelcase */
export default function changePassword ({ email, recovery_cod, password }) {
  return instance.post('/putRecovery', {
    email,
    recovery_cod,
    password
  })
}
