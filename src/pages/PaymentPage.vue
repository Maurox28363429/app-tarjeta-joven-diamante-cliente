<script setup>
import { ref } from 'vue'

const val = ref(true)
</script>

<template>
  <div class="payment">
    <div>
      <div class="row items-center q-py-md">
        <q-icon
          name="arrow_back"
          size="xl"
          color="primary"
          class="cursor-pointer"
        />
        <p class="q-ml-md text-weight-medium q-ma-none text-h5 text-primary">
          Regresar
        </p>
      </div>
    </div>
    <div class="full-width paymentGrid">
      <section>
        <div class="Paymentcontent">
          <p class="text-weight-medium text-h5 q-my-lg">Detalles del pago</p>
          <div class="row items-center">
            <q-icon name="gpp_good" size="xl" color="primary" />
            <p class="q-ma-none text-subtitle1 text-weight-bold text-primary">
              Pago 100% seguro
            </p>
          </div>
          <div class="paymentCard">
            <div class="row justify-between q-pa-md totalPrice">
              <p>Total:</p>
              <p>$15</p>
            </div>
            <button class="row items-center buttonPay">
              <p class="q-ma-none q-mr-md">Pagar con</p>
              <q-img
                src="./../assets/yappyIcon.svg"
                spinner-color="white"
                style="width: 74.75px; height: 17.92px"
              />
            </button>
            <div class="">
              <q-checkbox
                right-label
                v-model="val"
                label="Acepto expresamente todos los Términos y condiciones"
              />
            </div>
          </div>
          <p class="full-width">
            Acepto expresamente todos los Términos y Condiciones de Membresías
            Premium y Pay As You Go. Del mismo, modo acepto las Políticas y
            Avisos de Protección y Tratamiento de Datos
          </p>
        </div>
      </section>
      <section>
        <p>f</p>
      </section>
    </div>
  </div>
</template>

<style>
.payment {
  background-color: #e9e9e9;
  width: 100%;
  height: auto;
  padding: 0 20px;
  min-height: 100vh;
}

.paymentCard {
  width: 100%;
  max-width: 410px;
  margin: 20px 0;
  padding: 32px;
  height: 257px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background: white;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 4px;
}

.Paymentcontent {
  max-width: 410px;
}

.totalPrice {
  width: 100%;
  height: 45px;
  border-radius: 4px;
  background: #d9d9d9;
}

.buttonPay {
  height: 43.91px;
  width: 171.39px;
  color: #272e67;
  border-radius: 4px;
  padding: 8px;
  background: #f1f1f1;
  border: none;
  cursor: pointer;
}

.paymentGrid {
  display: flex;
  flex-direction: column;
}

@media (min-width: 768px) {
  .paymentGrid {
    display: grid;
    grid-template-columns: 1fr 1fr;
  }
}
</style>
