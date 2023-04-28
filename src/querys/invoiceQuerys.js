import { useMutation, useQueryClient } from '@tanstack/vue-query'
import invoiceOffer from 'src/api/invoiceOffer'
import { useToast } from 'src/composables/useToast'

export const useInvoiceOfferMutation = () => {
  const { triggerPositive, triggerWarning } = useToast()

  const queryClient = useQueryClient()

  const mutation = useMutation(invoiceOffer, {
    onSuccess: () => {
      triggerPositive('Factura de oferta creada con éxito')
      queryClient.invalidateQueries({
        queryKey: ['offers', 'transactionsClient', 'transactionsBusiness']
      })
    },
    onError: (error) => {
      console.error(error, 'error')
      if (error?.code === 'ERR_NETWORK') {
        triggerWarning('Verifique su conexión a internet')
      } else {
        triggerWarning('Ha ocurrido un error al crear la factura de oferta')
      }
    }
  })

  return mutation
}
