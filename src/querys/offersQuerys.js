import { useQuery, useQueryClient, useMutation } from '@tanstack/vue-query';

import { useToast } from 'src/composables/useToast';

import deleteOffer from 'src/api/deleteOffer';
import editOffer from 'src/api/editOffer';
import createOffer from 'src/api/createOffer';
import getOffersFromStore from 'src/api/getOffersFromStore';
import getOffers from 'src/api/getOffers';
import getStates from 'src/api/getStates';
import getUniversities from 'src/api/getUniversity';
import createUniversityOffer from 'src/api/createUniversityOffer';
import deleteUniversity from 'src/api/deleteUniversity';
import editUniversityOffer from 'src/api/editUniversityOffer';
import getUniversitiesRole from 'src/api/getUniversitiesRole';
import getOffer from 'src/api/getOffer';
import getUniversityById from 'src/api/getUniversityById';

import TOAST_MESSAGE from 'src/shared/constansts/toastMessage';

export const OFFERS_KEY = 'offers';
const OFFERS_FROM_BUSINESS_KEY = 'offersFromBusiness';
const UNIVERSITIES_KEY = 'universities';
const STATES_KEY = 'states';
const UNIVERSITIES_ROLES = 'universitiesRoles';

export const useGetOffers = ({ name, page, id }) => {
  return useQuery([OFFERS_KEY, page], () =>
    getOffersFromStore({ name, page, id })
  );
};

export const useGetOffer = (currentRoute) => {
  return useQuery([OFFERS_KEY, currentRoute], () =>
    getOffer(currentRoute?.value)
  );
};
export const useGetUniversitiesById = (id) => {
  return useQuery([UNIVERSITIES_KEY], () => getUniversityById(id));
};

export const useGetOffersFromBusiness = ({ search, page, dir }) => {
  return useQuery([OFFERS_FROM_BUSINESS_KEY, page, dir], () =>
    getOffers({ search: search?.value, page: page?.value, dir: dir?.value })
  );
};

export const useGetStates = ({ sort_ofertas = 0, sort_uni = 0 }) => {
  return useQuery([STATES_KEY], () => getStates({ sort_ofertas, sort_uni }), {
    refetchOnWindowFocus: false,
  });
};

export const useGetUniversities = ({ search, page, dir }) => {
  return useQuery([UNIVERSITIES_KEY, dir, page], () =>
    getUniversities({
      search: search?.value,
      page: page?.value,
      dir: dir?.value,
    })
  );
};

export const useGetUniversitiesRoles = () => {
  return useQuery([UNIVERSITIES_ROLES], getUniversitiesRole);
};

export const useDeleteOfferMutation = () => {
  const { triggerPositive } = useToast();
  const queryClient = useQueryClient();

  return useMutation(deleteOffer, {
    onSuccess: () => {
      triggerPositive(TOAST_MESSAGE.DELETE);
      queryClient.invalidateQueries([OFFERS_FROM_BUSINESS_KEY]);
    },
  });
};

export const useDeleteUniversityOfferMutation = () => {
  const { triggerPositive } = useToast();
  const queryClient = useQueryClient();

  return useMutation(deleteUniversity, {
    onSuccess: () => {
      triggerPositive(TOAST_MESSAGE.DELETE);
      queryClient.invalidateQueries([UNIVERSITIES_KEY]);
    },
  });
};

export const useCreateUniversityOfferMutation = () => {
  const { triggerPositive } = useToast();
  const queryClient = useQueryClient();

  return useMutation(createUniversityOffer, {
    onSuccess: () => {
      triggerPositive(TOAST_MESSAGE.CREATE);
      queryClient.invalidateQueries([UNIVERSITIES_KEY]);
    },
  });
};

export const useEditOfferMutation = () => {
  const { triggerPositive } = useToast();
  const queryClient = useQueryClient();

  return useMutation(editOffer, {
    onSuccess: () => {
      triggerPositive(TOAST_MESSAGE.UPDATE);
      queryClient.invalidateQueries([OFFERS_FROM_BUSINESS_KEY]);
    },
  });
};

export const useEditUniversityOfferMutation = () => {
  const { triggerPositive } = useToast();
  const queryClient = useQueryClient();

  return useMutation(editUniversityOffer, {
    onSuccess: () => {
      triggerPositive(TOAST_MESSAGE.UPDATE);
      queryClient.invalidateQueries([UNIVERSITIES_KEY]);
    },
  });
};

export const useCreateOfferMutation = () => {
  const { triggerPositive, triggerWarning } = useToast();
  const queryClient = useQueryClient();

  return useMutation(createOffer, {
    onSuccess: () => {
      triggerPositive(TOAST_MESSAGE.CREATE);
      queryClient.invalidateQueries([OFFERS_FROM_BUSINESS_KEY]);
    },
    onError: (error) => {
      if (error.response.status === 409) {
        triggerWarning(
          'Por favor, verifique que la oferta no exista o que los  datos sean correctos'
        );
      }
    },
  });
};
