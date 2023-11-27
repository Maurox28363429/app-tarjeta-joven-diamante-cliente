import { useMutation, useQueryClient, useQuery } from '@tanstack/vue-query';

import { useToast } from 'src/composables/useToast';

import sendPayment from 'src/api/sendPayment';
import getMemberships from 'src/api/getMemberships';
import paymentMembership from 'src/api/paymentMembership';

const PAYMENT_KEY = 'payment';
const MEMBERSHIP_KEY = 'membership';

export const useSendPaymentMutation = () => {
  const queryClient = useQueryClient();
  const { triggerPositive } = useToast();

  return useMutation(sendPayment, {
    onSuccess: () => {
      triggerPositive('Pago enviado con éxito');
      queryClient.invalidateQueries([PAYMENT_KEY]);
    },
  });
};

export const usePaymentMembershipMutation = () => {
  const queryClient = useQueryClient();
  const { triggerPositive } = useToast();

  return useMutation(paymentMembership, {
    onSuccess: () => {
      triggerPositive('Membresía pagada con éxito');
      queryClient.invalidateQueries([PAYMENT_KEY]);
    },
  });
};

export const useGetMembershipsQuery = () => {
  return useQuery([MEMBERSHIP_KEY], getMemberships);
};
