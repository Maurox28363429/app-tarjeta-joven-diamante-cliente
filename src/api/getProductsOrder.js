import { instance } from '.';

export default async function getProductsOrder({ search, pages }) {
  const { data } = await instance.get(
    '/ordenEcommerce?search=' + search + '&page=' + pages
  );
  return data;
}
