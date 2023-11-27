import { useQuery } from '@tanstack/vue-query';

import getRoles from 'src/api/getRoles';

export const useGetRoles = () => {
  return useQuery(['role'], getRoles, {
    staleTime: Infinity,
    cacheTime: Infinity,
    refetchOnWindowFocus: false,
  });
};
