import { useQuery, useQueryClient, useMutation } from '@tanstack/vue-query';
import getConsecutivo from 'src/api/getConsecutivo';
import uploadConsecutive from 'src/api/uploadConsecutive';
import { useToast } from 'src/composables/useToast';

export const getConsecutiveQuery = () => {
  return useQuery(['consecutive'], getConsecutivo);
};

export const uploadConsecutiveMutation = () => {
  const { triggerPositive } = useToast();
  const queryClient = useQueryClient();

  return useMutation(uploadConsecutive, {
    onSuccess: () => {
      triggerPositive('Consecutivo editado con éxito');
      queryClient.invalidateQueries('consecutive');
    },
  });
};
