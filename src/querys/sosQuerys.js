import { useQuery, useMutation, useQueryClient } from '@tanstack/vue-query';

import {
  createSos,
  deleteSos,
  getHelpNumber,
  updateSos,
} from 'src/api/sos/index';

import { useToast } from 'src/composables/useToast';

import TOAST_MESSAGE from 'src/shared/constansts/toastMessage';

const SOS_KEY = 'sos';

export const useGetHelpNumber = ({ page, search }) => {
  return useQuery([SOS_KEY, page], async () =>
    getHelpNumber({ page: page?.value, search: search?.value })
  );
};

export const createSosMutate = () => {
  const queryClient = useQueryClient();
  const { triggerPositive, triggerWarning } = useToast();

  return useMutation(createSos, {
    onSuccess: () => {
      triggerPositive(TOAST_MESSAGE.CREATE);
      queryClient.invalidateQueries([SOS_KEY]);
    },
    onError: () => {
      triggerWarning(TOAST_MESSAGE.ERROR.DEFAULT);
    },
  });
};

export const updateSosMutate = () => {
  const queryClient = useQueryClient();

  const { triggerPositive, triggerWarning } = useToast();

  return useMutation(updateSos, {
    onSuccess: () => {
      triggerPositive(TOAST_MESSAGE.UPDATE);
      queryClient.invalidateQueries([SOS_KEY]);
    },
    onError: () => {
      triggerWarning(TOAST_MESSAGE.ERROR.DEFAULT);
    },
  });
};

export const deleteSosMutate = () => {
  const queryClient = useQueryClient();
  const { triggerPositive, triggerWarning } = useToast();

  return useMutation(deleteSos, {
    onSuccess: () => {
      triggerPositive(TOAST_MESSAGE.DELETE);
      queryClient.invalidateQueries([SOS_KEY]);
    },
    onError: () => {
      triggerWarning(TOAST_MESSAGE.ERROR.DEFAULT);
    },
  });
};
