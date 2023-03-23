import { useAuthStore } from 'src/stores/AuthStore'
import { storeToRefs } from 'pinia'

export const userAuth = () => {
  const userStore = useAuthStore()
  const { userAuth } = storeToRefs(userStore)

  const membershipsIsActive = () => {
    if (
      userAuth.user.membresia?.status === 'activa' ||
      userAuth.user.membresia?.days > 0
    ) {
      return true
    }
    return false
  }

  const isActiveUser = () => {
    return Boolean(userAuth.user)
  }

  return {
    isActiveUser,
    membershipsIsActive,
    userStore,
    userAuth
  }
}
