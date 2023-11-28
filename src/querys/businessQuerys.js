import { useQuery } from '@tanstack/vue-query';

import getBusiness from 'src/api/getBusiness';

const BUSINESS_KEY = 'business';

export const useGetBusiness = ({ search }) => {
  return useQuery(
    [BUSINESS_KEY, search],
    () => getBusiness({ search: search?.value }),
    {
      staleTime: Infinity,
      cacheTime: Infinity,
    }
  );
};
