import { instance } from '.';

export default async function UpdateEcommerceOrder(id,datos) {
  const { data } = await instance.post(
    '/ordenEcommerce/' + id,datos
  );
  return data;
}
