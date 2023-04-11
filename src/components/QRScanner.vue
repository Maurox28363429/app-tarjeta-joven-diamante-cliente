<template>
  <div>
    <qrcode-stream
      @decode="onDecode"
      @init="onInit"
      @detect="onDetect"
      @error="onError"
    ></qrcode-stream>
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
import { onMounted, ref } from 'vue'

const permision = ref(true)

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
          console.log('Permiso de cámara concedido')
          permision.value = true
        } else {
          // El permiso ha sido denegado
          console.warn('Permiso de cámara denegado')
          permision.value = false
        }
      },
      function () {
        // Error al solicitar el permiso
        console.error('Error al solicitar el permiso de cámara')
        permision.value = false
      }
    )
  }
}

onMounted(() => {
  addPermision()
})

const onDecode = (decodedString) => {
  console.log('Código QR escaneado:', decodedString)
}

const onInit = (promise) => {
  promise
    .then(() => {
      console.log('¡Listo para escanear!')
      permision.value = true
    })
    .catch((error) => {
      console.error('Error al inicializar el lector de QR:', error)
      permision.value = false
    })
}

const onDetect = () => {
  console.log('Código QR detectado.')
}

const onError = (error) => {
  console.error('Error al escanear el código QR:', error)
}
</script>
