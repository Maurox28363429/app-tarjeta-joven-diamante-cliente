import { useQuery } from '@tanstack/vue-query';

import getRaffles from 'src/api/getraffles';

export const useGetRaffles = () => {
  return useQuery(['rafles'], getRaffles);
};
