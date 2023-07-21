import { instance } from '.';

export default async function getProducts({ search, pages }) {
  const { data } = await instance.get(
    '/productoEcommerce?search=' + search + '&page=' + pages
  );
  return data;
}
