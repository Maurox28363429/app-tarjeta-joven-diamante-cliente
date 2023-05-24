import getNewsPachama from 'src/api/getNewsPachama'
import { useQuery } from '@tanstack/vue-query'
import { useToast } from 'src/composables/useToast'

export const useGetPachamaNews = ({ search, pages = {} }) => {
  const { triggerWarning } = useToast()

  return useQuery(
    ['pachamaNews', pages],
    () => getNewsPachama({ search: search.value, pages: pages.value }),
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
