import { useQuery } from "@tanstack/vue-query";
import getTransactionsClient from "src/api/getTransactionsClient";
import getTransactionsBusiness from "src/api/getTransationsBusiness";
import { useToast } from "src/composables/useToast";

const ERR_NETWORK_MESSAGE = "Verifique su conexión a internet";

export const useGetTransactionsClient = ({ page, id }) => {
  const { triggerWarning } = useToast();

  const data = useQuery(
    ["transactionsClient", page],
    () => getTransactionsClient({ page, id }),
    {
      onError: (error) => {
        console.error(error, "error");
        if (error?.code === "ERR_NETWORK") {
          triggerWarning(ERR_NETWORK_MESSAGE);
        }
      },
    }
  );

  return data;
};

export const useGetTransactionsBusiness = ({ page, id }) => {
  const { triggerWarning } = useToast();

  const data = useQuery(
    ["transactionsBusiness", page],
    () => getTransactionsBusiness({ page, id }),
    {
      onError: (error) => {
        console.error(error, "error");
        if (error?.code === "ERR_NETWORK") {
          triggerWarning(ERR_NETWORK_MESSAGE);
        }
      },
    }
  );

  return data;
};
