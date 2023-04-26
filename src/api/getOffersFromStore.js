import { instance } from ".";

export default async function getOffersFromStore({ name = "", id, page = 1 }) {
  const { data } = await instance.get(
    `/comercio-ofertas?comercio_id=${id}&nombre=${name}&page=${page}`
  );
  return data;
}
