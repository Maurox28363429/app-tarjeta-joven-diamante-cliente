import { instance } from '.';

export default async function getDashboardComercio(id) {
  const { data } = await instance.get('/dashboard_comercio?user_id='+id);
  return data;
}
