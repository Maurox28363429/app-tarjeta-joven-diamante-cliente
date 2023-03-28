import { instance } from '.'

/* eslint-disable camelcase */
export default function membershipsTest ({ user_id }) {
  return instance.post('/prueba-membresia', {
    user_id
  })
}
