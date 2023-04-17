import { instance } from ".";

export default async function getMemberships() {
  const { data } = await instance.get("/price-membresia");
  return data;
}
