import { instance } from '.';

export default async function createNoticiaInformativa(id,{// id es el id de la noticia
  titulo,
  descripcion,
  prioridad,
  img,
}) {
  return await instance.post(`/noticias_informativas/${id}`, {
    titulo,
    descripcion,
    prioridad,
    img,
  });
}
