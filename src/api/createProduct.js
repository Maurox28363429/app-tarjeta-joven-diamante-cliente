import { instance } from '.';

export default async function createProduct(formData) {
  return await instance.post('/productoEcommerce', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
}
