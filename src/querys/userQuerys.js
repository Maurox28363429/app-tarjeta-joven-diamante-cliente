import { useMutation, useQueryClient } from "@tanstack/vue-query";
import updateUser from "src/api/updateUser";
import getCodeForRecoveryPassword from "src/api/getCodeForRecoveryPassword";
import validatePasswordAndCode from "src/api/validatePasswordAndCode";
import changePassword from "src/api/changePassword";
import { useToast } from "src/composables/useToast";
import { useRouter } from "vue-router";

export const useUpdateUserMutation = () => {
  const { triggerPositive, triggerWarning } = useToast();

  const queryClient = useQueryClient();

  return useMutation(updateUser, {
    onSuccess: () => {
      triggerPositive("Usuario actualizado con éxito");
      queryClient.invalidateQueries({
        queryKey: ["user"],
      });
    },
    onError: (error) => {
      console.error(error, "error");
      if (error?.code === "ERR_NETWORK") {
        triggerWarning("Verifique su conexión a internet");
      } else {
        triggerWarning("Ah ocurrido un error, intente nuevamente");
      }
    },
  });
};

export const useSendEmail = () => {
  const { triggerPositive, triggerWarning } = useToast();
  const router = useRouter();

  const queryClient = useQueryClient();

  const mutation = useMutation(getCodeForRecoveryPassword, {
    onSuccess: () => {
      triggerPositive("Código enviado, podría tardar unos minutos en llegar.");
      queryClient.invalidateQueries({
        queryKey: ["user"],
      });
      router.push({
        name: "recoveryPassword",
      });
    },
    onError: (error) => {
      console.error(error, "error");
      if (error?.code === "ERR_NETWORK") {
        triggerWarning("Verifique su conexión a internet");
      } else {
        triggerWarning("Ah ocurrido un error, intente nuevamente");
      }
    },
  });

  return mutation;
};

export const useChangePassword = () => {
  const { triggerPositive, triggerWarning } = useToast();
  const router = useRouter();

  const queryClient = useQueryClient();

  const mutation = useMutation(changePassword, {
    onSuccess: () => {
      triggerPositive("La contraseña ha sido cambiada exitosamente.");
      queryClient.invalidateQueries({
        queryKey: ["user"],
      });
      router.push({ name: "login" });
    },
    onError: (error) => {
      console.error(error, "error");
      if (error?.code === "ERR_NETWORK") {
        triggerWarning("Verifique su conexión a internet");
      } else {
        triggerWarning("Ah ocurrido un error, intente nuevamente");
      }
    },
  });

  return mutation;
};

export const useValidatePasswordAndCode = () => {
  const { triggerPositive, triggerWarning } = useToast();
  const router = useRouter();

  const queryClient = useQueryClient();

  const mutation = useMutation(validatePasswordAndCode, {
    onSuccess: () => {
      triggerPositive(
        "¡Código verificado!, ahora puede cambiar su contraseña."
      );
      queryClient.invalidateQueries({
        queryKey: ["user"],
      });
      router.push({
        name: "recoveryPassword",
      });
    },
    onError: (error) => {
      console.error(error, "error");
      if (error?.code === "ERR_NETWORK") {
        triggerWarning("Verifique su conexión a internet");
      } else {
        triggerWarning("Ah ocurrido un error, intente nuevamente");
      }
    },
  });

  return mutation;
};

export const useSendEmailAgain = () => {
  const { triggerPositive, triggerWarning } = useToast();
  const router = useRouter();

  const queryClient = useQueryClient();

  const mutation = useMutation(getCodeForRecoveryPassword, {
    onSuccess: () => {
      triggerPositive("¡Código reenviado!, puede tardar unos minutos");
      queryClient.invalidateQueries({
        queryKey: ["user"],
      });
      router.push({
        name: "recoveryPassword",
      });
    },
    onError: (error) => {
      console.error(error, "error");
      if (error?.code === "ERR_NETWORK") {
        triggerWarning("Verifique su conexión a internet");
      } else {
        triggerWarning("Ah ocurrido un error, intente nuevamente");
      }
    },
  });

  return mutation;
};
