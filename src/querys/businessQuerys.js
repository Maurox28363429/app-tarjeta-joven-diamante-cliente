import { useQuery } from '@tanstack/vue-query';
import getBusiness from 'src/api/getBusiness';

export const useGetBusiness = () => {
  return useQuery(['business'], getBusiness);
};
