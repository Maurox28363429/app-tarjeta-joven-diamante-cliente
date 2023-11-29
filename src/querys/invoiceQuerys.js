import { useMutation, useQueryClient } from '@tanstack/vue-query';

import { useToast } from 'src/composables/useToast';

import invoiceOffer from 'src/api/invoiceOffer';

import TOAST_MESSAGE from 'src/shared/constansts/toastMessage';

import { OFFERS_KEY } from './offersQuerys';

import {
  TRANSACTIONS_CLIENT_KEY,
  TRANSACTIONS_BUSINESS_KEY,
} from './transactionsQuerys';

export const useInvoiceOfferMutation = () => {
  const { triggerPositive, triggerWarning } = useToast();

  const queryClient = useQueryClient();

  return useMutation(invoiceOffer, {
    onSuccess: () => {
      triggerPositive('Factura de oferta creada con éxito');
      queryClient.invalidateQueries([
        OFFERS_KEY,
        TRANSACTIONS_CLIENT_KEY,
        TRANSACTIONS_BUSINESS_KEY,
      ]);
    },
    onError: () => {
      triggerWarning(TOAST_MESSAGE.ERROR.DEFAULT);
    },
  });
};
