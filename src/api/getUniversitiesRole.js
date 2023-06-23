import { instance } from '.';

export default async function getUniversitiesRole() {
  const { data } = await instance.get('/users?rol_id=4&selected=1');
  return data;
}
