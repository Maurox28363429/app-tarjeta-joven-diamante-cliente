import { useQuery } from '@tanstack/vue-query';

import getTransactionsClient from 'src/api/getTransactionsClient';
import getTransactionsBusiness from 'src/api/getTransationsBusiness';

export const TRANSACTIONS_CLIENT_KEY = 'transactionsClient';
export const TRANSACTIONS_BUSINESS_KEY = 'transactionsBusiness';

export const useGetTransactionsClient = ({ page, id }) => {
  return useQuery([TRANSACTIONS_CLIENT_KEY, page], () =>
    getTransactionsClient({ page, id })
  );
};

export const useGetTransactionsBusiness = ({ page, id }) => {
  return useQuery([TRANSACTIONS_BUSINESS_KEY, page], () =>
    getTransactionsBusiness({ page, id })
  );
};
