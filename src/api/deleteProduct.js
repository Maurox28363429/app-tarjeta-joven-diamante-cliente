import { instance } from '.';

export default async function deleteProduct(id) {
  return await instance.delete(`/productoEcommerce/${id}`);
}
