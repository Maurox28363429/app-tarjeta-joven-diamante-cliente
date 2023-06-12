import { instance } from '.';

export default async function getNewsInformative({
  page = 1,
  search = '',
} = {}) {
  return await instance.get(
    `/noticias_informativas?search=${search}&page=${page}`
  );
}
