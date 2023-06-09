import getNews from 'src/api/getNews';
import { useQuery } from '@tanstack/vue-query';

export const useGetPromotions = ({ search, pages = {} }) => {
  return useQuery(['promotions', pages], () =>
    getNews({ search: search.value, pages: pages.value })
  );
};
