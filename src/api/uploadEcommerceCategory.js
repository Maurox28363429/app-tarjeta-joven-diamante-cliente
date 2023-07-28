import { instance } from '.';

export default async function uploadEcommerceCategory(data) {
  return await instance.post(`/product-category/${data.id}`, data);
}
