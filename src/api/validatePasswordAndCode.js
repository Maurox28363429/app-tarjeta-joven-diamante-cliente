import { instance } from '.'

/* eslint-disable camelcase */
export default function validatePasswordAndCode ({ email, code }) {
  return instance.post('/validateRecovery', {
    email,
    code
  })
}
