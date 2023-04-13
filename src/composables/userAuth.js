import { useAuthStore } from 'src/stores/useAuthStore'
import { ref, computed } from 'vue'
import { useToast } from './useToast'

export const userAuth = () => {
  const authStore = useAuthStore()
  const isLoadingLogin = ref(false)
  const isLoadingRegister = ref(false)
  const isLoadingMembership = ref(false)

  const { token } = authStore

  const membershipsIsActive = () => {
    if (
      userAuth?.user.membresia?.status === 'activa' ||
      userAuth?.user.membresia?.days > 0
    ) {
      return true
    }
    return false
  }

  const user = computed(() => authStore?.user)

  const { triggerPositive, triggerWarning } = useToast()

  const login = async ({ password, email }) => {
    try {
      isLoadingLogin.value = true
      await authStore.login({ password, email })
      triggerPositive('Usuario iniciado con éxito')
    } catch (err) {
      if (err.response?.status === 400) {
        triggerWarning(
          'Usuario no encontrado, por favor verifique sus datos e intente nuevamente'
        )
      }
      if (err.code === 'ERR_NETWORK') {
        triggerWarning('Verifique su conexión a internet e intente nuevamente')
      }
      console.error(err)
    } finally {
      isLoadingLogin.value = false
    }
  }

  const updatedUser = () => {
    return authStore.updated()
  }

  const addMembership = async ({ user_id }) => {
    try {
      isLoadingMembership.value = true
      await authStore.addMembership({ user_id })
      triggerPositive('Ha obtenido la membresía con éxito')
    } catch (err) {
      if (err.code === 'ERR_NETWORK') {
        triggerWarning('Verifique su conexión a internet e intente nuevamente')
      }
      console.error(err)
    } finally {
      isLoadingMembership.value = false
    }
  }

  const register = async ({
    name,
    email,
    last_name,
    phone,
    sex,
    password,
    role_id
  }) => {
    try {
      isLoadingRegister.value = true
      await authStore.register({
        name,
        email,
        last_name,
        phone,
        sex,
        password,
        role_id
      })
      triggerPositive('Usuario registrado con éxito')
    } catch (err) {
      if (err.response?.status === 400) {
        triggerWarning(
          'Ese usuario ya exite, por favor ingrese otro correo o número de teléfono'
        )
      }
      if (err.code === 'ERR_NETWORK') {
        triggerWarning('Verifique su conexión a internet e intente nuevamente')
      }
      console.error(err)
    } finally {
      isLoadingRegister.value = false
    }
  }

  const isActiveUser = () => {
    return Boolean(userAuth.user)
  }

  const isAuthenticated = () => {
    return Boolean(token)
  }

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
    updatedUser
  }
}
