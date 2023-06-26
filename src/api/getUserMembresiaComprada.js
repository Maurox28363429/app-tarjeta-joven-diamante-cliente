import { instance } from '.';

export default async function getUserMembresiaComprada(page,search) {
  if(!search) search = '';
  const { data } = await instance.get(
    `/users?includes[]=membresia&role_id=3&comprada=1&page=${page}&name=${search}`
  );
  return data;
}
