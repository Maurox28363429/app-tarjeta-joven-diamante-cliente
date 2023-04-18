<template>
  <div>
    <qrcode-stream
      @decode="onDecode"
      @init="onInit"
      @detect="onDetect"
      @error="onError"
    ></qrcode-stream>
    <q-inner-loading
      :showing="visible || loading"
      label="Por favor espera..."
      label-class="text-teal"
      label-style="font-size: 1.1em"
    />
    <div
      v-if="!permision"
      class="full-width full-height column justify-center items-center"
    >
      <p class="title-medium">Activa los permisos para la camara</p>
      <q-btn
        class="cordova-only"
        color="primary"
        label="Pedir permisos"
        @click="addPermision"
      />
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, defineEmits } from 'vue'
import { useToast } from 'src/composables/useToast'
import { userCart } from 'src/stores/userCart'
import { useRouter } from 'vue-router'

const emits = defineEmits(['close-modal'])

const router = useRouter()

const client = userCart()

const visible = ref(false)
const loading = ref(false)

const permision = ref(true)

defineProps({
  closeModal: {
    type: Object
  }
})

const { triggerWarning } = useToast()

function addPermision () {
  if (
    window.cordova &&
    window.cordova.plugins &&
    window.cordova.plugins.permissions
  ) {
    // Solicitar permiso de cámara

    window.cordova.plugins.permissions.requestPermission(
      window.cordova.plugins.permissions.CAMERA,
      function (status) {
        if (status.hasPermission) {
          // El permiso ha sido concedido
          permision.value = true
        } else {
          // El permiso ha sido denegado
          triggerWarning('Los permisos para la camara estan desactivados')
          permision.value = false
        }
      },
      function () {
        // Error al solicitar el permiso
        console.error('Error al solicitar el permiso de cámara')
        triggerWarning('Los permisos para la camara estan desactivados')
        permision.value = false
      }
    )
  }
}

onMounted(() => {
  addPermision()
})

const onDecode = async (decodedString) => {
  loading.value = true
  try {
    await client.setClient(decodedString)
    router.push('/empresa/create-order')
    emits('close-modal')
  } catch (error) {
    console.error('Error al asignar el cliente:', error)
  } finally {
    loading.value = false
  }
}

const onInit = (promise) => {
  visible.value = true
  promise
    .then(() => {
      permision.value = true
    })
    .catch((error) => {
      console.error('Error al inicializar el lector de QR:', error)
      triggerWarning('Los permisos para la camara estan desactivados')
      permision.value = false
    })
    .finally(() => {
      visible.value = false
    })
}

const onDetect = () => {
  console.log('Código QR detectado.')
}

const onError = (error) => {
  console.error('Error al escanear el código QR:', error)
}
</script>
