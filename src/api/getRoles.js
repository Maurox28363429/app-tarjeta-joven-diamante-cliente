import { instance } from '.';

export default async function getRoles() {
  const { data } = await instance.get('/roles');
  return data;
}
