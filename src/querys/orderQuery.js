import { useQuery, useQueryClient, useMutation } from '@tanstack/vue-query';

import { useToast } from 'src/composables/useToast';

import deleteProduct from 'src/api/deleteProduct';
import editProduct from 'src/api/editProduct';
import getProducts from 'src/api/getProducts';
import getProductById from 'src/api/getProductById';
import createOrder from 'src/api/createOrder';

import { useProductCart } from 'src/stores/useProductCart';

import TOAST_MESSAGE from 'src/shared/constansts/toastMessage';

const PRODUCTS_KEY = 'products';
const ORDER_KEY = 'order';
const PRODUCT_KEY = 'product';

export const useGetProducts = ({ search, pages }) => {
  return useQuery([PRODUCTS_KEY, pages], () =>
    getProducts({ search: search?.value, pages: pages?.value })
  );
};

export const useGetProductById = (id) => {
  return useQuery([PRODUCT_KEY, id], () => getProductById(id));
};

export const useCreateOrderMutation = () => {
  const { triggerPositive, triggerWarning } = useToast();
  const queryClient = useQueryClient();
  const store = useProductCart();

  return useMutation(createOrder, {
    onSuccess: () => {
      triggerPositive(TOAST_MESSAGE.CREATE);
      store.clearCart();
      queryClient.invalidateQueries([ORDER_KEY]);
    },
    onError: () => {
      triggerWarning(TOAST_MESSAGE.ERROR.DEFAULT);
    },
  });
};

export const useEditProductMutation = () => {
  const { triggerPositive, triggerWarning } = useToast();
  const queryClient = useQueryClient();

  return useMutation(editProduct, {
    onSuccess: () => {
      triggerPositive(TOAST_MESSAGE.UPDATE);
      queryClient.invalidateQueries([PRODUCTS_KEY]);
    },
    onError: () => {
      triggerWarning(TOAST_MESSAGE.ERROR.DEFAULT);
    },
  });
};

export const useDeleteProductMutation = () => {
  const { triggerPositive, triggerWarning } = useToast();
  const queryClient = useQueryClient();

  return useMutation(deleteProduct, {
    onSuccess: () => {
      triggerPositive(TOAST_MESSAGE.DELETE);
      queryClient.invalidateQueries([PRODUCTS_KEY]);
    },
    onError: () => {
      triggerWarning(TOAST_MESSAGE.ERROR.DEFAULT);
    },
  });
};
