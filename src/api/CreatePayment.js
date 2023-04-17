import { instance } from '.'
/* {
  "payment":100,
  "user_id":15,
  "referencia":"xxxx-xxx-xxx",
  "membresia_id":6,
  "img":file
} */
export default async function createPayment (formdata) {
  return await instance.post('/payment', formdata, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}
