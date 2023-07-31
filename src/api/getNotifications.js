import { instance } from '.';

export default async function getNotifications({ page = 1, id }) {
  const { data } = await instance.get(`/notify?user_id=${id}&page=${page}`);
  return data;
}
