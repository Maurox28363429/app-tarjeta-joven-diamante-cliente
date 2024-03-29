<script setup>
import { ref, onMounted, watch, computed } from 'vue';
import { userAuth } from 'src/composables/userAuth';
import { userCart } from 'src/stores/userCart';
import { useToast } from 'src/composables/useToast';
import { useGetOffers } from 'src/querys/offersQuerys';
import { useInvoiceOfferMutation } from 'src/querys/invoiceQuerys';
import { ORDER_CREATION_COLUMNS } from 'src/shared/constansts/orderCreationColumns';

const { triggerPositive } = useToast();

const storeClient = userCart();

const { user } = userAuth();

const { mutate, isLoading: loadingInvoice } = useInvoiceOfferMutation();
const client = computed(() => storeClient.client);

const search = ref('');
const pages = ref(1);
const currentPaginate = ref(1);
const selected = ref([]);
const rows = ref([]);

const {
  isLoading: isLoadingOffers,
  data: offersData,
  refetch,
} = useGetOffers({
  name: search.value,
  page: currentPaginate.value,
  id: user.value.id,
});

const userScaneo = computed(() => {
  if (client.value.membresia?.status === 'vencida' || !client.value.membresia) {
    return 'Usuario sin membresía ';
  } else {
    return client.value.name;
  }
});

const getTotal = (property) => {
  return (
    (100 * rows.value.reduce((acc, item) => acc + item[property], 0)) / 100
  );
};

const total = computed(() => Math.round(100 * getTotal('priceTotal')) / 100);

const totalSaving = computed(() => Math.round(100 * getTotal('savings')) / 100);

function invoice() {
  const products = rows.value.map((item) => {
    return {
      id: item.id,
      cantidad: item.cantidad,
    };
  });
  mutate({
    comercio_id: user.value.id,
    total_descuento: totalSaving,
    ofertas: products,
    total,
    client_id: storeClient.client.id,
  });
}

function deleteProduct() {
  rows.value = rows.value.filter(
    (item) =>
      !selected.value.some((selectedItem) => selectedItem.id === item.id)
  );
  if (selected.value.length > 0) {
    triggerPositive('Producto eliminado');
  }
}

function addMount(id) {
  const item = offersData.value.find((item) => item.id === id);
  if (item) {
    item.cantidad++;
    item.priceTotal = item.priceWidthDiscount * item.cantidad;
  }
}

function subtractMount(id) {
  const item = offersData.value.find((item) => {
    return item.id === id;
  });

  if (item && item.cantidad > 1) {
    item.cantidad--;
    item.priceTotal = item.priceWidthDiscount * item.cantidad;
    item.savings = item.savings * item.cantidad;
  }
}

function addProduct(product) {
  const index = rows.value.findIndex((item) => item.id === product.id);
  if (index !== -1) {
    const productExist = rows.value[index];
    productExist.cantidad += product.cantidad;
    productExist.priceTotal =
      product.priceWidthDiscount * productExist.cantidad;
    productExist.savings = product.savings * productExist.cantidad;
  } else {
    product.savings = Math.round(100 * product.savings) / 100;
    rows.value.push({
      ...product,
      priceTotal: product.priceWidthDiscount * product.cantidad,
    });
  }
  triggerPositive('Producto agregado');
}

watch(search, () => {
  refetch();
});

watch(currentPaginate, () => {
  refetch();
});

onMounted(async () => {
  refetch();
});
</script>

