import { useQuery, useQueryClient, useMutation } from '@tanstack/vue-query';

import { useToast } from 'src/composables/useToast';

import getNewsPachama from 'src/api/getNewsPachama';
import createNoticiaPachama from 'src/api/createNoticiaPachama.js';
import editNoticiaPachama from 'src/api/editNoticiaPachama.js';
import getPachamaNew from 'src/api/getPachamaNew';
import deletePachamaNew from 'src/api/deletePachamaNew';

import TOAST_MESSAGE from 'src/shared/constansts/toastMessage';

const PACHAMA_NEWS_KEY = 'pachamaNews';

export const useGetPachamaNews = ({ search, pages = {} }) => {
  return useQuery([PACHAMA_NEWS_KEY, pages], () =>
    getNewsPachama({ search: search?.value, pages: pages?.value?.current })
  );
};

export const useGetPachamaNew = (id) => {
  return useQuery([PACHAMA_NEWS_KEY], () => getPachamaNew(id));
};

export const useCreateNewMutation = () => {
  const { triggerPositive, triggerWarning } = useToast();
  const queryClient = useQueryClient();

  return useMutation(createNoticiaPachama, {
    onSuccess: () => {
      triggerPositive(TOAST_MESSAGE.CREATE);
      queryClient.invalidateQueries([PACHAMA_NEWS_KEY]);
    },
    onError: () => {
      triggerWarning(TOAST_MESSAGE.ERROR.DEFAULT);
    },
  });
};

export const useEditNewMutation = () => {
  const { triggerPositive, triggerWarning } = useToast();
  const queryClient = useQueryClient();

  return useMutation(editNoticiaPachama, {
    onSuccess: () => {
      triggerPositive(TOAST_MESSAGE.UPDATE);
      queryClient.invalidateQueries([PACHAMA_NEWS_KEY]);
    },
    onError: () => {
      triggerWarning(TOAST_MESSAGE.ERROR.DEFAULT);
    },
  });
};

export const useDeletePachamaNewMutation = () => {
  const { triggerPositive, triggerWarning } = useToast();
  const queryClient = useQueryClient();

  return useMutation(deletePachamaNew, {
    onSuccess: () => {
      triggerPositive(TOAST_MESSAGE.DELETE);
      queryClient.invalidateQueries([PACHAMA_NEWS_KEY]);
    },
    onError: () => {
      triggerWarning(TOAST_MESSAGE.ERROR.DEFAULT);
    },
  });
};
