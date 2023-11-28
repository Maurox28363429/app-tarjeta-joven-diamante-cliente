import { useQuery } from '@tanstack/vue-query';

import getProductsOrder from 'src/api/getProductsOrder';

export const useGetBusiness = ({ search, page }) => {
  return useQuery(['order', page], () =>
    getProductsOrder({ pages: page?.value, search: search?.value })
  );
};
