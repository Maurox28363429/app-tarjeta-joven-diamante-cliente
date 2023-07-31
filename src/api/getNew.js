import { instance } from '.';

export default async function getNew(id) {
  const { data } = await instance.get(`noticias_informativas/${id}`);
  return data;
}
