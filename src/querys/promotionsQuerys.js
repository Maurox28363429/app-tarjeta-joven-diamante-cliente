import getNews from 'src/api/getNews'
import { useQuery } from '@tanstack/vue-query'
import { useToast } from 'src/composables/useToast'

export const useGetPromotions = ({ search, pages = {} }) => {
  const { triggerWarning } = useToast()

  const data = useQuery(
    ['promotions', pages],
    () => getNews({ search: search.value, pages: pages.value }),
    {
      onError: (error) => {
        console.error('Error en la consulta:', error)
        if (error?.code === 'ERR_NETWORK') {
          triggerWarning('Verifique su conexión a internet')
        }
      }
    }
  )

  return data
}
