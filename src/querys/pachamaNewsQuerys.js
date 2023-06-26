import { useQuery, useQueryClient, useMutation } from '@tanstack/vue-query';
import { useToast } from 'src/composables/useToast';
import getNewsPachama from 'src/api/getNewsPachama';
import createNoticiaPachama from 'src/api/createNoticiaPachama.js';
import editNoticiaPachama from 'src/api/editNoticiaPachama.js';
import deletePachamaNew from 'src/api/deletePachamaNew';

const ERROR_MESSAGE = 'Ah ocurrido un error, intente nuevamente';
export const useGetPachamaNews = ({ search, pages = {} }) => {
  return useQuery(['pachamaNews', pages], () =>
    getNewsPachama({ search: search.value, pages: pages.value.current })
  );
};

export const useCreateNewMutation = () => {
  const { triggerPositive, triggerWarning } = useToast();
  const queryClient = useQueryClient();

  return useMutation(createNoticiaPachama, {
    onSuccess: () => {
      triggerPositive('Noticia creada con éxito');
      queryClient.invalidateQueries({ queryKey: ['pachamaNews'] });
    },
    onError: () => {
      triggerWarning(ERROR_MESSAGE);
    },
  });
};

export const useEditNewMutation = () => {
  const { triggerPositive, triggerWarning } = useToast();
  const queryClient = useQueryClient();

  return useMutation(editNoticiaPachama, {
    onSuccess: () => {
      triggerPositive('Noticia actualizada con éxito');
      queryClient.invalidateQueries({ queryKey: ['pachamaNews'] });
    },
    onError: () => {
      triggerWarning(ERROR_MESSAGE);
    },
  });
};

export const useDeletePachamaNewMutation = () => {
  const { triggerPositive, triggerWarning } = useToast();
  const queryClient = useQueryClient();

  return useMutation(deletePachamaNew, {
    onSuccess: () => {
      triggerPositive('Noticia eliminada con éxito');
      queryClient.invalidateQueries({ queryKey: ['pachamaNews'] });
    },
    onError: () => {
      triggerWarning(ERROR_MESSAGE);
    },
  });
};
