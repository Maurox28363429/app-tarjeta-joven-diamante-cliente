<template>
  <q-page class="flex flex-center">
    <q-btn color="primary" @click="startScan">Iniciar escaneo</q-btn>
  </q-page>
</template>

<script>
export default {
  methods: {
    startScan () {
      if (
        typeof window.cordova !== 'undefined' &&
        typeof window.QRScanner !== 'undefined'
      ) {
        window.QRScanner.prepare((err, status) => {
          if (err) {
            console.error(err)
            return
          }

          if (status.authorized) {
            window.QRScanner.show()
            window.QRScanner.scan((err, result) => {
              if (err) {
                console.error(err)
                return
              }

              alert('Contenido del código QR: ' + result)
              window.QRScanner.hide()
            })
          } else if (status.denied) {
            window.QRScanner.openSettings()
          } else {
            console.log('No se pudo obtener el permiso')
          }
        })
      } else {
        console.log('Cordova o QRScanner no están definidos')
      }
    }
  }
}
</script>
