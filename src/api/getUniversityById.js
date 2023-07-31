import { instance } from '.';

export default async function getUniversityById(id) {
  const { data } = await instance.get(`/universidades/${id}`);
  return data;
}
