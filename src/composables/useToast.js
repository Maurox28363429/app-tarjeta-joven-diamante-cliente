import { useQuasar } from 'quasar'

export const useToast = () => {
  const $q = useQuasar()

  console.log($q, 'quasar')

  const triggerPositive = (message) => {
    $q.notify({
      type: 'positive',
      message
    })
  }

  const triggerWarning = (message) => {
    $q.notify({
      type: 'warning',
      message
    })
  }

  return { triggerPositive, triggerWarning }
}
