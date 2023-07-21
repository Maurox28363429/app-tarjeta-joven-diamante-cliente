import { instance } from '.';
import { convertToFormdata } from 'src/utils/convertToFormdata';

export default async function editProduct(data) {
  const formData = convertToFormdata(data);
  return await instance.post(`/productoEcommerce/${data.id}`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
}
