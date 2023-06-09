import { instance } from '.';
import { convertToFormdata } from 'src/utils/convertToFormdata';

export default async function updateUser(data) {
  const formData = convertToFormdata(data);

  return await instance.post(`user/${data.id}`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
}
