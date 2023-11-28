import { useQuery, useQueryClient, useMutation } from '@tanstack/vue-query';

import { useToast } from 'src/composables/useToast';

import {
  createPromotion,
  deletePromotion,
  getPromotion,
  editPromotions,
  getPromotions,
} from 'src/api/promotions/intex';

import TOAST_MESSAGE from 'src/shared/constansts/toastMessage';

const PROMOTIONS_KEY = 'promotions';
const PROMOTION_KEY = 'promotion';

export const useGetPromotions = ({ search, pages }) => {
  return useQuery([PROMOTIONS_KEY, pages], () =>
    getPromotions({ search: search?.value, pages: pages?.value })
  );
};

export const useGetPromotion = (route) => {
  return useQuery([PROMOTION_KEY, route], () => getPromotion(route?.value));
};

export const useCreatePromotionMutation = () => {
  const queryClient = useQueryClient();
  const { triggerPositive, triggerWarning } = useToast();
  return useMutation(createPromotion, {
    onSuccess: () => {
      triggerPositive(TOAST_MESSAGE.CREATE);
      queryClient.invalidateQueries([PROMOTIONS_KEY]);
      queryClient.invalidateQueries([PROMOTION_KEY]);
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
  return useMutation(editPromotions, {
    onSuccess: () => {
      triggerPositive(TOAST_MESSAGE.UPDATE);
      queryClient.invalidateQueries([PROMOTIONS_KEY]);
      queryClient.invalidateQueries([PROMOTION_KEY]);
    },
    onError: () => {
      triggerWarning(TOAST_MESSAGE.ERROR.DEFAULT);
    },
  });
};

export const useDeletePromotionMutation = () => {
  const queryClient = useQueryClient();
  const { triggerPositive, triggerWarning } = useToast();
  return useMutation(deletePromotion, {
    onSuccess: () => {
      triggerPositive(TOAST_MESSAGE.DELETE);
      queryClient.invalidateQueries([PROMOTIONS_KEY]);
      queryClient.invalidateQueries([PROMOTION_KEY]);
    },
    onError: () => {
      triggerWarning(TOAST_MESSAGE.ERROR.DEFAULT);
    },
  });
};
