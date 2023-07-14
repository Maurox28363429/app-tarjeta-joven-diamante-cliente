import { useMutation, useQueryClient } from '@tanstack/vue-query';
import sendPayment from 'src/api/sendPayment';
import { useToast } from 'src/composables/useToast';

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
