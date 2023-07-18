import { instance } from '.';
import { convertToFormdata } from 'src/utils/convertToFormdata';

export default async function createSos(data) {
  const formData = convertToFormdata(data);
  return await instance.post('/sos', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
}
