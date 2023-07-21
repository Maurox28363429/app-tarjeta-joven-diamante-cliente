import { instance } from '.';

export default async function getProductById(id) {
  const { data } = await instance.get('/productoEcommerce/' + id);
  return data;
}
