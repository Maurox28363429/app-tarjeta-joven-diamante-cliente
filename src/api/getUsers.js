import { instance } from '.';

export default async function getUsers() {
  const { data } = await instance.get('/users');
  return data;
}
