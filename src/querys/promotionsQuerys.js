import { useQuery, useQueryClient, useMutation } from '@tanstack/vue-query';

import { useToast } from 'src/composables/useToast';

import getNews from 'src/api/getNews';
import createPromotion from 'src/api/createPromotion';
import editPromotions from 'src/api/editPromotions';
import deletePromotion from 'src/api/deletePromotion';
import getPromotion from 'src/api/getPromotion';

import TOAST_MESSAGE from 'src/shared/constansts/toastMessage';

const PROMOTIONS_KEY = 'promotions';

export const useGetPromotions = ({ search, pages = {} }) => {
  return useQuery([PROMOTIONS_KEY, pages], () =>
    getNews({ search: search.value, pages: pages.value })
  );
};

export const useGetPromotion = (route) => {
  return useQuery([PROMOTIONS_KEY, route], () => getPromotion(route.value));
};

export const useCreatePromotionMutation = () => {
  const queryClient = useQueryClient();
  const { triggerPositive, triggerWarning } = useToast();
  return useMutation((data) => createPromotion(data), {
    onSuccess: () => {
      triggerPositive(TOAST_MESSAGE.CREATE);
      queryClient.invalidateQueries([PROMOTIONS_KEY]);
    },
    onError: (error) => {
      if (error.response.status === 409) {
        triggerWarning(
          'Por favor, verifique que la promoción no exista o que los  datos sean correctos'
        );
        return;
      }
      triggerWarning(TOAST_MESSAGE.ERROR.DEFAULT);
    },
  });
};

export const useEditPromotionMutation = () => {
  const queryClient = useQueryClient();
  const { triggerPositive, triggerWarning } = useToast();
  return useMutation((data) => editPromotions(data), {
    onSuccess: () => {
      triggerPositive(TOAST_MESSAGE.UPDATE);
      queryClient.invalidateQueries([PROMOTIONS_KEY]);
    },
    onError: () => {
      triggerWarning(TOAST_MESSAGE.ERROR.DEFAULT);
    },
  });
};

export const useDeletePromotionMutation = () => {
  const queryClient = useQueryClient();
  const { triggerPositive, triggerWarning } = useToast();
  return useMutation((data) => deletePromotion(data), {
    onSuccess: () => {
      triggerPositive(TOAST_MESSAGE.DELETE);
      queryClient.invalidateQueries([PROMOTIONS_KEY]);
    },
    onError: () => {
      triggerWarning(TOAST_MESSAGE.ERROR.DEFAULT);
    },
  });
};
