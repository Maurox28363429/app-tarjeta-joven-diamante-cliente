import { useQuery } from "@tanstack/vue-query";

import getOffersFromStore from "src/api/getOffersFromStore";
import getOffers from "src/api/getOffers";
import getStates from "src/api/getStates";
import getOffersForUniversitys from "src/api/getOffersForUniversitys";
import getUniversities from "src/api/getUniversity";

import { useToast } from "src/composables/useToast";

const ERR_NETWORK_MESSAGE = "Verifique su conexión a internet";

export const useGetOffers = ({ name, page, id }) => {
  const { triggerWarning } = useToast();

  return useQuery(
    ["offers", page],
    () => getOffersFromStore({ name, page, id }),
    {
      onError: (error) => {
        console.log(error, "error");
        if (error?.code === "ERR_NETWORK") {
          triggerWarning(ERR_NETWORK_MESSAGE);
        }
      },
    }
  );
};

export const useGetOffersFromBusiness = ({ search, page, dir }) => {
  const { triggerWarning } = useToast();

  return useQuery(
    ["offersFromBusiness", page, dir],
    () => getOffers({ search: search.value, page: page.value, dir: dir.value }),
    {
      onError: (error) => {
        console.log(error, "error");
        if (error?.code === "ERR_NETWORK") {
          triggerWarning(ERR_NETWORK_MESSAGE);
        }
      },
    }
  );
};

export const useGetStates = ({ sort_ofertas = 0, sort_uni = 0 }) => {
  const { triggerWarning } = useToast();

  return useQuery(["states"], () => getStates({ sort_ofertas, sort_uni }), {
    onError: (error) => {
      console.log(error, "error");
      if (error?.code === "ERR_NETWORK") {
        triggerWarning(ERR_NETWORK_MESSAGE);
      }
    },
  });
};

export const useGetUniversities = ({ search, page, dir }) => {
  const { triggerWarning } = useToast();

  return useQuery(
    ["universities", search, page],
    () =>
      getUniversities({
        search: search.value,
        page: page.value,
        dir: dir.value,
      }),
    {
      onError: (error) => {
        console.log(error, "error");
        if (error?.code === "ERR_NETWORK") {
          triggerWarning(ERR_NETWORK_MESSAGE);
        }
      },
    }
  );
};

export const useGetOffersForUniversity = ({ search, page, dir }) => {
  const { triggerWarning } = useToast();

  return useQuery(
    ["offersForUniversity", page, dir],
    () =>
      getOffersForUniversitys({
        search: search.value,
        page: page.value,
        dir: dir.value,
      }),
    {
      onError: (error) => {
        console.log(error, "error");
        if (error?.code === "ERR_NETWORK") {
          triggerWarning(ERR_NETWORK_MESSAGE);
        }
      },
    }
  );
};