<template>
  <p class="q-ma-md body-large">
    Cliente: {{ client ? userScaneo : 'cliente no ingresado' }}
  </p>
  <p class="q-ma-md body-small" style="color: #363636">
    {{ !client ? 'Por favor ingrese el cliente a través del QR' : '' }}
  </p>
  <div class="orderContainer">
    <div class="full-height q-mx-md">
      <div class="full-width q-mb-lg row justify-center q-mt-lg">
        <q-input
          v-model="search"
          outlined
          type="search"
          label="Buscar ofertas"
          color="primary"
          class="full-width"
        >
          <template v-slot:append>
            <q-icon name="search" v-model="search" />
          </template>
        </q-input>
      </div>
      <div class="containerCard">
        <q-inner-loading
          :showing="isLoadingOffers"
          label="Por favor espera..."
          label-class="text-teal"
          label-style="font-size: 1.1em"
        />
        <div class="card" v-for="items in offersData" :key="items.id">
          <div class="">
            <q-img
              class="rounded-borders"
              :src="items.img_array_url[0]"
              spinner-color="dark"
              style="height: 80px; max-width: 150px"
            />
          </div>
          <div>
            <div class="text-center column">
              <p class="q-ma-none text-weight-medium">{{ items.nombre }}</p>
              <p class="q-ma-none text-weight-medium">
                ${{ items.price_total }}
              </p>
            </div>
          </div>
          <div>
            <p class="q-ma-none">Inventario: {{ items.stock }}</p>
            <p class="q-ma-none text-weight-medium">
              Precio ${{ items.price_total }}
            </p>
            <p class="q-ma-none">Desct: {{ items.descuento }}%</p>
            <p class="q-ma-none" style="display: none">F/l:</p>
            <p class="q-ma-none" style="display: none">
              {{ items.fecha_tope_descuento }}
            </p>
          </div>
          <div class="row items-center">
            <q-btn
              color="primary"
              icon="add"
              size="xs"
              round
              :disable="items.stock === 0"
              @click="addMount(items.id)"
            />
            <p class="q-ma-none text-weight-medium" style="padding: 0 7px">
              {{ items.cantidad }}
            </p>
            <q-btn
              color="primary"
              icon="remove"
              size="xs"
              round
              @click="subtractMount(items.id)"
            />
          </div>
          <div class="buttonAdd">
            <q-btn
              @click="addProduct(items)"
              color="positive"
              :disable="items.stock === 0"
              icon="add"
              round
            />
          </div>
        </div>
      </div>
      <div class="q-pa-lg flex flex-center">
        <q-pagination
          v-model="currentPaginate"
          :max="pages"
          direction-links
          outline
          color="blue"
          active-design="unelevated"
          active-color="white"
          active-text-color="blue"
        />
      </div>
    </div>
    <div class="full-width">
      <div class="q-pa-md">
        <p class="q-ma-none body-large">Total: ${{ total }}</p>
        <p class="q-ma-none body-large">Ahorro: ${{ totalSaving }}</p>
        <q-table
          class="my-sticky-virtscroll-table"
          flat
          bordered
          virtual-scroll
          :virtual-scroll-sticky-size-start="48"
          title="Carrito"
          :rows="rows"
          :columns="ORDER_CREATION_COLUMNS"
          row-key="id"
          selection="multiple"
          v-model:selected="selected"
        />
        <div class="buttonActions">
          <q-btn
            :loading="loadingInvoice"
            color="positive"
            label="finalizar compra"
            @click="invoice"
            :disable="
              !client ||
              (rows.length === 0 && client.membresia?.status === 'vencida') ||
              !client.membresia
            "
          />
          <q-btn color="negative" label="eliminar" @click="deleteProduct" />
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.orderContainer {
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
}

.orderContainer div:nth-child(2) {
  max-width: 100%;
}

.card {
  border-radius: 4px;
  width: 100%;
  min-height: 80px;
  display: grid;
  grid-template-columns: 1fr 2fr 1fr 1fr;
  align-items: center;
  padding: 0 2px 0 0;
  font-size: 12px;
  position: relative;
  background: #ffff;
  border: 1px solid #e0e0e0;
}

.containerCard {
  display: flex;
  min-height: 300px;
  flex-direction: column;
  align-items: center;
  position: relative;
  gap: 24px;
}

.buttonAdd {
  justify-self: flex-end;
  position: absolute;
  bottom: -18px;
}

.buttonActions {
  width: 100%;
  display: flex;
  gap: 16px;
  justify-content: center;
  margin-top: 10px;
  padding-bottom: 66px;
}

.my-sticky-virtscroll-table {
  /* height or max-height is important */
  height: 410px;
  overflow: auto;
}

.q-virtual-scroll::-webkit-scrollbar {
  -webkit-appearance: none;
}

.q-virtual-scroll::-webkit-scrollbar:vertical {
  width: 10px;
}

.q-virtual-scroll::-webkit-scrollbar-button:increment,
.q-virtual-scroll::-webkit-scrollbar-button {
  display: none;
}

.q-virtual-scroll::-webkit-scrollbar:horizontal {
  height: 10px;
}

.q-virtual-scroll::-webkit-scrollbar-thumb {
  background-color: #797979;
  border-radius: 20px;
  border: 2px solid #f1f2f3;
}

.my-sticky-virtscroll-table::-webkit-scrollbar-track {
  border-radius: 10px;
}

.q-table__top,
.q-table__bottom,
thead tr:first-child th {
  /* bg color is important for th; just specify one */
  background-color: #ffff;
}

thead tr th {
  position: sticky;
  z-index: 1;
}
/* this will be the loading indicator */
thead tr:last-child th {
  /* height of all previous header rows */
  top: 48px;
}
thead tr:first-child th {
  top: 0;
}
/* prevent scrolling behind sticky top row on focus */
tbody {
  /* height of all previous header rows */
  scroll-margin-top: 48px;
  scrollbar-width: none;
}

@media (min-width: 600px) {
  .card {
    padding: 0 16px 0 0;
    font-size: 14px;
  }
}

@media (min-width: 1115px) {
  .orderContainer {
    display: grid;
    grid-template-columns: 1fr 1fr;
  }

  .orderContainer div:nth-child(2) {
    max-width: 600px;
  }
}
</style>
