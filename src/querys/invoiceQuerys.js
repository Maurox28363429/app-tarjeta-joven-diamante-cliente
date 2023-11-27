import { useMutation, useQueryClient } from '@tanstack/vue-query';

import { useToast } from 'src/composables/useToast';

import invoiceOffer from 'src/api/invoiceOffer';

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
    onError: () => {
      triggerWarning('Ha ocurrido un error al crear la factura de oferta');
    },
  });
};
