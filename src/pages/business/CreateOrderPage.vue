<template>
  <p class="q-ma-md body-large">
    Cliente: {{ client ? userScaneo : "cliente no ingresado" }}
  </p>
  <p class="q-ma-md body-small" style="color: #363636">
    {{ !client ? "Por favor ingrese el cliente a través del QR" : "" }}
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
          :showing="loading"
          label="Por favor espera..."
          label-class="text-teal"
          label-style="font-size: 1.1em"
        />
        <div class="card" v-for="items in offers" :key="items.id">
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
        <q-pagination v-model="currentPaginate" :max="pages" />
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
          :columns="columns"
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
              (rows.length === 0 && user.membresia?.status === 'vencida') ||
              !user.membresia
            "
          />
          <q-btn color="negative" label="eliminar" @click="deleteProduct" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch, computed } from "vue";
import getOffersFromStore from "src/api/getOffersFromStore";
import { userAuth } from "src/composables/userAuth";
import { userCart } from "src/stores/userCart";
import invoiceOffer from "src/api/invoiceOffer";
import { useToast } from "src/composables/useToast";

const { triggerPositive, triggerWarning } = useToast();

const storeClient = userCart();

const client = computed(() => storeClient.client);

const { user } = userAuth();

const search = ref("");
const offers = ref([]);
const loading = ref(false);
const loadingInvoice = ref(false);
const pages = ref(1);
const currentPaginate = ref(1);
const selected = ref([]);
const rows = ref([]);

const userScaneo = computed(() => {
  console.log(client.value, "user");
  if (user.value.membresia?.status === "vencida" || !user.value.membresia) {
    return "Usuario sin membresía ";
  } else {
    return user.value.name;
  }
});

console.log(userScaneo.value, "user message");

const getTotal = (property) => {
  return (
    (100 * rows.value.reduce((acc, item) => acc + item[property], 0)) / 100
  );
};

const total = computed(() => Math.round(100 * getTotal("priceTotal")) / 100);

const totalSaving = computed(() => Math.round(100 * getTotal("savings")) / 100);

async function invoice() {
  const products = rows.value.map((item) => {
    return {
      id: item.id,
      cantidad: item.cantidad,
    };
  });

  try {
    loadingInvoice.value = true;
    const { error } = await invoiceOffer({
      comercio_id: user.value.id,
      total_descuento: totalSaving,
      ofertas: products,
      total,
      client_id: storeClient.client.id,
    });

    if (error) {
      triggerWarning(error);
    } else {
      triggerPositive("Factura creada");
    }
  } catch (err) {
    console.error(err);
    triggerWarning("Error al crear la factura");
  } finally {
    loadingInvoice.value = false;
  }
}

function deleteProduct() {
  rows.value = rows.value.filter(
    (item) =>
      !selected.value.some((selectedItem) => selectedItem.id === item.id)
  );
  if (selected.value.length > 0) {
    triggerPositive("Producto eliminado");
  }
}

function addMount(id) {
  const item = offers.value.find((item) => item.id === id);
  if (item) {
    item.cantidad++;
    item.priceTotal = item.priceWidthDiscount * item.cantidad;
  }
}

function subtractMount(id) {
  const item = offers.value.find((item) => {
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
  triggerPositive("Producto agregado");
}

async function fetchOffers() {
  try {
    loading.value = true;
    const products = await getOffersFromStore({
      name: search.value,
      page: currentPaginate.value,
      id: user.value.id,
    });

    offers.value = await products.data.map((items) => {
      return {
        ...items,
        cantidad: 1,
        priceWidthDiscount:
          items.price_total - (items.descuento / 100) * items.price_total,
        savings:
          items.price_total -
          (items.price_total - (items.descuento / 100) * items.price_total),
        priceTotal:
          items.price_total - (items.descuento / 100) * items.price_total * 1,
      };
    });
  } catch (error) {
    console.error(error);
  } finally {
    loading.value = false;
  }
}

watch(search, async (val) => {
  await fetchOffers();
});

watch(currentPaginate, async (val) => {
  await fetchOffers();
});

onMounted(async () => {
  fetchOffers();
});

const columns = [
  {
    name: "cantidad",
    align: "center",
    label: "Cantidad",
    field: "cantidad",
    sortable: true,
  },
  {
    name: "nombre",
    align: "center",
    label: "Producto",
    field: "nombre",
    sortable: true,
  },
  {
    name: "priceWidthDiscount",
    align: "center",
    label: "precio con descuento",
    field: "priceWidthDiscount",
    sortable: true,
  },
  {
    name: "savings",
    align: "center",
    label: "Ahorrado",
    field: "savings",
    sortable: true,
  },
  {
    name: "price_total",
    label: "Precio",
    field: "price_total",
    sortable: true,
    format: (val) => `$${val}`,
  },
  {
    name: "descuento",
    label: "Descuento",
    field: "descuento",
    sortable: true,
    format: (val) => `${val}%`,
  },
  {
    name: "priceTotal",
    label: "Precio total",
    field: "priceTotal",
    sortable: true,
    format: (val) => `$${val}`,
  },
];
</script>

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
