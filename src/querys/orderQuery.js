import { useQuery, useQueryClient, useMutation } from '@tanstack/vue-query';
import { useToast } from 'src/composables/useToast';
import deleteProduct from 'src/api/deleteProduct';
import editProduct from 'src/api/editProduct';
import getProducts from 'src/api/getProducts';
import getProductById from 'src/api/getProductById';
import createOrder from 'src/api/createOrder';

const ERROR_MESSAGE = 'Ah ocurrido un error, intente nuevamente';

export const useGetProducts = ({ search, pages }) => {
  return useQuery(['products', pages], () =>
    getProducts({ search: search.value, pages: pages.value })
  );
};

export const useGetProductById = (id) => {
  return useQuery(['product', id], () => getProductById(id));
};

export const useCreateOrderMutation = () => {
  const { triggerPositive, triggerWarning } = useToast();
  const queryClient = useQueryClient();

  return useMutation(createOrder, {
    onSuccess: () => {
      triggerPositive('Orden creada con éxito');
      queryClient.invalidateQueries({ queryKey: ['order'] });
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
