import { instance } from '..';
import { convertToFormdata } from 'src/utils/convertToFormdata';

const PROMOTIONS_PATH = '/noticias';

async function createPromotion(data) {
  const formData = convertToFormdata(data);

  return await instance.post(PROMOTIONS_PATH, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
}

async function deletePromotion(id) {
  return await instance.delete(`${PROMOTIONS_PATH}/${id}`);
}

async function editPromotions(data) {
  const formData = convertToFormdata(data);
  return await instance.post(`${PROMOTIONS_PATH}/${data.id}`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
}

async function getPromotion(id) {
  const { data } = await instance.get(`${PROMOTIONS_PATH}/${id}`);
  return data;
}

export default async function getPromotions({ page = 1, search = '' } = {}) {
  const { data } = await instance.get(
    `${PROMOTIONS_PATH}?search=${search}&page=${page}`
  );
  return data;
}

export {
  createPromotion,
  deletePromotion,
  editPromotions,
  getPromotion,
  getPromotions,
};
