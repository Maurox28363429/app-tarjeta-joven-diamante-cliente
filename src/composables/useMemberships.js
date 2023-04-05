import { ref, onMounted } from 'vue'
import getMemberships from 'src/api/getMemberships'

export const useMemberships = () => {
  const loading = ref(false)
  const memberships = ref([])

  const PRO_IMAGE = 'src/assets/rocket.svg'
  const FREE_IMAGE = 'src/assets/plane.svg'

  const benefits = [
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
  ]

  const fetchMemberships = async () => {
    try {
      loading.value = true
      const { data } = await getMemberships()
      memberships.value = data.map((membership) => {
        const FREE = 'Membresia 5 Días'
        const PRO = 'Membresia anual'

        membership.benefits = benefits

        if (membership.name === PRO) {
          membership.image = PRO_IMAGE
        }
        if (membership.name === FREE) {
          membership.image = FREE_IMAGE
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
