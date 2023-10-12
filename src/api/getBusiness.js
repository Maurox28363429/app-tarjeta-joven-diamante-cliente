import { instance } from '.';

export default async function getBusiness({ search = '' }) {
  const { data } = await instance.get(
    `/users?role_id=2&selected=1&search=${search}`
  );
  return data;
}
