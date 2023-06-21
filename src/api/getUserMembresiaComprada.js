import { instance } from '.';

export default async function getUserMembresiaComprada(page) {
  const { data } = await instance.get(`/users?includes[]=membresia&role_id=3&comprada=1&page=${page}`);
  return data;
}
