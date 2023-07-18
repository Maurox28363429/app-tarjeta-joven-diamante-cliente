import { instance } from '.';

export default async function deletePromotion(id) {
  return await instance.delete(`/noticias/${id}`);
}
