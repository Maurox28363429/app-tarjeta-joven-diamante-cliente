import { useQuery, useQueryClient, useMutation } from '@tanstack/vue-query';

import { useToast } from 'src/composables/useToast';

import { getConsecutivo, uploadConsecutive } from 'src/api/consecutive';

import TOAST_MESSAGE from 'src/shared/constansts/toastMessage';

const CONSECUTIVE_KEY = 'consecutive';

export const getConsecutiveQuery = () => {
  return useQuery([CONSECUTIVE_KEY], getConsecutivo);
};

export const uploadConsecutiveMutation = () => {
  const { triggerPositive } = useToast();
  const queryClient = useQueryClient();

  return useMutation(uploadConsecutive, {
    onSuccess: () => {
      triggerPositive(TOAST_MESSAGE.UPDATE);
      queryClient.invalidateQueries([CONSECUTIVE_KEY]);
    },
  });
};
