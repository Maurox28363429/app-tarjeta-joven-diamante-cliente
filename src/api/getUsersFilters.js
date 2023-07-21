import { instance } from '.';

export default async function getUsersFilters(search) {
  const { data } = await instance.get(
    '/users?name=' + search + '&role_id=3&selected=1'
  );
  return data;
}
