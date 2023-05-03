import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "src/stores/useAuthStore";
import { useToast } from "./useToast";
import { useGetUserQuery } from "src/querys/userQuerys";

export const userAuth = () => {
  const authStore = useAuthStore();
  const isLoadingLogin = ref(false);
  const isLoadingRegister = ref(false);
  const isLoadingMembership = ref(false);

  const { token } = authStore;
  const user = computed(() => authStore?.user);
  const { triggerPositive, triggerWarning } = useToast();

  const router = useRouter();

  const {
    isLoading: isLoadingUser,
    data: userData,
    isFetching: isFetchingUser,
  } = useGetUserQuery({ id: user.value?.id });

  console.log(userData, "userData");
  console.log(isLoadingUser.value, "loadingUser");

  const ERR_NETWORK_MESSAGE =
    "Verifique su conexión a internet e intente nuevamente";
  const ERROR_MESSAGE = "Error desconocido";

  const membershipsIsActive = () =>
    userAuth?.user.membresia?.status === "activa" ||
    userAuth?.user.membresia?.days > 0;

  const login = async ({ password, email }) => {
    try {
      isLoadingLogin.value = true;
      await authStore.login({ password, email });
      triggerPositive("Usuario iniciado con éxito");
    } catch (err) {
      const errorMessage =
        err.response?.status === 400
          ? "Usuario no encontrado, por favor verifique sus datos e intente nuevamente"
          : err.code === "ERR_NETWORK"
          ? ERR_NETWORK_MESSAGE
          : ERROR_MESSAGE;
      triggerWarning(errorMessage);

      console.error(err);
    } finally {
      isLoadingLogin.value = false;
    }
  };

  const register = async (data) => {
    try {
      isLoadingRegister.value = true;
      await authStore.register(data);
      triggerPositive("Usuario registrado con éxito");
    } catch (err) {
      const errorMessage =
        err.response?.status === 400
          ? "Ese usuario ya exite, por favor ingrese otro correo o número de teléfono"
          : err.code === "ERR_NETWORK"
          ? ERR_NETWORK_MESSAGE
          : ERROR_MESSAGE;
      triggerWarning(errorMessage);
      console.error(err);
    } finally {
      isLoadingRegister.value = false;
    }
  };

  const addMembership = async ({ user_id }) => {
    try {
      isLoadingMembership.value = true;
      await authStore.addMembership({ user_id });
      triggerPositive("Ha obtenido la membresía con éxito");
      router.push("/cliente/Offers");
    } catch (error) {
      if (error.response.status === 404) {
        triggerWarning(error.response.data.message);
      } else {
        const errorMessage =
          error.code === "ERR_NETWORK" ? ERR_NETWORK_MESSAGE : ERROR_MESSAGE;
        triggerWarning(errorMessage);
      }
      console.error(error);
    } finally {
      isLoadingMembership.value = false;
    }
  };

  const isActiveUser = () => Boolean(userAuth.user);
  const isAuthenticated = () => Boolean(token);

  return {
    isActiveUser,
    membershipsIsActive,
    login,
    register,
    token,
    user,
    isLoadingLogin,
    isAuthenticated,
    isLoadingRegister,
    addMembership,
    isLoadingMembership,
    userData,
    isLoadingUser,
    isFetchingUser,
    updatedUser: authStore.updated,
  };
};
