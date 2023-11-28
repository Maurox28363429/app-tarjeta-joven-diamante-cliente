import { useQuery, useQueryClient, useMutation } from '@tanstack/vue-query';

import { useToast } from 'src/composables/useToast';

import {
  createNoticiaInformativa,
  getNewsInformative,
  editNoticiaInformativa,
  deleteNew,
  getNew,
} from 'src/api/informativeNews/index';

import TOAST_MESSAGE from 'src/shared/constansts/toastMessage';

const NEWS_KEY = 'news';

export const useGetNewsInformative = ({ search, pages }) => {
  return useQuery([NEWS_KEY, pages], () =>
    getNewsInformative({ search: search?.value, pages: pages?.value?.current })
  );
};

export const useGetNewInformative = (router) => {
  return useQuery([NEWS_KEY, router], () => getNew(router?.value));
};

export const useCreateNewMutation = () => {
  const { triggerPositive, triggerWarning } = useToast();
  const queryClient = useQueryClient();

  return useMutation(createNoticiaInformativa, {
    onSuccess: () => {
      triggerPositive(TOAST_MESSAGE.CREATE);
      queryClient.invalidateQueries([NEWS_KEY]);
    },
    onError: (error) => {
      if (error.response.status === 409) {
        triggerWarning(
          'Por favor, verifique que la noticia no exista o que los  datos sean correctos'
        );
      }
    },
  });
};

export const useEditNewMutation = () => {
  const { triggerPositive, triggerWarning } = useToast();
  const queryClient = useQueryClient();

  return useMutation(editNoticiaInformativa, {
    onSuccess: () => {
      triggerPositive(TOAST_MESSAGE.UPDATE);
      queryClient.invalidateQueries([NEWS_KEY]);
    },
    onError: () => {
      triggerWarning(TOAST_MESSAGE.ERROR.DEFAULT);
    },
  });
};

export const useDeleteNewMutation = () => {
  const { triggerPositive, triggerWarning } = useToast();
  const queryClient = useQueryClient();

  return useMutation(deleteNew, {
    onSuccess: () => {
      triggerPositive(TOAST_MESSAGE.DELETE);
      queryClient.invalidateQueries([NEWS_KEY]);
    },
    onError: () => {
      triggerWarning(TOAST_MESSAGE.ERROR.DEFAULT);
    },
  });
};
