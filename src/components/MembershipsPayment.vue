<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { userAuth } from '../composables/userAuth.js';
import logo from '../assets/icons/acronimo.svg';
import rocketIcon from '../assets/icons/rokectPrimarysvg.svg';
import yappyIcon from './../assets/icons/yappyIcon.svg';
import UploadImg from './UploadImg.vue';
import { copyToClipboard } from 'quasar';
import { useSendPaymentMutation } from 'src/querys/membership';
import { sendPaymentShema } from 'src/schemas/sendPaymentShema';
import { useValidateForm } from 'src/composables/useValidateForm';
import BANK_INFO from 'src/shared/constansts/bankInfo';

const { userData, addMembership, isLoadingMembership } = userAuth();
const { mutate: sendPaymentMutation, isLoading: isLoadingPayment } =
  useSendPaymentMutation();
const payImg = ref(null);

const INITIAL_VALUES = {
  img: null,
  referencia: null,
};

const { useForm, validatInput, validateMessage, validateForm } =
  useValidateForm({ initialValue: INITIAL_VALUES, schema: sendPaymentShema });

// Subscribe to changes in any pasarela_de_pago_tarjeta_joven record

const isAcceptedTerms = ref(false);
const textError = ref(false);
const showPayment = ref(false);

const { go } = useRouter();
var interval='';
const props = defineProps({
  price: {
    type: String,
    required: true,
    default: '0',
  },
  name: {
    type: String,
    required: true,
    default: '',
  },
  planId: {
    type: Number,
    required: true,
    default: 0,
  },
});

const handledFreePayment = () => {
  if (isAcceptedTerms.value) {
    addMembership({ user_id: userData.value?.id });
    textError.value = false;
  } else {
    textError.value = true;
  }
};
const HandlePayment = () => {
  const userId = userData.value?.id || '';
  const url =
    'https://api.tarjetajovendiamante.com/pago/Payment_Controller.php?user_id=' +
    `${userId}`;
  localStorage.removeItem('user');

  // const url = `https://tarjetajovendiamante.com/index.php/checkout/?billing_email=${userData.value?.email}&add-to-cart=871&quantity=1`;

  if (typeof cordova !== 'undefined') {
    const target = '_blank';
    const options = 'location=no,zoom=no,toolbar=no,';

    const inAppBrowser = window.cordova?.InAppBrowser.open(
      url,
      target,
      options
    );
    // Puedes manejar eventos del navegador incorporado, si lo deseas
    inAppBrowser.addEventListener('loadstart', (event) => {
      console.log('InAppBrowser: loadstart', event);
    });

    inAppBrowser.addEventListener('loadstop', (event) => {
      console.log('InAppBrowser: loadstop', event);
    });

    inAppBrowser.addEventListener('loaderror', (event) => {
      console.log('InAppBrowser: loaderror', event);
    });

    inAppBrowser.addEventListener('exit', (event) => {
      console.log('InAppBrowser: exit', event);
    });
  } else {
    console.warn('Cordova no está disponible');
    // var miVentana=window.open(url);
    // Obtener las dimensiones de la pantalla
    const screenWidth = screen.width;
    const screenHeight = screen.height;

    // Calcular la posición de la ventana para centrarla en la pantalla
    const windowWidth = 500;
    const windowHeight = 500;
    const windowLeft = (screenWidth - windowWidth) / 2;
    const windowTop = (screenHeight - windowHeight) / 2;
    // Abrir la ventana emergente centrada en la pantalla
    var ventana = window.open(
      "https://api.tarjetajovendiamante.com/cerrar.php",
      'nombreVentana',
      'width=' + windowWidth + ',height=' + windowHeight + ',left=' + windowLeft + ',top=' + windowTop,
      'toolbar=no,location=no,directories=no,status=no,menubar=no,scrollbars=no,resizable=no',
      'noopener'
      );
     interval = setInterval(function () {
      if (ventana.closed) {
        clearInterval(interval);
      }else{
        console.log('ventana abierta: ');
        const validate = ventana.document.innerHTML;
        if(validate === '<h5>Listo</h5>'){

          ventana.close();
          clearInterval(interval);
        }
      }
    }, 1000);
  }
};
const isFree = Boolean(props.name === 'free') || props.price <= 0;

const uploadFile = (file) => {
  payImg.value = file;
  useForm.value.img = file;
  validatInput('img');
};

const sendPay = () => {
  validateForm();
  sendPaymentMutation({
    ...useForm.value,
    user_id: userData.value?.id,
    payment: props.price,
    membership_id: props.planId,
  });
};

