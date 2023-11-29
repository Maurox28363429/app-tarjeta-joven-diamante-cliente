import { instance } from '..';
import { convertToFormdata } from 'src/utils/convertToFormdata';

const PACHAMA_NEWS_PATH = '/noticias_pachama';

async function createNoticiaPachama(data) {
  const formData = convertToFormdata(data);
  return await instance.post(PACHAMA_NEWS_PATH, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
}

async function deletePachamaNew(id) {
  return await instance.delete(`${PACHAMA_NEWS_PATH}/${id}`);
}

async function editNoticiaPachama(data) {
  const formData = convertToFormdata(data);
  return await instance.post(`${PACHAMA_NEWS_PATH}/${data.id}`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
}

async function getNewsPachama({ page = 1, search = '' } = {}) {
  return await instance.get(
    `${PACHAMA_NEWS_PATH}?search=${search}&page=${page}`
  );
}

async function getPachamaNew(id) {
  const { data } = await instance.get(`${PACHAMA_NEWS_PATH}/${id}`);
  return data;
}

export {
  createNoticiaPachama,
  deletePachamaNew,
  editNoticiaPachama,
  getNewsPachama,
  getPachamaNew,
};
