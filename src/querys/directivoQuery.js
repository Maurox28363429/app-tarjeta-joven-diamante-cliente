import { useQuery, useQueryClient, useMutation } from '@tanstack/vue-query';

import { useToast } from 'src/composables/useToast';

import {
  createDirectivo,
  deleteDirectivo,
  getDirectivos,
  uploadDirectivo,
} from 'src/api/directory/index';

import TOAST_MESSAGE from 'src/shared/constansts/toastMessage';

const TELEPHONE_DIRECTORY_KEY = 'directivo';

export const useGetDirectivo = ({ page, search }) => {
  return useQuery([TELEPHONE_DIRECTORY_KEY, page], () =>
    getDirectivos({ page: page?.value, search: search?.value })
  );
};

export const useDeleteDirectivoMutation = () => {
  const { triggerPositive, triggerWarning } = useToast();
  const queryClient = useQueryClient();

  return useMutation(deleteDirectivo, {
    onSuccess: () => {
      triggerPositive(TOAST_MESSAGE.DELETE);
      queryClient.invalidateQueries([TELEPHONE_DIRECTORY_KEY]);
    },
    onError: () => {
      triggerWarning(TOAST_MESSAGE.ERROR.DEFAULT);
    },
  });
};

export const useCreateDirectivoMutation = () => {
  const { triggerPositive, triggerWarning } = useToast();
  const queryClient = useQueryClient();

  return useMutation(createDirectivo, {
    onSuccess: () => {
      triggerPositive(TOAST_MESSAGE.CREATE);
      queryClient.invalidateQueries([TELEPHONE_DIRECTORY_KEY]);
    },
    onError: () => {
      triggerWarning(TOAST_MESSAGE.ERROR.DEFAULT);
    },
  });
};

export const useUploadDirectivoMutation = () => {
  const { triggerPositive, triggerWarning } = useToast();
  const queryClient = useQueryClient();

  return useMutation(uploadDirectivo, {
    onSuccess: () => {
      triggerPositive(TOAST_MESSAGE.UPDATE);
      queryClient.invalidateQueries([TELEPHONE_DIRECTORY_KEY]);
    },
    onError: () => {
      triggerWarning(TOAST_MESSAGE.ERROR.DEFAULT);
    },
  });
};
