<template>lector qr</template>

<script setup>
import QRScanner from 'cordova-plugin-qrscanner-11'
import { onMounted } from 'vue'

onMounted(() => {
  QRScanner.prepare(onDone) // show the prompt
})

function onDone (err, status) {
  if (err) {
    // here we can handle errors and clean up any loose ends.
    console.error(err)
  }
  if (status.authorized) {
    // W00t, you have camera access and the scanner is initialized.
    QRScanner.show(function (status) {
      console.log(status)
    })

    // start scanning
    QRScanner.scan(displayContents)
  } else if (status.denied) {
    QRScanner.openSettings()
  } else {
    console.log('no se pudo obtener permiso')
    // we didn't get permission, but we didn't get permanently denied. (On
    // Android, a denial isn't permanent unless the user checks the "Don't
    // ask again" box.) We can ask again at the next relevant opportunity.
  }
}

function displayContents (err, texto) {
  if (err) {
    // se produjo un error o se canceló el escaneo ( código de error `6` )
  } else {
    // El escaneo completado, muestra el contenido del código QR:
    alert(texto)
  }
}

// Haga que la vista web sea transparente para que la vista previa de video sea visible detrás de ella.

// Asegúrese de hacer que cualquier elemento HTML opaco sea transparente aquí para evitar
// cubriendo el video.
</script>
