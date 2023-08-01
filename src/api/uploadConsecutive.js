import { instance } from '.';

export default async function uploadConsecutive(consecutive) {
  const { data } = await instance.post(
    `/consecutivos/${consecutive.id}`,
    consecutive
  );
  return data;
}
