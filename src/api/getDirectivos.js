import { instance } from '.';

export default async function getDirectivos({ page = 1, search = '' }) {
  const { data } = await instance.get(
    `/directivos?page=${page}&search=${search}`
  );
  return data;
}
