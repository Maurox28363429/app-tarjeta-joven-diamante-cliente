import { instance } from '.';
import { convertToFormdata } from 'src/utils/convertToFormdata';

export default async function createUniversityOffer(data) {
  const formData = convertToFormdata(data);
  return await instance.post('/universidades', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
}
