import { instance } from '..';
import { convertToFormdata } from 'src/utils/convertToFormdata';

const SOS_PATH = '/sos';

async function createSos(data) {
  const formData = convertToFormdata(data);
  return await instance.post(SOS_PATH, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
}

async function deleteSos(id) {
  return await instance.delete(`${SOS_PATH}/${id}`);
}

async function getHelpNumber({ page = 1, search = '' }) {
  const { data } = await instance.get(
    `${SOS_PATH}?search=${search}&page=${page}`
  );
  return data;
}

async function updateSos(data) {
  const formData = convertToFormdata({
    name: data.name,
    phone: data.phone,
    img: data.img,
    descripcion: data.descripcion,
  });

  return await instance.post(`${SOS_PATH}/${data.id}`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
}

export { createSos, deleteSos, getHelpNumber, updateSos };
