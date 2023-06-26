import { instance } from '.';

export default async function deletePachamaNew(id) {
  return await instance.delete(`/noticias_pachama/${id}`);
}
