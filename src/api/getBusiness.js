import { instance } from '.';

export default async function getBusiness() {
  const { data } = await instance.get('/users?role_id=2&selected=1');
  return data;
}
