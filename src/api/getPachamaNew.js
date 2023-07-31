import { instance } from '.';

export default async function getPachamaNew(id) {
  const { data } = await instance.get(`/noticias_pachama/${id}`);
  return data;
}
