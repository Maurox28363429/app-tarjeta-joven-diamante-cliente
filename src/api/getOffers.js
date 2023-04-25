import { instance } from ".";

export default async function getOffers({ page = 1, search = "" } = {}) {
  const { data } = await instance.get(
    `/comercio-ofertas?with[]=comercio&nombre=${search}&page=${page}`
  );
  return data;
}
