import { instance } from '.';

export default async function deleteEcommerceCategory(id) {
  return await instance.delete(`/product-category/${id}`);
}
