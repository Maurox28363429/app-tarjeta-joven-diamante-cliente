import { instance } from '.';

export default async function createDirectivo(data) {
  return await instance.post('/directivos', data);
}
