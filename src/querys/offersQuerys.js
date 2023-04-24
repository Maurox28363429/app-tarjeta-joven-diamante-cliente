import { useQuery } from "@tanstack/vue-query";
import getOffersFromStore from "src/api/getOffersFromStore";
import { useToast } from "src/composables/useToast";

export const useGetOffers = ({ name, page, id }) => {
  const { triggerWarning } = useToast();

  const data = useQuery(
    ["offers"],
    () => getOffersFromStore({ name, page, id }),
    {
      onError: (error) => {
        console.log(error, "error");
        if (error?.code === "ERR_NETWORK") {
          triggerWarning("Verifique su conexión a internet");
        }
      },
    }
  );

  return data;
};
