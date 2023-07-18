import { instance } from '.';

export default async function DeletePremio(id) {
  const { data } = await instance.delete(`/concurso/${id}`);
  return data;
}
