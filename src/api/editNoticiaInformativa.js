import { instance } from '.';
import { convertToFormdata } from 'src/utils/convertToFormdata';

export default async function editNoticiaInformativa(data) {
  const formData = convertToFormdata(data);
  return await instance.post(`/noticias_informativas/${data.id}`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
}
