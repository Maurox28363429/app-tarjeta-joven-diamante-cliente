import { useQuery } from "@tanstack/vue-query";
import getAppVersion from "src/api/getAppVersion";
import { useToast } from "src/composables/useToast";

const ERR_NETWORK_MESSAGE = "Verifique su conexión a internet";

export const useGetAppVersion = () => {
  const { triggerWarning } = useToast();

  return useQuery(["appVersion"], () => getAppVersion(), {
    onError: (error) => {
      console.error(error, "error");
      if (error?.code === "ERR_NETWORK") {
        triggerWarning(ERR_NETWORK_MESSAGE);
      }
    },
  });
};
