import { instance } from '.';

export default async function getDashboardAdmin() {
  const { data } = await instance.get('/dashboard_admin');
  return data;
}
