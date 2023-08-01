import { instance } from '.';

export default async function deleteNotify(id) {
  return await instance.delete(`/notify/${id}`);
}
