import { instance } from '.';
import { convertToFormdata } from 'src/utils/convertToFormdata';

export default async function createNoticiaInformativa(data) {
  const formData = convertToFormdata(data);
  return await instance.post('/noticias_informativas', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
}
