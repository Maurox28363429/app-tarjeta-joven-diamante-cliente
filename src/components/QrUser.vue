<script setup>
import { userAuth } from 'src/composables/userAuth'
import QrcodeVue from 'qrcode.vue'
import { ref } from 'vue'

const { user } = userAuth()
const sizeQr = ref(284)
const idUser = user.value.id.toString()
</script>

<template>
  <q-card-section>
    <div class="text-h6">
      <p>Qr de user</p>
    </div>
  </q-card-section>

  <q-card-section class="q-pt-none">
    <qrcode-vue :value="idUser" :size="sizeQr" level="H"></qrcode-vue>
  </q-card-section>
</template>
