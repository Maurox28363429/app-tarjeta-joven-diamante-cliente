import { instance } from '.';

export default async function createNoticiaPachama({
  titulo,
  descripcion,
  prioridad,
  img,
}) {
  return await instance.post('/noticias_pachama', {
    titulo,
    descripcion,
    prioridad,
    img,
  });
}
