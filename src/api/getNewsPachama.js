import { instance } from ".";

export default async function getNewsPachama({ page = 1, search = "" } = {}) {
  return await instance.get(`/noticias_pachama?search=${search}&page=${page}`);
}
