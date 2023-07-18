import { instance } from '.';
import { convertToFormdata } from 'src/utils/convertToFormdata';

export default async function updateSos(data) {
  const formData = convertToFormdata({
    name: data.name,
    phone: data.phone,
    img: data.img,
    descripcion: data.descripcion,
  });

  return await instance.post(`sos/${data.id}`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
}
