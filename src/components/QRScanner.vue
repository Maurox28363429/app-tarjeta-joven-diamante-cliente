<template>
  <div>
    <qrcode-stream
      @decode="onDecode"
      @init="onInit"
      @detect="onDetect"
      @error="onError"
    ></qrcode-stream>
  </div>
</template>

<script setup>
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
      } else {
        // El permiso ha sido denegado
        console.warn('Permiso de cámara denegado')
      }
    },
    function () {
      // Error al solicitar el permiso
      console.error('Error al solicitar el permiso de cámara')
    }
  )
}

const onDecode = (decodedString) => {
  console.log('Código QR escaneado:', decodedString)
}

const onInit = (promise) => {
  promise
    .then(() => {
      console.log('¡Listo para escanear!')
    })
    .catch((error) => {
      console.error('Error al inicializar el lector de QR:', error)
    })
}

const onDetect = () => {
  console.log('Código QR detectado.')
}

const onError = (error) => {
  console.error('Error al escanear el código QR:', error)
}
</script>
