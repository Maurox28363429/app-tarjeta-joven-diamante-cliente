import { instance } from '.';

export default async function deleteOffer(id) {
  return await instance.delete(`/comercio-ofertas/${id}`);
}
