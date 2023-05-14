<template>
  <div v-if="!loading">
    <div
      class="row justify-center items-center"
      style="height: 327px; width: 100%"
    >
      <video
        id="video"
        v-if="staredScan"
        style="width: 100%; height: 327px; object-fit: cover"
        autoplay
      ></video>
      <p v-if="!staredScan">Haz click a scanear</p>
    </div>
    <div class="row justify-center q-gutter-x-md q-mt-md">
      <q-btn
        class="button"
        @click="startDecode"
        label="scanear"
        color="primary"
      />
    </div>
  </div>
  <q-spinner color="white" size="xs" />
  <q-inner-loading
    :showing="loading"
    label-class="text-teal"
    label-style="font-size: 1.1em"
  />
</template>

<script setup>
import { BrowserMultiFormatReader, NotFoundException } from '@zxing/library'
import { ref, onMounted, defineEmits, defineProps } from 'vue'
import { useToast } from 'src/composables/useToast'
import { useRouter } from 'vue-router'
import { userAuth } from 'src/composables/userAuth'
import { userCart } from 'src/stores/userCart'

defineProps({
  closeModal: {
    type: Boolean
  }
})

const emits = defineEmits(['close-modal'])
const router = useRouter()
const { userData } = userAuth()

const client = userCart()
const loading = ref(false)

const { triggerWarning } = useToast()

const selectedDeviceId = ref('')
const codeReader = ref(null)
const videoInputDevices = ref([])
const resultText = ref('')
const permision = ref(false)
const staredScan = ref(false)

onMounted(() => {
  addPermision()
  codeReader.value = new BrowserMultiFormatReader()

  codeReader.value
    .listVideoInputDevices()
    .then((videoInputDevicesSelect) => {
      videoInputDevices.value = videoInputDevicesSelect.map((element) => {
        return { ...element, value: element.deviceId, label: element.label }
      })

      console.log(videoInputDevices.value)

      if (window.cordova) {
        selectedDeviceId.value = videoInputDevices.value[1]
      } else {
        selectedDeviceId.value = videoInputDevices.value[0]
      }
    })
    .catch((err) => {
      console.error(err)
    })
})

async function startDecode () {
  try {
    staredScan.value = true

    codeReader.value.decodeFromVideoDevice(
      selectedDeviceId.value.value,
      'video',
      async (result, err) => {
        if (result) {
          console.log(result)
          resultText.value = result.text
          loading.value = true
          try {
            await client.setClient(result.text)
            router.push('/empresa/create-order')
            emits('close-modal')
            console.log('Cliente asignado correctamente', result.text)
            if (!userData.value.membresia) {
              triggerWarning('Usuario no tiene una membresia activa')
            }
          } catch (error) {
            console.error('Error al asignar el cliente:', error)
          } finally {
            loading.value = false
            reset()
          }
        }
        if (err && !(err instanceof NotFoundException)) {
          console.error(err)
          resultText.value = err
        }
      }
    )

    const video = document.getElementById('video')

    video.addEventListener('touchstart', (e) => {
      e.preventDefault()
      e.stopPropagation()
      alert('touchstart')
    })

    console.log(
      `Started continous decode from camera with id ${selectedDeviceId.value.value}`
    )
  } catch (err) {
    console.error(err)
  }
}

function reset () {
  codeReader.value.reset()
  resultText.value = ''
}

function addPermision () {
  if (
    window?.cordova &&
    window?.cordova.plugins &&
    window?.cordova.plugins.permissions
  ) {
    // Solicitar permiso de cámara
    const permissions = window.cordova.plugins.permissions
    console.log('estoy en cordova', permissions)
    permissions.requestPermission(
      permissions.CAMERA,
      function (status) {
        if (status.hasPermission) {
          // El permiso ha sido concedido
          permision.value = true
          console.log('tiene permiso')
        } else {
          // El permiso ha sido denegado
          triggerWarning(
            'El permiso de la cámara fue denegado. Por favor, permite el acceso desde la configuración del dispositivo.'
          )
          permision.value = false
        }
      },
      function (error) {
        console.log('error', error)
        // Error al solicitar el permiso
        console.error('Error al solicitar el permiso de cámara')
        triggerWarning('Los permisos para la camara estan desactivados')
        permision.value = false
      }
    )
  }
}
</script>
