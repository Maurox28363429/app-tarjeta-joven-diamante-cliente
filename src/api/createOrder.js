import { instance } from '.';

export default async function createOrder(formData) {
  return await instance.post('/ordenEcommerce', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
}
