import { instance } from '.';

export default async function getProducts({
  search = '',
  pages,
  category_id = null,
}) {
  const thereIsCategory = category_id ? '&category_id=' + category_id : '';
  const { data } = await instance.get(
    '/productoEcommerce?search=' + search + '&page=' + pages + thereIsCategory
  );
  return data;
}
