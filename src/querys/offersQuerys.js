import { useQuery } from "@tanstack/vue-query";

import getOffersFromStore from "src/api/getOffersFromStore";
import getOffers from "src/api/getOffers";

import { useToast } from "src/composables/useToast";

const ERR_NETWORK_MESSAGE = "Verifique su conexión a internet";

export const useGetOffers = ({ name, page, id }) => {
  const { triggerWarning } = useToast();

  const data = useQuery(
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

  return data;
};

export const useGetOffersFromBusiness = ({ search, page }) => {
  const { triggerWarning } = useToast();

  const data = useQuery(
    ["offersFromBusiness", page],
    () => getOffers({ search: search.value, page: page.value }),
    {
      onError: (error) => {
        console.log(error, "error");
        if (error?.code === "ERR_NETWORK") {
          triggerWarning(ERR_NETWORK_MESSAGE);
        }
      },
    }
  );

  return data;
};
