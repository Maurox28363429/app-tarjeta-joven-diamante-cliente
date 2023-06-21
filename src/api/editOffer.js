import { instance } from '.';
import { convertToFormdata } from 'src/utils/convertToFormdata';

export default async function editOffer(data) {
  const formData = convertToFormdata(data);
  return await instance.post(`/comercio-ofertas/${data.id}`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
}
