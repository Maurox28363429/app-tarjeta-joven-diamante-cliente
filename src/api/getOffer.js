import { instance } from '.';

export default async function getOffer(id) {
  const { data } = await instance.get(`/comercio-ofertas/${id}`);
  return data;
}
