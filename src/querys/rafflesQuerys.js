import getRaffles from 'src/api/getraffles';
import { useQuery } from '@tanstack/vue-query';

export const useGetRaffles = () => {
  return useQuery(['rafles'], getRaffles);
};
