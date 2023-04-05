import { ref, onMounted } from 'vue'
import getMemberships from 'src/api/getMemberships'

export const useMemberships = () => {
  const loading = ref(false)
  const memberships = ref([])

  const PRO_IMAGE = 'src/assets/rocket.svg'
  const FREE_IMAGE = 'src/assets/plane.svg'

  const benefitsPro = [
    'Obten descuentos en tus compras',
    'Participa en sorteos y obten premios',
    'Tendras acceso a la compra de productos y servicios premium'
  ]

  const benefitsFree = [
    'Obten descuentos en tu periodo de prueba',
    'Tendras acceso a productos y servicios premium'
  ]

  const fetchMemberships = async () => {
    try {
      loading.value = true
      const { data } = await getMemberships()
      memberships.value = data.map((membership) => {
        const FREE = 'Membresia 5 Días'
        const PRO = 'Membresia anual'

        if (membership.name === PRO) {
          membership.image = PRO_IMAGE
          membership.benefits = benefitsPro
        }
        if (membership.name === FREE) {
          membership.image = FREE_IMAGE
          membership.benefits = benefitsFree
        }

        return membership
      })
    } catch (error) {
      console.log(error)
    } finally {
      loading.value = false
    }
  }

  onMounted(() => {
    fetchMemberships()
  })

  return { loading, memberships, fetchMemberships }
}
