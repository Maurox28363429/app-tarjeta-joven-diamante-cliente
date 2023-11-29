import { instance } from '..';
import { convertToFormdata } from 'src/utils/convertToFormdata';

const PRODUCT_PATH = '/productoEcommerce';

async function editProduct(data) {
  const formData = convertToFormdata(data);
  return await instance.post(`${PRODUCT_PATH}/${data.id}`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
}

async function deleteProduct(id) {
  return await instance.delete(`${PRODUCT_PATH}/${id}`);
}

async function getProducts({ search = '', pages, category_id = null }) {
  const thereIsCategory = category_id ? '&category_id=' + category_id : '';

  const { data } = await instance.get(
    `${PRODUCT_PATH}?search=${search}&page=${pages}${thereIsCategory}`
  );
  return data;
}

async function getProductById(id) {
  const { data } = await instance.get(`${PRODUCT_PATH}/${id}`);
  return data;
}

async function createProduct(formData) {
  return await instance.post(PRODUCT_PATH, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
}

export {
  createProduct,
  deleteProduct,
  editProduct,
  getProducts,
  getProductById,
};
