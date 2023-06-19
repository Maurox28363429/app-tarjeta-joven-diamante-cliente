import { instance } from '.';

export default async function createNoticiaInformativa({
  titulo,
  descripcion,
  prioridad,
  img,
}) {
  return await instance.post('/noticias_informativas', {
    titulo,
    descripcion,
    prioridad,
    img,
  });
}
