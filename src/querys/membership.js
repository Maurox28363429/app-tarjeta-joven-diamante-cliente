import { useMutation, useQueryClient, useQuery } from '@tanstack/vue-query';
import sendPayment from 'src/api/sendPayment';
import { useToast } from 'src/composables/useToast';
import getMemberships from 'src/api/getMemberships';
import paymentMembership from 'src/api/paymentMembership';

export const useSendPaymentMutation = () => {
  const queryClient = useQueryClient();
  const { triggerPositive } = useToast();

  return useMutation(sendPayment, {
    onSuccess: () => {
      triggerPositive('Pago enviado con éxito');
      queryClient.invalidateQueries({
        queryKey: ['payment'],
      });
    },
  });
};

export const useGetMembershipsQuery = () => {
  return useQuery(['memberships'], getMemberships);
};

export const usePaymentMembershipMutation = () => {
  const queryClient = useQueryClient();
  const { triggerPositive } = useToast();

  return useMutation(paymentMembership, {
    onSuccess: () => {
      triggerPositive('Membresía pagada con éxito');
      queryClient.invalidateQueries({
        queryKey: ['payment'],
      });
    },
  });
};
