import { instance } from ".";

export default async function getSingleMemberships(id) {
  const { data } = await instance.get(`/price-membresia/${id}`);
  return data;
}
