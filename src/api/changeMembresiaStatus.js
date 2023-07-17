import { instance } from '.';

export default async function changeMembresiaStatus(id, status_num) {
  return await instance.post(`/membresia/${id}`, {
    status: status_num,
  });
}
