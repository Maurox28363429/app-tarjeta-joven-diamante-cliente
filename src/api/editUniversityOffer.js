import { instance } from '.';
import { convertToFormdata } from 'src/utils/convertToFormdata';

export default async function editUniversityOffer(data) {
  const formData = convertToFormdata(data);
  return await instance.post(`/universidades/${data.id}`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
}
