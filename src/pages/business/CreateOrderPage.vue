<script setup>
import { ref, onMounted, watch, computed } from 'vue';
import { userAuth } from 'src/composables/userAuth';
import { userCart } from 'src/stores/userCart';
import { useToast } from 'src/composables/useToast';
import { useGetOffers } from 'src/querys/offersQuerys';
// import { useInvoiceOfferMutation } from 'src/querys/invoiceQuerys';
// import { ORDER_CREATION_COLUMNS } from 'src/shared/constansts/orderCreationColumns';

const { triggerPositive } = useToast();

const storeClient = userCart();

const { user } = userAuth();

// const { mutate, isLoading: loadingInvoice } = useInvoiceOfferMutation();
const client = computed(() => storeClient.client);

const search = ref('');
const pages = ref(1);
const currentPaginate = ref(1);
// const selected = ref([]);
const rows = ref([]);

const { data: offersData, refetch } = useGetOffers({
  name: search.value,
  page: currentPaginate.value,
  id: user.value.id,
});

// const userScaneo = computed(() => {
//   if (client.value.membresia?.status === 'vencida' || !client.value.membresia) {
//     return 'Usuario sin membresía ';
//   } else {
//     return client.value.name;
//   }
// });

// const getTotal = (property) => {
//   return (
//     (100 * rows.value.reduce((acc, item) => acc + item[property], 0)) / 100
//   );
// };

// const total = computed(() => Math.round(100 * getTotal('priceTotal')) / 100);

// const totalSaving = computed(() => Math.round(100 * getTotal('savings')) / 100);

// function invoice() {
//   const products = rows.value.map((item) => {
//     return {
//       id: item.id,
//       cantidad: item.cantidad,
//     };
//   });
//   mutate({
//     comercio_id: user.value.id,
//     total_descuento: totalSaving,
//     ofertas: products,
//     total,
//     client_id: storeClient.client.id,
//   });
// }

// function deleteProduct() {
//   rows.value = rows.value.filter(
//     (item) =>
//       !selected.value.some((selectedItem) => selectedItem.id === item.id)
//   );
//   if (selected.value.length > 0) {
//     triggerPositive('Producto eliminado');
//   }
// }

// function addMount(id) {
//   const item = offersData.value.find((item) => item.id === id);
//   if (item) {
//     item.cantidad++;
//     item.priceTotal = item.priceWidthDiscount * item.cantidad;
//   }
// }

// function subtractMount(id) {
//   const item = offersData.value.find((item) => {
//     return item.id === id;
//   });

//   if (item && item.cantidad > 1) {
//     item.cantidad--;
//     item.priceTotal = item.priceWidthDiscount * item.cantidad;
//     item.savings = item.savings * item.cantidad;
//   }
// }

/* function addProduct(product) {
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
} */

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
  <q-page class="flex flex-center">
    <section class="row" style="width: 100%">
      <section class="col-12" style="text-align: center" v-if="!client">
        <q-img
          style="width: 200px"
          src="~assets/images/scanme.png"
          loading="lazy"
          spinner-color="black"
        />
        <h5>
          Escanea el código QR de tu cliente para comenzar a crear la orden
        </h5>
      </section>
      <section class="col-12" style="text-align: center" v-if="client">
        <q-card
          style="width: 100%; max-width: 600px; margin: 0 auto"
          class="q-pa-md"
        >
        <q-avatar size="80px" class="q-mr-md">
            <q-img :src="client.img_url" spinner-color="dark" />
        </q-avatar>
         <q-list bordered separator>
            <q-item clickable v-ripple>
              <q-item-section>
                Nombre: {{ client.name }} {{ client.last_name }}
              </q-item-section>
            </q-item>
            <q-item clickable v-ripple>
              <q-item-section>
                Membresia: {{ client.membresia?.status }}
                <q-chip
                  v-if="client.membresia?.status === 'vencida'"
                  color="red"
                  text-color="white"
                  label="Vencida"
                />
                <q-chip
                  v-if="client.membresia?.status === 'activa'"
                  color="primary"
                  text-color="white"
                  label="Activa"
                />
              </q-item-section>
            </q-item>
            <q-item clickable v-ripple>
              <q-item-section>
                Correo: {{ client.email }}
              </q-item-section>
            </q-item>
            <q-item clickable v-ripple>
              <q-item-section>
                Teléfono: {{ client.phone }}
              </q-item-section>
            </q-item>
            <q-item clickable v-ripple>
              <q-item-section>
                Cedula: {{ client.dni_text }}
              </q-item-section>
            </q-item>
            <q-item clickable v-ripple>
              <q-item-section>
                Fecha de nacimiento: {{ client.fecha_nacimiento }}
              </q-item-section>
            </q-item>
         </q-list>
        </q-card>
      </section>
    </section>
  </q-page>
</template>

<style>
table {
  width: 100%;
}
thead th {
  padding: 1em;
}
td,
th {
  text-align: center;
  line-height: 1.5;
}
tr:nth-child(even) {
  background-color: #f2f2f2;
}

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
