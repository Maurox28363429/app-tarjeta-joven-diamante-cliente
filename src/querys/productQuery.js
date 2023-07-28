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

const ERROR_MESSAGE = 'Ah ocurrido un error, intente nuevamente';

export const useGetProducts = ({ search, pages, category_id }) => {
  return useQuery(['products', pages, category_id], () => {
    const params = category_id
      ? {
          search: search.value,
          pages: pages.value,
          category_id: category_id.value,
        }
      : { search: search.value, pages: pages.value };
    return getProducts(params);
  });
};

export const useGetProductById = (id) => {
  return useQuery(['product', id], () => getProductById(id));
};

export const useCreateProductMutation = () => {
  const { triggerPositive, triggerWarning } = useToast();
  const queryClient = useQueryClient();

  return useMutation(createProduct, {
    onSuccess: () => {
      triggerPositive('Producto creado con éxito');
      queryClient.invalidateQueries({ queryKey: ['products'] });
    },
    onError: () => {
      triggerWarning(ERROR_MESSAGE);
    },
  });
};

export const useEditProductMutation = () => {
  const { triggerPositive, triggerWarning } = useToast();
  const queryClient = useQueryClient();

  return useMutation(editProduct, {
    onSuccess: () => {
      triggerPositive('Producto actualizado con éxito');
      queryClient.invalidateQueries({ queryKey: ['products'] });
    },
    onError: () => {
      triggerWarning(ERROR_MESSAGE);
    },
  });
};

export const useDeleteProductMutation = () => {
  const { triggerPositive, triggerWarning } = useToast();
  const queryClient = useQueryClient();

  return useMutation(deleteProduct, {
    onSuccess: () => {
      triggerPositive('Producto eliminado con éxito');
      queryClient.invalidateQueries({ queryKey: ['products'] });
    },
    onError: () => {
      triggerWarning(ERROR_MESSAGE);
    },
  });
};

export const useGetProductCategories = ({ page, search }) => {
  return useQuery(['productCategories', page], () =>
    getEcommerceCategories({ page: page.value, search: search.value })
  );
};

export const useCreateProductCategoryMutation = () => {
  const { triggerPositive, triggerWarning } = useToast();
  const queryClient = useQueryClient();

  return useMutation(createEcommerceCategory, {
    onSuccess: () => {
      triggerPositive('Categoría creada con éxito');
      queryClient.invalidateQueries({ queryKey: ['productCategories'] });
    },
    onError: () => {
      triggerWarning(ERROR_MESSAGE);
    },
  });
};

export const useUploadProductCategoryMutation = () => {
  const { triggerPositive, triggerWarning } = useToast();
  const queryClient = useQueryClient();

  return useMutation(uploadEcommerceCategory, {
    onSuccess: () => {
      triggerPositive('Categoría actualizada con éxito');
      queryClient.invalidateQueries({ queryKey: ['productCategories'] });
    },
    onError: () => {
      triggerWarning(ERROR_MESSAGE);
    },
  });
};

export const useDeleteProductCategoryMutation = () => {
  const { triggerPositive, triggerWarning } = useToast();
  const queryClient = useQueryClient();

  return useMutation(deleteEcommerceCategory, {
    onSuccess: () => {
      triggerPositive('Categoría eliminada con éxito');
      queryClient.invalidateQueries({ queryKey: ['productCategories'] });
    },
    onError: () => {
      triggerWarning(ERROR_MESSAGE);
    },
  });
};
