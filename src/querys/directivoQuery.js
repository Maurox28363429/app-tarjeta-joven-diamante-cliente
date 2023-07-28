import { useQuery, useQueryClient, useMutation } from '@tanstack/vue-query';
import getDirectivos from 'src/api/getDirectivos';
import deleteDirectivo from 'src/api/deleteDirectivo';
import createDirectivo from 'src/api/createDirectivo';
import uploadDirectivo from 'src/api/uploadDirectivo';
import { useToast } from 'src/composables/useToast';

const ERROR_MESSAGE = 'Ha ocurrido un error';

export const useGetDirectivo = ({ page, search }) => {
  console.log('useGetDirectivo', page.value);
  return useQuery(['directivo', page], () =>
    getDirectivos({ page: page.value, search: search.value })
  );
};

export const useDeleteDirectivoMutation = () => {
  const { triggerPositive, triggerWarning } = useToast();
  const queryClient = useQueryClient();

  return useMutation(deleteDirectivo, {
    onSuccess: () => {
      triggerPositive('Directivo eliminada con éxito');
      queryClient.invalidateQueries({ queryKey: ['directivo'] });
    },
    onError: () => {
      triggerWarning(ERROR_MESSAGE);
    },
  });
};

export const useCreateDirectivoMutation = () => {
  const { triggerPositive, triggerWarning } = useToast();
  const queryClient = useQueryClient();

  return useMutation(createDirectivo, {
    onSuccess: () => {
      triggerPositive('Directivo creado con éxito');
      queryClient.invalidateQueries({ queryKey: ['directivo'] });
    },
    onError: () => {
      triggerWarning(ERROR_MESSAGE);
    },
  });
};

export const useUploadDirectivoMutation = () => {
  const { triggerPositive, triggerWarning } = useToast();
  const queryClient = useQueryClient();

  return useMutation(uploadDirectivo, {
    onSuccess: () => {
      triggerPositive('Directivo actualizado con éxito');
      queryClient.invalidateQueries({ queryKey: ['directivo'] });
    },
    onError: () => {
      triggerWarning(ERROR_MESSAGE);
    },
  });
};
