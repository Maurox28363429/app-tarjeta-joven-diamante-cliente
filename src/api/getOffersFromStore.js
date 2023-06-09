import { instance } from '.';

export default async function getOffersFromStore({ name = '', id, page = 1 }) {
  const { data } = await instance.get(
    `/comercio-ofertas?comercio_id=${id}&nombre=${name}&page=${page}`
  );
  return data.data.map((items) => {
    return {
      ...items,
      cantidad: 1,
      priceWidthDiscount:
        items.price_total - (items.descuento / 100) * items.price_total,
      savings:
        items.price_total -
        (items.price_total - (items.descuento / 100) * items.price_total),
      priceTotal:
        items.price_total - (items.descuento / 100) * items.price_total * 1,
    };
  });
}
