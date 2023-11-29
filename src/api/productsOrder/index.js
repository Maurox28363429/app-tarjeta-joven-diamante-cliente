import { instance } from '..';

const PRODUCT_ORDER_PATH = '/ordenEcommerce';

async function createOrder(formData) {
  return await instance.post(PRODUCT_ORDER_PATH, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
}

async function GetPaginatorOrder(page, search, initDate, endDate) {
  const { data } = await instance.get(
    `${PRODUCT_ORDER_PATH}?with[]=cliente&search=${search}&page=${page}&initDate=${initDate}&endDate=${endDate}`
  );
  return data;
}

async function getProductsOrder({ search, pages }) {
  const { data } = await instance.get(
    `${PRODUCT_ORDER_PATH}?search=${search}&page=${pages}`
  );
  return data;
}

async function UpdateEcommerceOrder(id, datos) {
  const { data } = await instance.post(`${PRODUCT_ORDER_PATH}/${id}`, datos);
  return data;
}

export {
  createOrder,
  GetPaginatorOrder,
  getProductsOrder,
  UpdateEcommerceOrder,
};
