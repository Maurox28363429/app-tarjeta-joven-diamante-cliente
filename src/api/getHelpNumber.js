import { instance } from '.';

export default async function getHelpNumber({ page = 1, search = '' }) {
  const { data } = await instance.get(`/sos?search=${search}&page=${page}`);
  return data;
}
