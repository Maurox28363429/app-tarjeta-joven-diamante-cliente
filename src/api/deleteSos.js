import { instance } from '.';

export default async function deleteSos(id) {
  return await instance.delete(`/sos/${id}`);
}
