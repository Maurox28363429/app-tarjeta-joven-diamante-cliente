import getNewsInformative from 'src/api/getNewsInformative';
import { useQuery } from '@tanstack/vue-query';

export const useGetNewsInformative = ({ search, pages = {} }) => {
  return useQuery(['news', pages], () =>
    getNewsInformative({ search: search.value, pages: pages.value })
  );
};
