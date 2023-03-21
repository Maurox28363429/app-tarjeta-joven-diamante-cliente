import { instance } from '.'

export default function loginUser ({ email, password }) {
  return instance.post('/login', {
    email,
    password
  })
}
