<script setup>
import { useRouter } from 'vue-router'
import { ref, onMounted } from 'vue'
import MembershipsPayment from 'src/components/MembershipsPayment.vue'
import getSingleMemberships from 'src/api/getSingleMemberships'
import { useToast } from 'src/composables/useToast'

const router = useRouter()

const { id } = router.currentRoute.value.params
const plan = ref({})
const loading = ref(false)

const { triggerWarning } = useToast()

onMounted(() => {
  const filtrado = async () => {
    try {
      loading.value = true
      const data = await getSingleMemberships(Number(id))
      plan.value = data
    } catch (err) {
      console.error(err)
      const errorMessage =
        err.response?.status === 400
          ? 'Ese usuario ya exite, por favor ingrese otro correo o número de teléfono'
          : err.code === 'ERR_NETWORK'
            ? 'Verifique su conexión a internet e intente nuevamente'
            : 'Error desconocido'
      triggerWarning(errorMessage)
    } finally {
      loading.value = false
    }
  }
  filtrado()
})
</script>

<template>
  <div v-if="!loading">
    <MembershipsPayment :name="plan.name" :price="plan.price" />
  </div>
  <div
    v-if="loading"
    style="height: 100vh"
    class="full-width screen-heigth row justify-center items-center"
  >
    <q-spinner color="primary" size="3em" :thickness="2" />
  </div>
</template>
