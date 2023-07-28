import { instance } from '.';
import { convertToFormdata } from 'src/utils/convertToFormdata';

export default async function createEcommerceCategory(data) {
  const formData = convertToFormdata(data);
  return await instance.post('/product-category', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
}
