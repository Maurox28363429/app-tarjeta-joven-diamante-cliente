import { instance } from '.';

export default async function getPremios(page, search) {
  const { data } = await instance.get(
    '/concurso?search=' + search + '&page=' + page
  );
  return data;
}
