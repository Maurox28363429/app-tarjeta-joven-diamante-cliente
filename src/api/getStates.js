import { instance } from ".";

export default async function getStates({ sort_ofertas = 0, sort_uni = 0 }) {
  const { data } = await instance.get(
    `/provincias?sort_ofertas=${sort_ofertas}&sort_uni=${sort_uni}`
  );
  return data;
}
