import { instance } from '.';

export default async function getConsecutivo() {
  const { data } = await instance.get(
    '/consecutivos?search=Consecutivo_seguro'
  );
  return data;
}
