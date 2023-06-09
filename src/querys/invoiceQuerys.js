import { useMutation, useQueryClient } from '@tanstack/vue-query';
import invoiceOffer from 'src/api/invoiceOffer';
import { useToast } from 'src/composables/useToast';

export const useInvoiceOfferMutation = () => {
  const { triggerPositive, triggerWarning } = useToast();

  const queryClient = useQueryClient();

  return useMutation(invoiceOffer, {
    onSuccess: () => {
      triggerPositive('Factura de oferta creada con éxito');
      queryClient.invalidateQueries({
        queryKey: ['offers', 'transactionsClient', 'transactionsBusiness'],
      });
    },
    onError: (error) => {
      console.error(error, 'error');
      triggerWarning('Ha ocurrido un error al crear la factura de oferta');
    },
  });
};
