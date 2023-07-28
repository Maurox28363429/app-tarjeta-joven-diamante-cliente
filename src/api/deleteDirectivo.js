import { instance } from '.';

export default async function deleteDirectivo(id) {
  return await instance.delete(`/directivos/${id}`);
}
