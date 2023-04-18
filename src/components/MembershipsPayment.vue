<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { userAuth } from '../composables/userAuth.js'

const val = ref(false)
const textError = ref(false)
const { user, addMembership, isLoadingMembership } = userAuth()

const props = defineProps({
  price: {
    type: Number,
    required: true,
    default: 0
  },
  name: {
    type: String,
    required: true,
    default: ''
  }
})

const router = useRouter()

const goBack = () => {
  router.go(-1)
}

const handledFreePayment = () => {
  if (val.value) {
    addMembership({ user_id: user?.id })
    textError.value = false
  } else {
    textError.value = true
  }
}
const HandlePayment = () => {
  console.log(router.currentRoute.value.params)
  router.push(
    '/memberships/' + router.currentRoute.value.params.id + '/payment'
  )
}
const isFree = Boolean(props.name === 'free') || props.price === 0
</script>

<template>
  <q-layout
    view="lHh lpr lFf"
    container
    class="full-height"
    style="min-height: 100vh"
  >
    <q-header elevated class="q-py-sm window-width" style="background: #e9e9e9">
      <q-toolbar>
        <q-toolbar-title>
          <q-img
            src="../assets/acronimo.svg"
            spinner-color="white"
            style="height: 40px; max-width: 98px"
          />
        </q-toolbar-title>
      </q-toolbar>
    </q-header>
    <q-page-container>
      <div class="payment">
        <div>
          <div class="row items-center q-py-md">
            <q-icon
              @click="goBack"
              name="arrow_back"
              size="xl"
              color="primary"
              class="cursor-pointer"
            />

            <p
              class="q-ml-md text-weight-medium q-ma-none text-h5 text-primary"
            >
              Regresar
            </p>
          </div>
        </div>
        <div class="full-width justify-center paymentGrid">
          <section>
            <div class="Paymentcontent">
              <p class="text-weight-medium text-h5 q-mb-lg">
                Detalles del pago
              </p>
              <div class="row items-center">
                <q-icon name="gpp_good" size="xl" color="primary" />
                <p
                  class="q-ma-none text-subtitle1 text-weight-bold text-primary"
                >
                  Pago 100% seguro
                </p>
              </div>
              <div class="paymentCard">
                <div
                  class="row justify-between items-center q-px-md totalPrice text-subtitle1 text-weight-medium"
                >
                  <p class="q-ma-none">Total:</p>
                  <p class="q-ma-none">${{ price }}</p>
                </div>

                <button
                  @click="HandlePayment"
                  v-if="!isFree"
                  class="row items-center buttonPay"
                >
                  <p class="q-ma-none q-mr-md text-weight-medium">Pagar con</p>
                  <q-img
                    src="./../assets/yappyIcon.svg"
                    spinner-color="white"
                    style="width: 74.75px; height: 17.92px"
                  />
                </button>
                <button
                  v-if="isFree"
                  @click="handledFreePayment"
                  class="row items-center buttonPay justify-center"
                >
                  <p class="q-ma-none q-mr-md text-weight-medium">
                    Obtener plan
                  </p>
                </button>
                <q-inner-loading :showing="isLoadingMembership">
                  <q-spinner-gears size="50px" color="primary" />
                </q-inner-loading>
                <div>
                  <q-checkbox
                    right-label
                    v-model="val"
                    label="Acepto expresamente todos los Términos y condiciones"
                  />
                  <p class="text-negative" v-if="textError">
                    Debe aceptar los terminos
                  </p>
                </div>
              </div>
              <p class="full-width">
                Acepto expresamente todos los Términos y Condiciones de
                Membresías Premium y Pay As You Go. Del mismo, modo acepto las
                Políticas y Avisos de Protección y Tratamiento de Datos
              </p>
            </div>
          </section>
          <section class="">
            <div class="detailPayment q-gutter-y-lg">
              <div
                class="row justify-between q-pa-md bg-white rounded-borders text-h6"
              >
                <div class="row items-center">
                  <p class="q-ma-none text-primary q-mr-md">Plan {{ name }}</p>
                  <q-img
                    src="../assets/rokectPrimarysvg.svg"
                    spinner-color="white"
                    style="width: 32px; height: 32px"
                  />
                </div>
                <div class="row items-center text-grey-9">
                  <p class="q-ma-none q-mr-md">Total:</p>
                  <p class="q-ma-none">${{ price }}</p>
                </div>
              </div>
              <p class="text-h6">
                ¿Qué estás adquiriendo con el plan {{ name }}?
              </p>
              <ul class="q-gutter-y-md">
                <li class="row items-center">
                  <q-icon
                    name="check_circle"
                    size="md"
                    color="primary"
                    class="col-2 col-xl-1"
                  />
                  <div class="col-10 col-xl-11">
                    <p class="q-ma-none q-ml-xs">
                      Obten descuentos en tus compras
                    </p>
                  </div>
                </li>
                <li class="row items-center">
                  <q-icon
                    name="check_circle"
                    size="md"
                    color="primary"
                    class="col-2 col-xl-1"
                  />
                  <div class="col-10 col-xl-11">
                    <p class="q-ma-none q-ml-xs">
                      Participa en sorteos y obten premios
                    </p>
                  </div>
                </li>
                <li class="row items-center">
                  <q-icon
                    name="check_circle"
                    size="md"
                    color="primary"
                    class="col-2 col-xl-1"
                  />
                  <div class="col-10 col-xl-11">
                    <p class="q-ma-none q-ml-xs">
                      Obten acceso a la compra de productos premium
                    </p>
                  </div>
                </li>
              </ul>
              <div class="row items-center">
                <q-icon name="help" size="md" color="orange-9" />
                <p class="q-ma-none q-ml-xs">
                  Tienes alguna duda?
                  <span class="text-weight-bold cursor-pointer"
                    >contáctanos</span
                  >.
                </p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </q-page-container>
  </q-layout>
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

.detailPayment {
  width: 100%;
  max-width: 390px;
}

.paymentGrid {
  display: flex;
  flex-direction: column;
  gap: 32px 0px;
  padding-bottom: 40px;
}

.paymentGrid section {
  display: flex;
  justify-content: center;
}

@media (min-width: 768px) {
  .paymentGrid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 0 48px;
    padding: 28px 0;
  }

  .payment {
    padding: 20px 50px;
  }
  .paymentGrid section {
    display: block;
    margin: 0;
  }
}
</style>
