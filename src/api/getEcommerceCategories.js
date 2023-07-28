import { instance } from '.';

export default async function getEcommerceCategories({
  page = 1,
  search = '',
}) {
  const { data } = await instance.get(
    `/product-category?search=${search}&page=${page}`
  );
  return data;
}
