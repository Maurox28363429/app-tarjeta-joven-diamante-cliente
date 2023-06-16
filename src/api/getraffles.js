import { instance } from '.';

export default async function getRaffles() {
  const { data } = await instance.get('/concurso');
  return data;
}
