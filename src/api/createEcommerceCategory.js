import { instance } from '.';

export default async function createEcommerceCategory(data) {
  return await instance.post('/product-category', data);
}
