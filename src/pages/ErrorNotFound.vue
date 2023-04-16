<template>
  <div
    class="fullscreen bg-blue text-white text-center q-pa-md flex flex-center"
  >
    <div>
      <div style="font-size: 30vh">404</div>

      <div class="text-h2" style="opacity: 0.4">Oops. Nothing here...</div>

      <q-btn
        class="q-mt-xl"
        color="white"
        text-color="blue"
        unelevated
        to="/"
        label="Go Home"
        no-caps
      />
      <!-- Contenedor donde se mostrara el Botón de Pago Yappy -->
    <div id=“Yappy_Checkout_Button”></div>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import * as yappy from 'yappy-js-sdk'

const yappyClient = yappy.createClient(
  '2ef5df3c-496d-48ff-a535-40bba7b1da6b',
  'Qkdfd2ZKSzhVbUIycUQxNE9rTm1pam0ubzlWNVM5UlE5OW1Ib1ljamRCTnBCUlBxY3B2SFFaR3lTS0ZRNFJldg=='
)

onMounted(async () => {
  const payment = {
    total: 20.17,
    subtotal: 20.00,
    shipping: 0.00,
    discount: 0.00,
    taxes: 0.17,
    orderId: '1234',
    successUrl: 'https://www.urlsuccess.com',
    failUrl: 'https://www.urlfail.com',
    tel: '61122345',
    domain: 'https://www.tutienda.com'
  }
  const response = await yappyClient.getPaymentUrl(payment, true, true)
  console.log(response)
})

</script>
