import { instance } from '..';

const DIRECTIVE_PATH = '/directivos';

async function createDirectivo(data) {
  return await instance.post(DIRECTIVE_PATH, data);
}

async function deleteDirectivo(id) {
  return await instance.delete(`${DIRECTIVE_PATH}/${id}`);
}

async function getDirectivos({ page = 1, search = '' }) {
  const { data } = await instance.get(
    `${DIRECTIVE_PATH}?page=${page}&search=${search}`
  );
  return data;
}

async function uploadDirectivo(data) {
  return await instance.post(`${DIRECTIVE_PATH}/${data.id}`, data);
}

export { createDirectivo, deleteDirectivo, getDirectivos, uploadDirectivo };
