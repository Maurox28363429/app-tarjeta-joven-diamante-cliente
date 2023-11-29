import { instance } from '..';
import { convertToFormdata } from 'src/utils/convertToFormdata';

const PRODUCT_CATEGORY = '/product-category';

async function uploadEcommerceCategory(data) {
  const formData = convertToFormdata(data);
  return await instance.post(`${PRODUCT_CATEGORY}/${data.id}`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
}

async function createEcommerceCategory(data) {
  const formData = convertToFormdata(data);
  return await instance.post(PRODUCT_CATEGORY, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
}

async function deleteEcommerceCategory(id) {
  return await instance.delete(`${PRODUCT_CATEGORY}/${id}`);
}

async function getEcommerceCategories({ page = 1, search = '' }) {
  const { data } = await instance.get(
    `${PRODUCT_CATEGORY}?search=${search}&page=${page}`
  );
  return data;
}

async function getCategoryById(id) {
  const { data } = await instance.get(`${PRODUCT_CATEGORY}/${id}`);
  return data;
}

export {
  uploadEcommerceCategory,
  createEcommerceCategory,
  deleteEcommerceCategory,
  getEcommerceCategories,
  getCategoryById,
};
