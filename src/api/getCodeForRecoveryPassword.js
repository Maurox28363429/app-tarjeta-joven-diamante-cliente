import { instance } from '.'

/* eslint-disable camelcase */
export default function getCodeForRecoveryPassword ({ email }) {
  return instance.post('/getRecovery', {
    email
  })
}
