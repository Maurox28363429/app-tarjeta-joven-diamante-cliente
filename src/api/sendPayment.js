import { instance } from '.';
import { toFormData } from 'axios';

export default async function sendPayment(payment) {
  const formData = toFormData(payment);
  return await instance.post('/payment-membresia', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
}
