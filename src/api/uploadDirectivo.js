import { instance } from '.';

export default async function uploadDirectivo(data) {
  return await instance.post(`/directivos/${data.id}`, data);
}
