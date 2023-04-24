import getNews from "src/api/getNews";
import { useQuery } from "@tanstack/vue-query";
import { useToast } from "src/composables/useToast";

export const useGetPromotions = (pagination) => {
  const { triggerWarning } = useToast();

  const data = useQuery(
    ["promotions", pagination.value.page, pagination.value.search],
    () => getNews(pagination.value),
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
