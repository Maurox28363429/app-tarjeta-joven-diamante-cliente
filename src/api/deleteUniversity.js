import { instance } from '.';

export default async function deleteUniversity(id) {
  return await instance.delete(`/universidades/${id}`);
}
