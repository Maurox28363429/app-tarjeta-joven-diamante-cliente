import { instance } from '.';

export default async function createNoticiaPachama(id,{// id es el id de la noticia
  titulo,
  descripcion,
  prioridad,
  img,
}) {
  return await instance.post(`/noticias_pachama/${id}`, {
    titulo,
    descripcion,
    prioridad,
    img,
  });
}
