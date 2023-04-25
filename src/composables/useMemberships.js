import { ref, onMounted } from "vue";
import getMemberships from "src/api/getMemberships";
import proImage from "../assets/rocket.svg";
import freeImage from "../assets/plane.svg";

export const useMemberships = () => {
  const loading = ref(false);
  const memberships = ref([]);

  const PRO_IMAGE = proImage;
  const FREE_IMAGE = freeImage;
  const FREE = "Membresia 5 Días";
  const PRO = "Membresia anual";

  const benefits = {
    [PRO]: [
      "Obten descuentos en tus compras",
      "Participa en sorteos y obten premios",
      "Tendras acceso a la compra de productos y servicios premium",
    ],
    [FREE]: [
      "Obten descuentos en tu periodo de prueba",
      "Tendras acceso a productos y servicios premium",
    ],
  };

  const images = {
    [PRO]: PRO_IMAGE,
    [FREE]: FREE_IMAGE,
  };

  const fetchMemberships = async () => {
    try {
      loading.value = true;
      const { data } = await getMemberships();
      memberships.value = data.map((membership) => {
        return {
          ...membership,
          image: images[membership.name],
          benefits: benefits[membership.name],
        };
      });
    } catch (error) {
      console.error(error);
    } finally {
      loading.value = false;
    }
  };

  onMounted(() => {
    fetchMemberships();
  });

  return { loading, memberships, fetchMemberships };
};
