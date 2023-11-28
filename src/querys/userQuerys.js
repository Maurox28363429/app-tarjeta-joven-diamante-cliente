import { useRouter } from 'vue-router';

import { useMutation, useQueryClient, useQuery } from '@tanstack/vue-query';

import { useToast } from 'src/composables/useToast';

import updateUser from 'src/api/updateUser';
import getCodeForRecoveryPassword from 'src/api/getCodeForRecoveryPassword';
import validatePasswordAndCode from 'src/api/validatePasswordAndCode';
import changePassword from 'src/api/changePassword';
import getUser from 'src/api/getUser';
import getUsers from 'src/api/getUsers';

import TOAST_MESSAGE from 'src/shared/constansts/toastMessage';

const USER_KEY = 'user';
const USERS_KEY = 'users';

export const useGetUserQuery = ({ id }) => {
  return useQuery([USER_KEY], () => getUser(id), {
    staleTime: Infinity,
    cacheTime: Infinity,
    refetchOnWindowFocus: false,
  });
};

export const useUpdateUserMutation = () => {
  const { triggerPositive, triggerWarning } = useToast();

  const queryClient = useQueryClient();

  return useMutation(updateUser, {
    onSuccess: () => {
      triggerPositive('Usuario actualizado con éxito');
      queryClient.invalidateQueries([USER_KEY]);
    },
    onError: () => {
      triggerWarning(TOAST_MESSAGE.ERROR.DEFAULT);
    },
  });
};

export const useSendEmail = () => {
  const { triggerPositive, triggerWarning } = useToast();
  const router = useRouter();

  return useMutation(getCodeForRecoveryPassword, {
    onSuccess: () => {
      triggerPositive('Código enviado, podría tardar unos minutos en llegar.');
      router.push({
        name: 'recoveryPassword',
      });
    },
    onError: () => {
      triggerWarning(TOAST_MESSAGE.ERROR.DEFAULT);
    },
  });
};

export const useChangePassword = () => {
  const { triggerPositive, triggerWarning } = useToast();
  const router = useRouter();

  return useMutation(changePassword, {
    onSuccess: () => {
      triggerPositive('La contraseña ha sido cambiada exitosamente.');
      router.push({ name: 'login' });
    },
    onError: () => {
      triggerWarning(TOAST_MESSAGE.ERROR.DEFAULT);
    },
  });
};

export const useValidatePasswordAndCode = () => {
  const { triggerPositive, triggerWarning } = useToast();
  const router = useRouter();

  return useMutation(validatePasswordAndCode, {
    onSuccess: () => {
      triggerPositive(
        '¡Código verificado!, ahora puede cambiar su contraseña.'
      );
      router.push({
        name: 'recoveryPassword',
      });
    },
    onError: () => {
      triggerWarning(TOAST_MESSAGE.ERROR.DEFAULT);
    },
  });
};

export const useSendEmailAgain = () => {
  const { triggerPositive, triggerWarning } = useToast();
  const router = useRouter();

  return useMutation(getCodeForRecoveryPassword, {
    onSuccess: () => {
      triggerPositive('¡Código reenviado!, puede tardar unos minutos');
      router.push({
        name: 'recoveryPassword',
      });
    },
    onError: () => {
      triggerWarning(TOAST_MESSAGE.ERROR.DEFAULT);
    },
  });
};

export const useGetUsersQuery = () => {
  return useQuery([USERS_KEY], getUsers);
};
