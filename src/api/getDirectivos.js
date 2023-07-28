import { instance } from '.';

export default async function getDirectivos() {
  const { data } = await instance.get('/directivos');
  return data;
}
