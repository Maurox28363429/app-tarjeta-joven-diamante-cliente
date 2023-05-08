import getNewsInformative from 'src/api/getNewsInformative'
import { useQuery } from '@tanstack/vue-query'
import { useToast } from 'src/composables/useToast'

export const useGetNewsInformative = ({ search, pages = {} }) => {
  const { triggerWarning } = useToast()

  return useQuery(
    ['news', pages],
    () => getNewsInformative({ search: search.value, pages: pages.value }),
    {
      onError: (error) => {
        console.error('Error en la consulta:', error)
        if (error?.code === 'ERR_NETWORK') {
          triggerWarning('Verifique su conexión a internet')
        }
      }
    }
  )
}
