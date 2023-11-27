import { useQuery } from '@tanstack/vue-query';

import getTransactionsClient from 'src/api/getTransactionsClient';
import getTransactionsBusiness from 'src/api/getTransationsBusiness';

export const useGetTransactionsClient = ({ page, id }) => {
  return useQuery(['transactionsClient', page], () =>
    getTransactionsClient({ page, id })
  );
};

export const useGetTransactionsBusiness = ({ page, id }) => {
  return useQuery(['transactionsBusiness', page], () =>
    getTransactionsBusiness({ page, id })
  );
};
