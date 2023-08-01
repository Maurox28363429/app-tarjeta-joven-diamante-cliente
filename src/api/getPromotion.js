import { instance } from '.';

export default async function getPromotion(id) {
  const { data } = await instance.get('/noticias/' + id);
  return data;
}
