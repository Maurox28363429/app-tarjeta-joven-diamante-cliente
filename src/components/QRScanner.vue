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
