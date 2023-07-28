<script setup>
import { useProductCart } from 'src/stores/useProductCart';
import { ref } from 'vue';

import { useCreateOrderMutation } from 'src/querys/orderQuery';
import yappyIcon from './../../assets/icons/yappyIcon.svg';
import BANK_INFO from 'src/shared/constansts/bankInfo';
import { copyToClipboard, openURL } from 'quasar';
import UploadImg from 'src/components/UploadImg.vue';
import localStorageAuth from 'src/utils/localStorageAuth';
import { useToast } from 'src/composables/useToast';

const store = useProductCart();
const showPayment = ref(false);

const TYPE_PAY = ['transferencia', 'yappy'];

const typePay = ref(TYPE_PAY[0]);
const { user } = localStorageAuth.getUser();

const referencia = ref('');
const payImg = ref('');
const { triggerPositive } = useToast();

const { mutate: createOrder, isLoading: isLoadinOrder } =
  useCreateOrderMutation();

const HandlePayment = () => {
  const url =
    'https://api.tarjetajovendiamante.com/pago/Payment_Controller.php?user_id=' +
    `${user.id}`;
  openURL(url);
};

const sendPay = () => {
  const products = store.cart.map((item) => {
    return {
      id: item.id,
      cantidad: item.cantidad,
      precio: item.precio,
    };
  });
  createOrder({
    json_productos: products,
    client_id: user.id,
    total: store.priceTotal,
    estado: 'pendiente',
    tipo_pago: typePay.value,
    img: referencia.value,
  });
};

const updateForm = ({ key, value }) => {
  referencia.value = value;
};

const uploadFile = (file) => {
  payImg.value = file;
  referencia.value = file;
};

const deleteProducts = () => {
  store.clearCart();
  triggerPositive('Productos eliminados');
};

const deleteProductById = (id) => {
  store.removeProduct(id);
  triggerPositive('Producto eliminado');
};

const openWhatsapp = (number) => {
  openURL('https://wa.me/507' + number);
};

const addProduct = (product) => {
  store.setProduct(product);
};

const lessProduct = (product) => {
  store.removeASingleProduct(product);
};
</script>

<template>
  <div class="q-gutter-md column full-width items-center q-pa-md">
    <p class="text-center text-h6 text-medium q-mx-none">Carrito</p>
    <div class="full-width q-gutter-y-md" style="max-width: 400px">
      <q-btn
        color="primary"
        icon="delete"
        label="Eliminar productos"
        @click="deleteProducts"
      />
      <q-card v-for="item in store.cart" :key="item.id" class="full-width row">
        <q-img :src="item?.img" width="100px" />
        <q-card-section style="flex: 1">
          <div class="row justify-between items-center relative-position">
            <div>
              <p class="text-grey">Nombre:</p>
              <p>{{ item?.nombre }}</p>
            </div>
            <div>
              <p class="text-grey">Precio:</p>
              <p>{{ item?.precio }}</p>
            </div>
            <div>
              <p class="text-grey">Cantidad:</p>
              <div class="row items-center justify-center" style="gap: 4px">
                <q-btn
                  icon="remove"
                  color="primary"
                  size="sm"
                  @click="lessProduct(item.id)"
                />
                <p class="q-ma-none text-center">{{ item?.cantidad }}</p>
                <q-btn
                  icon="add"
                  color="primary"
                  size="sm"
                  @click="addProduct(item)"
                />
              </div>
            </div>
            <div class="row full-height" style="align-self: end">
              <q-btn
                icon="la la-whatsapp"
                round
                color="positive"
                size="sm"
                @click="openWhatsapp(item.whatsap)"
              />
            </div>

            <q-icon
              name="delete"
              color="negative"
              class="absolute delete-icon"
              size="sm"
              @click="deleteProductById(item.id)"
            />
          </div>
        </q-card-section>
      </q-card>
      <q-card class="full-width">
        <q-card-section>
          <div class="row justify-between items-center">
            <p class="text-grey q-ma-none">Total:</p>
            <p class="q-ma-none">${{ store.getTotalPrice() }}</p>
          </div>
        </q-card-section>
      </q-card>
      <q-card class="full-width" style="height: auto">
        <q-card-section class="full-width column items-center q-gutter-y-sm">
          <q-btn
            color="primary"
            @click="HandlePayment"
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
          </q-btn>
          <p class="q-ma-none">o transferencia</p>
          <q-btn
            @click="showPayment = true"
            color="secondary"
            label="Datos del pago"
            size="sm"
            style="max-width: 140px"
          />

          <q-select
            class="full-width"
            outlined
            :options="TYPE_PAY"
            v-model="typePay"
          />

          <q-form
            @submit.prevent="sendPay"
            class="full-width q-gutter-sm column justify-center"
          >
            <upload-img
              @update:modelValue="updateForm"
              @files-dropped="uploadFile"
            />
            <q-btn
              type="submit"
              label="Enviar comprobante"
              color="primary"
              :disable="!referencia"
              :loading="isLoadinOrder"
            />
          </q-form>
        </q-card-section>
      </q-card>
    </div>
  </div>

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

<style scoped>
.delete-icon {
  right: 0;
  top: 0;
  cursor: pointer;
}
</style>
