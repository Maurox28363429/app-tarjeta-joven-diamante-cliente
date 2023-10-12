import { useQuery } from '@tanstack/vue-query';
import getBusiness from 'src/api/getBusiness';

export const useGetBusiness = ({ search = '' }) => {
  return useQuery(
    ['business', search],
    () => getBusiness({ search: search?.value }),
    {
      staleTime: Infinity,
      cacheTime: Infinity,
    }
  );
};
