import getNewsPachama from 'src/api/getNewsPachama';
import { useQuery } from '@tanstack/vue-query';

export const useGetPachamaNews = ({ search, pages = {} }) => {
  return useQuery(['pachamaNews', pages], () =>
    getNewsPachama({ search: search.value, pages: pages.value })
  );
};
