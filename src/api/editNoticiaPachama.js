import { instance } from '.';
import { convertToFormdata } from 'src/utils/convertToFormdata';

export default async function editNoticiaPachama(data) {
  const formData = convertToFormdata(data);
  return await instance.post(`/noticias_pachama/${data.id}`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
}
