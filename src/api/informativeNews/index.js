import { instance } from '..';
import { convertToFormdata } from 'src/utils/convertToFormdata';

const NEWS_INFORMATIVE_PATH = '/noticias_informativas';

async function createNoticiaInformativa(data) {
  const formData = convertToFormdata(data);
  return await instance.post(NEWS_INFORMATIVE_PATH, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
}

async function getNewsInformative({ page = 1, search = '' } = {}) {
  return await instance.get(
    `${NEWS_INFORMATIVE_PATH}?search=${search}&page=${page}`
  );
}

async function editNoticiaInformativa(data) {
  const formData = convertToFormdata(data);
  return await instance.post(`${NEWS_INFORMATIVE_PATH}/${data.id}`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
}

async function deleteNew(id) {
  return await instance.delete(`${NEWS_INFORMATIVE_PATH}/${id}`);
}

async function getNew(id) {
  const { data } = await instance.get(`${NEWS_INFORMATIVE_PATH}/${id}`);
  return data;
}

export {
  createNoticiaInformativa,
  getNewsInformative,
  editNoticiaInformativa,
  deleteNew,
  getNew,
};
