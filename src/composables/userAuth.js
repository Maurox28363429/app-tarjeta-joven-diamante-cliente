import { useAuthStore } from 'src/stores/useAuthStore'
import { ref, computed } from 'vue'
import { useToast } from './useToast'
import { useRouter } from 'vue-router'

export const userAuth = () => {
  const authStore = useAuthStore()
  const isLoadingLogin = ref(false)
  const isLoadingRegister = ref(false)
  const isLoadingMembership = ref(false)
  const { token } = authStore
  const user = computed(() => authStore?.user)
  const { triggerPositive, triggerWarning } = useToast()

  const router = useRouter()

  const membershipsIsActive = () =>
    userAuth?.user.membresia?.status === 'activa' ||
    userAuth?.user.membresia?.days > 0

  const login = async ({ password, email }) => {
    try {
      isLoadingLogin.value = true
      await authStore.login({ password, email })
      triggerPositive('Usuario iniciado con éxito')
    } catch (err) {
      const errorMessage =
        err.response?.status === 400
          ? 'Usuario no encontrado, por favor verifique sus datos e intente nuevamente'
          : err.code === 'ERR_NETWORK'
            ? 'Verifique su conexión a internet e intente nuevamente'
            : 'Error desconocido'
      triggerWarning(errorMessage)

      console.error(err)
    } finally {
      isLoadingLogin.value = false
    }
  }

  const register = async ({
    name,
    email,
    last_name,
    phone,
    sex,
    password,
    role_id,
    dni,
    beneficiario_poliza_cedula,
    beneficiario_poliza_name,
    fecha_nacimiento
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
        role_id,
        dni,
        beneficiario_poliza_cedula,
        beneficiario_poliza_name,
        fecha_nacimiento
      })
      triggerPositive('Usuario registrado con éxito')
    } catch (err) {
      const errorMessage =
        err.response?.status === 400
          ? 'Ese usuario ya exite, por favor ingrese otro correo o número de teléfono'
          : err.code === 'ERR_NETWORK'
            ? 'Verifique su conexión a internet e intente nuevamente'
            : 'Error desconocido'
      triggerWarning(errorMessage)
      console.error(err)
    } finally {
      isLoadingRegister.value = false
    }
  }

  const addMembership = async ({ user_id }) => {
    try {
      isLoadingMembership.value = true
      await authStore.addMembership({ user_id })
      triggerPositive('Ha obtenido la membresía con éxito')
      router.push('/cliente/products')
    } catch (error) {
      if (error.response.status === 404) {
        triggerWarning(error.response.data.message)
      } else {
        const errorMessage =
          error.code === 'ERR_NETWORK'
            ? 'Verifique su conexión a internet e intente nuevamente'
            : 'Error desconocido'
        triggerWarning(errorMessage)
      }
      console.error(error)
    } finally {
      isLoadingMembership.value = false
    }
  }

  const isActiveUser = () => Boolean(userAuth.user)
  const isAuthenticated = () => Boolean(token)

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
    updatedUser: authStore.updated
  }
}
