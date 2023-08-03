import { useQuery, useQueryClient, useMutation } from '@tanstack/vue-query';
import { useToast } from 'src/composables/useToast';
import getNewsInformative from 'src/api/getNewsInformative';
import createNoticiaInformativa from 'src/api/createNoticiaInformativa.js';
import editNoticiaInformativa from 'src/api/editNoticiaInformativa.js';
import deleteNew from 'src/api/deleteNew';
import getNew from 'src/api/getNew';

const ERROR_MESSAGE = 'Ah ocurrido un error, intente nuevamente';
export const useGetNewsInformative = ({ search, pages = {} }) => {
  return useQuery(['news', pages], () =>
    getNewsInformative({ search: search.value, pages: pages.value.current })
  );
};

export const useGetNewInformative = (router) => {
  return useQuery(['news', router], () => getNew(router.value));
};

export const useCreateNewMutation = () => {
  const { triggerPositive, triggerWarning } = useToast();
  const queryClient = useQueryClient();

  return useMutation(createNoticiaInformativa, {
    onSuccess: () => {
      triggerPositive('Noticia creada con éxito');
      queryClient.invalidateQueries({ queryKey: ['news'] });
    },
    onError: () => {
      triggerWarning(ERROR_MESSAGE);
    },
  });
};

export const useEditNewMutation = () => {
  const { triggerPositive, triggerWarning } = useToast();
  const queryClient = useQueryClient();

  return useMutation(editNoticiaInformativa, {
    onSuccess: () => {
      triggerPositive('Noticia actualizada con éxito');
      queryClient.invalidateQueries({ queryKey: ['news'] });
    },
    onError: () => {
      triggerWarning(ERROR_MESSAGE);
    },
  });
};

export const useDeleteNewMutation = () => {
  const { triggerPositive, triggerWarning } = useToast();
  const queryClient = useQueryClient();

  return useMutation(deleteNew, {
    onSuccess: () => {
      triggerPositive('Noticia eliminada con éxito');
      queryClient.invalidateQueries({ queryKey: ['news'] });
    },
    onError: () => {
      triggerWarning(ERROR_MESSAGE);
    },
  });
};
