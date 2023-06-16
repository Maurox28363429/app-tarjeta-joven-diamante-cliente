import getHelpNumber from 'src/api/getHelpNumber';
import { useQuery } from '@tanstack/vue-query';

export const useGetHelpNumber = () => {
  return useQuery(['sos'], getHelpNumber);
};
