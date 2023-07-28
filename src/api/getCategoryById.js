import { instance } from '.';

export default async function getCategoryById(id) {
  const { data } = await instance.get('/product-category/' + id);
  return data;
}
