import { instance } from '.';
import { convertToFormdata } from 'src/utils/convertToFormdata';

export default async function createOffer(data) {
  const formData = convertToFormdata(data);
  return await instance.post('/comercio-ofertas', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
}
