import { useQuery, useQueryClient, useMutation } from '@tanstack/vue-query';
import deleteOffer from 'src/api/deleteOffer';
import { useToast } from 'src/composables/useToast';
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

export const useGetOffers = ({ name, page, id }) => {
  return useQuery(['offers', page], () =>
    getOffersFromStore({ name, page, id })
  );
};

export const useGetOffer = (currentRoute) => {
  return useQuery(['offers', currentRoute], () => getOffer(currentRoute.value));
};
export const useGetUniversitiesById = (id) => {
  return useQuery(['universities'], () => getUniversityById(id));
};

export const useGetOffersFromBusiness = ({ search, page, dir }) => {
  return useQuery(['offersFromBusiness', page, dir], () =>
    getOffers({ search: search.value, page: page.value, dir: dir?.value })
  );
};

export const useGetStates = ({ sort_ofertas = 0, sort_uni = 0 }) => {
  return useQuery(['states'], () => getStates({ sort_ofertas, sort_uni }), {
    refetchOnWindowFocus: false,
  });
};

export const useGetUniversities = ({ search, page, dir }) => {
  return useQuery(['universities', dir, page], () =>
    getUniversities({
      search: search.value,
      page: page.value,
      dir: dir.value,
    })
  );
};

export const useGetUniversitiesRoles = () => {
  return useQuery(['universitiesRoles'], getUniversitiesRole);
};

export const useDeleteOfferMutation = () => {
  const { triggerPositive } = useToast();
  const queryClient = useQueryClient();

  return useMutation(deleteOffer, {
    onSuccess: () => {
      triggerPositive('Oferta eliminada con éxito');
      queryClient.invalidateQueries({ queryKey: ['offersFromBusiness'] });
    },
  });
};

export const useDeleteUniversityOfferMutation = () => {
  const { triggerPositive } = useToast();
  const queryClient = useQueryClient();

  return useMutation(deleteUniversity, {
    onSuccess: () => {
      triggerPositive('Oferta eliminada con éxito');
      queryClient.invalidateQueries({ queryKey: ['universities'] });
    },
  });
};

export const useCreateUniversityOfferMutation = () => {
  const { triggerPositive } = useToast();
  const queryClient = useQueryClient();

  return useMutation(createUniversityOffer, {
    onSuccess: () => {
      triggerPositive('Oferta creada con éxito');
      queryClient.invalidateQueries({ queryKey: ['universities'] });
    },
  });
};

export const useEditOfferMutation = () => {
  const { triggerPositive } = useToast();
  const queryClient = useQueryClient();

  return useMutation(editOffer, {
    onSuccess: () => {
      triggerPositive('Oferta actualizada con éxito');
      queryClient.invalidateQueries({ queryKey: ['offersFromBusiness'] });
    },
  });
};

export const useEditUniversityOfferMutation = () => {
  const { triggerPositive } = useToast();
  const queryClient = useQueryClient();

  return useMutation(editUniversityOffer, {
    onSuccess: () => {
      triggerPositive('Oferta actualizada con éxito');
      queryClient.invalidateQueries({ queryKey: ['universities'] });
    },
  });
};

export const useCreateOfferMutation = () => {
  const { triggerPositive, triggerWarning } = useToast();
  const queryClient = useQueryClient();

  return useMutation(createOffer, {
    onSuccess: () => {
      triggerPositive('Oferta creada con éxito');
      queryClient.invalidateQueries({ queryKey: ['offersFromBusiness'] });
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
