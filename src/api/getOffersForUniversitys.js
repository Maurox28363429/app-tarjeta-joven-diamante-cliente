import { instance } from ".";

export default async function getOffersForUniversitys({
  page = 1,
  search = "",
  dir,
} = {}) {
  const { data } = await instance.get(
    `/universidades?with[]=comercio&nombre=${search}&page=${page}&dir=${dir}`
  );
  return data;
}
