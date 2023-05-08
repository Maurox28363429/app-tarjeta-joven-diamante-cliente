import { useRouter } from 'vue-router'
import { useMutation, useQueryClient, useQuery } from '@tanstack/vue-query'

import updateUser from 'src/api/updateUser'
import getCodeForRecoveryPassword from 'src/api/getCodeForRecoveryPassword'
import validatePasswordAndCode from 'src/api/validatePasswordAndCode'
import changePassword from 'src/api/changePassword'
import getUser from 'src/api/getUser'

import { useToast } from 'src/composables/useToast'

const ERR_NETWORK_MESSAGE = 'Verifique su conexión a internet'
const ERROR_MESSAGE = 'Ah ocurrido un error, intente nuevamente'

export const useGetUserQuery = ({ id }) => {
  const { triggerWarning } = useToast()

  return useQuery(['user'], () => getUser(id), {
    onError: (error) => {
      console.error(error, 'error')
      if (error?.code === 'ERR_NETWORK') {
        triggerWarning(ERR_NETWORK_MESSAGE)
      }
    }
  })
}

export const useUpdateUserMutation = () => {
  const { triggerPositive, triggerWarning } = useToast()

  const queryClient = useQueryClient()

  return useMutation(updateUser, {
    onSuccess: () => {
      triggerPositive('Usuario actualizado con éxito')
      queryClient.invalidateQueries({
        queryKey: ['user']
      })
    },
    onError: (error) => {
      console.error(error, 'error')
      if (error?.code === 'ERR_NETWORK') {
        triggerWarning(ERR_NETWORK_MESSAGE)
      } else {
        triggerWarning(ERROR_MESSAGE)
      }
    }
  })
}

export const useSendEmail = () => {
  const { triggerPositive, triggerWarning } = useToast()
  const router = useRouter()

  const mutation = useMutation(getCodeForRecoveryPassword, {
    onSuccess: () => {
      triggerPositive('Código enviado, podría tardar unos minutos en llegar.')
      router.push({
        name: 'recoveryPassword'
      })
    },
    onError: (error) => {
      console.error(error, 'error')
      if (error?.code === 'ERR_NETWORK') {
        triggerWarning(ERR_NETWORK_MESSAGE)
      } else {
        triggerWarning(ERROR_MESSAGE)
      }
    }
  })

  return mutation
}

export const useChangePassword = () => {
  const { triggerPositive, triggerWarning } = useToast()
  const router = useRouter()

  const mutation = useMutation(changePassword, {
    onSuccess: () => {
      triggerPositive('La contraseña ha sido cambiada exitosamente.')
      router.push({ name: 'login' })
    },
    onError: (error) => {
      console.error(error, 'error')
      if (error?.code === 'ERR_NETWORK') {
        triggerWarning(ERR_NETWORK_MESSAGE)
      } else {
        triggerWarning(ERROR_MESSAGE)
      }
    }
  })

  return mutation
}

export const useValidatePasswordAndCode = () => {
  const { triggerPositive, triggerWarning } = useToast()
  const router = useRouter()

  const mutation = useMutation(validatePasswordAndCode, {
    onSuccess: () => {
      triggerPositive(
        '¡Código verificado!, ahora puede cambiar su contraseña.'
      )
      router.push({
        name: 'recoveryPassword'
      })
    },
    onError: (error) => {
      console.error(error, 'error')
      if (error?.code === 'ERR_NETWORK') {
        triggerWarning(ERR_NETWORK_MESSAGE)
      } else {
        triggerWarning(ERROR_MESSAGE)
      }
    }
  })

  return mutation
}

export const useSendEmailAgain = () => {
  const { triggerPositive, triggerWarning } = useToast()
  const router = useRouter()

  const mutation = useMutation(getCodeForRecoveryPassword, {
    onSuccess: () => {
      triggerPositive('¡Código reenviado!, puede tardar unos minutos')
      router.push({
        name: 'recoveryPassword'
      })
    },
    onError: (error) => {
      console.error(error, 'error')
      if (error?.code === 'ERR_NETWORK') {
        triggerWarning(ERR_NETWORK_MESSAGE)
      } else {
        triggerWarning(ERROR_MESSAGE)
      }
    }
  })

  return mutation
}
