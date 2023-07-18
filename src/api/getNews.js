import { instance } from '.';

export default async function getNews({ page = 1, search = '' } = {}) {
  const { data } = await instance.get(
    `/noticias?search=${search}&page=${page}`
  );
  return data;
}
