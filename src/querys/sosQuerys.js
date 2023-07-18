import getHelpNumber from 'src/api/getHelpNumber';
import createSos from 'src/api/createSos';
import updateSos from 'src/api/updateSos';
import deleteSos from 'src/api/deleteSos';
import { useQuery, useMutation, useQueryClient } from '@tanstack/vue-query';
import { useToast } from 'src/composables/useToast';

export const useGetHelpNumber = ({ page, search = '' }) => {
  return useQuery(['sos', page, search], async () =>
    getHelpNumber({ page: page.value, search: search.value })
  );
};

export const createSosMutate = () => {
  const queryClient = useQueryClient();
  const { triggerPositive, triggerWarning } = useToast();

  return useMutation(createSos, {
    onSuccess: () => {
      triggerPositive('Creado con éxito');
      queryClient.invalidateQueries({
        queryKey: ['sos'],
      });
    },
    onError: () => {
      triggerWarning('Ah ocurrido un error, intente nuevamente');
    },
  });
};

export const updateSosMutate = () => {
  const queryClient = useQueryClient();

  const { triggerPositive, triggerWarning } = useToast();

  return useMutation(updateSos, {
    onSuccess: () => {
      triggerPositive('Actualizado con éxito');
      queryClient.invalidateQueries({
        queryKey: ['sos'],
      });
    },
    onError: () => {
      triggerWarning('Ah ocurrido un error, intente nuevamente');
    },
  });
};

export const deleteSosMutate = () => {
  const queryClient = useQueryClient();
  const { triggerPositive, triggerWarning } = useToast();

  return useMutation(deleteSos, {
    onSuccess: () => {
      triggerPositive('Eliminado con éxito');
      queryClient.invalidateQueries({
        queryKey: ['sos'],
      });
    },
    onError: () => {
      triggerWarning('Ah ocurrido un error, intente nuevamente');
    },
  });
};