const updateForm = ({ key, value }) => {
  useForm.value[key] = value;
  console.log({ key, value }, 'updateForm');
};
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
            :src="logo"
            alt="logo"
            spinner-color="dark"
            height="40px"
            width="98px"
          />
        </q-toolbar-title>
      </q-toolbar>
    </q-header>
    <q-page-container>
      <div class="payment">
        <div>
          <div class="row items-center q-py-md">
            <q-icon
              @click="go(-1)"
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
                  :disabled="!isAcceptedTerms"
                  @click="HandlePayment"
                  v-if="!isFree"
                  class="row items-center buttonPay"
                >
                  <p class="q-ma-none q-mr-md text-weight-medium">Pagar con</p>
                  <q-img
                    :src="yappyIcon"
                    spinner-color="dark"
                    height="17.92px"
                    width="74.75px"
                    alt="yappy icon"
                  />
                </button>
                <p v-if="!isFree" class="q-ma-none">o Enviar comprobante</p>
                <q-btn
                  v-if="!isFree"
                  @click="showPayment = true"
                  :disabled="!isAcceptedTerms"
                  color="secondary"
                  label="Datos del pago"
                  size="sm"
                  style="max-width: 140px"
                />
                <q-form @submit.prevent="sendPay" v-if="!isFree">
                  <upload-img
                    @update:modelValue="updateForm"
                    @validate="validatInput('img')"
                    @files-dropped="uploadFile"
                    :validatInput="validatInput"
                    :validateMessage="validateMessage"
                  />
                  <div class="q-my-md">
                    <q-input
                      label="Referencia"
                      outlined
                      dense
                      name="referencia"
                      v-model="useForm.referencia"
                      @keypress="validatInput('referencia')"
                      @blur="validatInput('referencia')"
                    />
                    <p
                      class="error"
                      v-if="!!validateMessage.errors?.referencia"
                    >
                      {{ validateMessage.errors?.referencia }}
                    </p>
                  </div>

                  <q-btn
                    v-if="!isFree"
                    type="submit"
                    :disabled="!isAcceptedTerms || !validateMessage.isvalid"
                    :loading="isLoadingPayment"
                    label="Enviar comprobante"
                    color="primary"
                  />
                </q-form>

                <button
                  :disabled="!isAcceptedTerms"
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
                    v-model="isAcceptedTerms"
                    label="Estoy deacuerdo con la informacion de pago suministrada"
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
          <section>
            <div class="detailPayment q-gutter-y-lg">
              <div
                class="row justify-between q-pa-md bg-white rounded-borders text-h6"
              >
                <div class="row items-center">
                  <p class="q-ma-none text-primary q-mr-md" v-if="price > 0">
                    Plan {{ name }}
                  </p>
                  <p class="q-ma-none text-primary q-mr-md" v-if="price == 0">
                    Plan Membresia 3 Días
                  </p>
                  <q-img
                    :src="rocketIcon"
                    spinner-color="dark"
                    width="32px"
                    height="32px"
                    alt="rokect icon"
                  />
                </div>
                <div class="row items-center text-grey-9">
                  <p class="q-ma-none q-mr-md">Total:</p>
                  <p class="q-ma-none">${{ price }}</p>
                </div>
              </div>
              <p class="text-h6" v-if="price > 0">
                ¿Qué estás adquiriendo con el plan {{ name }}?
              </p>
              <p class="text-h6" v-if="price == 0">
                ¿Qué estás adquiriendo con el plan Membresia 3 Día?
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
                  Tienes alguna duda? <br />
                  <span class="text-weight-bold cursor-pointer"
                    >contáctanos: informacion@tarjetajovendiamante.com</span
                  >.
                </p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </q-page-container>
  </q-layout>

  <q-dialog v-model="showPayment">
    <q-card class="full-width" style="max-width: 340px; min-height: 300px">
      <q-card-section>
        <p class="text-h6 text-weight-bold text-capitalize q-ma-none">
          Transferencia
        </p>
      </q-card-section>
      <q-card-section class="column gutter-md">
        <div>
          <p class="text-weight-bold text-grey q-ma-none">Banco:</p>
          <div class="row q-gutter-x-sm">
            <p class="text-weight-medium">{{ BANK_INFO.name }}</p>
            <div>
              <q-tooltip> copiar </q-tooltip>
              <q-icon
                @click="copyToClipboard(BANK_INFO.name)"
                class="cursor-pointer"
                name="content_copy"
                color="primary"
              />
            </div>
          </div>
        </div>
        <div>
          <p class="text-weight-bold text-grey q-ma-none">Numero de cuenta:</p>
          <div class="row q-gutter-x-sm">
            <p class="text-weight-medium">{{ BANK_INFO.account }}</p>
            <div>
              <q-tooltip> copiar </q-tooltip>
              <q-icon
                @click="copyToClipboard(BANK_INFO.account)"
                class="cursor-pointer"
                name="content_copy"
                color="primary"
              />
            </div>
          </div>
        </div>
        <div>
          <p class="text-weight-bold text-grey q-ma-none">Tipo de cuenta:</p>
          <div class="row q-gutter-x-sm">
            <p class="text-weight-medium">{{ BANK_INFO.accountType }}</p>
            <div>
              <q-tooltip> copiar </q-tooltip>
              <q-icon
                @click="copyToClipboard(BANK_INFO.accountType)"
                class="cursor-pointer"
                name="content_copy"
                color="primary"
              />
            </div>
          </div>
        </div>
      </q-card-section>
      <q-card-actions align="center" class="text-primary full-width">
        <q-btn
          color="primary"
          label="Cerrar"
          v-close-popup
          class="full-width"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
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
  min-height: 257px;
  gap: 10px;
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
