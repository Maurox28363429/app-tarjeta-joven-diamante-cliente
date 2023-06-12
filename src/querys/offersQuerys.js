import { useQuery } from '@tanstack/vue-query';

import getOffersFromStore from 'src/api/getOffersFromStore';
import getOffers from 'src/api/getOffers';
import getStates from 'src/api/getStates';
import getOffersForUniversitys from 'src/api/getOffersForUniversitys';
import getUniversities from 'src/api/getUniversity';

export const useGetOffers = ({ name, page, id }) => {
  return useQuery(['offers', page], () =>
    getOffersFromStore({ name, page, id })
  );
};

export const useGetOffersFromBusiness = ({ search, page, dir }) => {
  return useQuery(['offersFromBusiness', page, dir], () =>
    getOffers({ search: search.value, page: page.value, dir: dir.value })
  );
};

export const useGetStates = ({ sort_ofertas = 0, sort_uni = 0 }) => {
  return useQuery(['states'], () => getStates({ sort_ofertas, sort_uni }));
};

export const useGetUniversities = ({ search, page, dir }) => {
  return useQuery(['universities', search, page], () =>
    getUniversities({
      search: search.value,
      page: page.value,
      dir: dir.value,
    })
  );
};

export const useGetOffersForUniversity = ({ search, page, dir }) => {
  return useQuery(['offersForUniversity', page, dir], () =>
    getOffersForUniversitys({
      search: search.value,
      page: page.value,
      dir: dir.value,
    })
  );
};
