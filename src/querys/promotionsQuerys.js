import { useQuery, useQueryClient, useMutation } from '@tanstack/vue-query';
import getNews from 'src/api/getNews';
import createPromotion from 'src/api/createPromotion';
import editPromotions from 'src/api/editPromotions';
import deletePromotion from 'src/api/deletePromotion';
import getPromotion from 'src/api/getPromotion';
import { useToast } from 'src/composables/useToast';

export const useGetPromotions = ({ search, pages = {} }) => {
  return useQuery(['promotions', pages], () =>
    getNews({ search: search.value, pages: pages.value })
  );
};

export const useGetPromotion = (route) => {
  return useQuery(['promotions', route], () => getPromotion(route.value));
};

export const useCreatePromotionMutation = () => {
  const queryClient = useQueryClient();
  const { triggerPositive, triggerWarning } = useToast();
  return useMutation((data) => createPromotion(data), {
    onSuccess: () => {
      triggerPositive('Creado con éxito');
      queryClient.invalidateQueries({
        queryKey: ['promotions'],
      });
    },
    onError: () => {
      triggerWarning('Ah ocurrido un error, intente nuevamente');
    },
  });
};

export const useEditPromotionMutation = () => {
  const queryClient = useQueryClient();
  const { triggerPositive, triggerWarning } = useToast();
  return useMutation((data) => editPromotions(data), {
    onSuccess: () => {
      triggerPositive('Editado con éxito');
      queryClient.invalidateQueries({
        queryKey: ['promotions'],
      });
    },
    onError: () => {
      triggerWarning('Ah ocurrido un error, intente nuevamente');
    },
  });
};

export const useDeletePromotionMutation = () => {
  const queryClient = useQueryClient();
  const { triggerPositive, triggerWarning } = useToast();
  return useMutation((data) => deletePromotion(data), {
    onSuccess: () => {
      triggerPositive('Eliminado con éxito');
      queryClient.invalidateQueries({
        queryKey: ['promotions'],
      });
    },
    onError: () => {
      triggerWarning('Ah ocurrido un error, intente nuevamente');
    },
  });
};
