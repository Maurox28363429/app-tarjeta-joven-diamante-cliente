import { instance } from '.';
import { convertToFormdata } from 'src/utils/convertToFormdata';

export default async function createNoticiaPachama(data) {
  const formData = convertToFormdata(data);
  return await instance.post('/noticias_pachama', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
}
