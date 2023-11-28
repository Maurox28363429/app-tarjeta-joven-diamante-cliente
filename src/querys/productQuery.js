import { useQuery, useQueryClient, useMutation } from '@tanstack/vue-query';

import { useToast } from 'src/composables/useToast';

import deleteProduct from 'src/api/deleteProduct';
import editProduct from 'src/api/editProduct';
import getProducts from 'src/api/getProducts';
import createProduct from 'src/api/createProduct';
import getProductById from 'src/api/getProductById';
import uploadEcommerceCategory from 'src/api/uploadEcommerceCategory';
import createEcommerceCategory from 'src/api/createEcommerceCategory';
import deleteEcommerceCategory from 'src/api/deleteEcommerceCategory';
import getEcommerceCategories from 'src/api/getEcommerceCategories';
import getCategoryById from 'src/api/getCategoryById';

import TOAST_MESSAGE from 'src/shared/constansts/toastMessage';

const PRODUCTS_KEY = 'products';
const PRODUCT_KEY = 'product';
const PRODUCT_CATEGORIES_KEY = 'productCategories';
const PRODUCT_CATEGORY_KEY = 'productCategory';

export const useGetProducts = ({ search, pages, category_id }) => {
  return useQuery([PRODUCTS_KEY, pages, category_id], () => {
    const params = category_id
      ? {
          search: search?.value,
          pages: pages?.value,
          category_id: category_id?.value,
        }
      : { search: search?.value, pages: pages?.value };
    return getProducts(params);
  });
};

export const useGetProductById = (id) => {
  return useQuery([PRODUCT_KEY, id], () => getProductById(id));
};

export const useCreateProductMutation = () => {
  const { triggerPositive, triggerWarning } = useToast();
  const queryClient = useQueryClient();

  return useMutation(createProduct, {
    onSuccess: () => {
      triggerPositive(TOAST_MESSAGE.CREATE);
      queryClient.invalidateQueries([PRODUCTS_KEY]);
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

export const useGetProductCategories = ({ page, search }) => {
  return useQuery([PRODUCT_CATEGORIES_KEY, page], () =>
    getEcommerceCategories({ page: page?.value, search: search?.value })
  );
};

export const useCreateProductCategoryMutation = () => {
  const { triggerPositive, triggerWarning } = useToast();
  const queryClient = useQueryClient();

  return useMutation(createEcommerceCategory, {
    onSuccess: () => {
      triggerPositive(TOAST_MESSAGE.CREATE);
      queryClient.invalidateQueries([PRODUCT_CATEGORIES_KEY]);
    },
    onError: () => {
      triggerWarning(TOAST_MESSAGE.ERROR.DEFAULT);
    },
  });
};

export const useUploadProductCategoryMutation = () => {
  const { triggerPositive, triggerWarning } = useToast();
  const queryClient = useQueryClient();

  return useMutation(uploadEcommerceCategory, {
    onSuccess: () => {
      triggerPositive(TOAST_MESSAGE.UPDATE);
      queryClient.invalidateQueries([PRODUCT_CATEGORIES_KEY]);
    },
    onError: () => {
      triggerWarning(TOAST_MESSAGE.ERROR.DEFAULT);
    },
  });
};

export const useDeleteProductCategoryMutation = () => {
  const { triggerPositive, triggerWarning } = useToast();
  const queryClient = useQueryClient();

  return useMutation(deleteEcommerceCategory, {
    onSuccess: () => {
      triggerPositive(TOAST_MESSAGE.DELETE);
      queryClient.invalidateQueries([PRODUCT_CATEGORIES_KEY]);
    },
    onError: () => {
      triggerWarning(TOAST_MESSAGE.ERROR.DEFAULT);
    },
  });
};

export const useGetProductCategoryById = (id) => {
  return useQuery([PRODUCT_CATEGORY_KEY, id], () => getCategoryById(id));
};
