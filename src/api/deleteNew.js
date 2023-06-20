import { instance } from '.';

export default async function deleteNew(id) {
  return await instance.delete(`/noticias_informativas/${id}`);
}
