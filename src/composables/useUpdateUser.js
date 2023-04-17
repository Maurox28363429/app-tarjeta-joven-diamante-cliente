import { ref } from "vue";
import updateUser from "src/api/updateUser";

export const useUpdateUser = () => {
  const loading = ref(false);

  const fetchUpdateUser = async () => {
    try {
      loading.value = true;
      const { data } = await updateUser();
      console.lo(data);
    } catch (error) {
      console.error(error);
    } finally {
      loading.value = false;
    }
  };

  return { loading, fetchUpdateUser };
};
