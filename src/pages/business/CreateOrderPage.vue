<template>
  <p class="q-ma-md">
    Cliente: {{ client ? client.name : 'cliente no ingresado' }}
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
          label="Please wait..."
          label-class="text-teal"
          label-style="font-size: 1.1em"
        />
        <div class="card" v-for="items in offers" :key="items.id">
          <div>
            <q-img
              :src="items.img_array_url[0]"
              spinner-color="dark"
              style="height: 80px; max-width: 150px"
            />
          </div>
          <div>
            <div class="text-center column">
              <p class="q-ma-none">nombre</p>
              <p class="q-ma-none">{{ items.nombre }}</p>
            </div>
          </div>
          <div>
            <p class="q-ma-none">Precio: ${{ items.price_total }}</p>
            <p class="q-ma-none">Descuento: {{ items.descuento }}%</p>
          </div>
          <div>
            <p class="q-ma-none">Fecha limite:</p>
            <p class="q-ma-none">
              {{ items.fecha_tope_descuento }}
            </p>
          </div>
          <div class="row items-center">
            <q-btn
              color="primary"
              icon="add"
              size="sm"
              round
              @click="addMount(items.id)"
            />
            {{ items.cantidad }}
            <q-btn
              color="primary"
              icon="remove"
              size="sm"
              round
              @click="subtractMount(items.id)"
            />
          </div>
          <div class="buttonAdd">
            <q-btn
              @click="addProduct(items)"
              color="positive"
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
          :selected-rows-label="getSelectedString"
          selection="multiple"
          v-model:selected="selected"
        />
        <div class="buttonActions">
          <q-btn color="positive" label="finalizar compra" @click="invoice" />
          <q-btn color="negative" label="eliminar" @click="deleteProduct" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import getOffersFromStore from 'src/api/getOffersFromStore'
import { userAuth } from 'src/composables/userAuth'
import { userCart } from 'src/stores/userCart'
import invoiceOffer from 'src/api/invoiceOffer'

const { client } = userCart()

const { user } = userAuth()

const search = ref('')
const offers = ref([])
const loading = ref(false)
const pages = ref(1)
const currentPaginate = ref(1)
const selected = ref([])
const rows = ref([])

console.log(selected.value)

async function invoice () {
  const products = rows.value.map((item) => {
    return {
      id: item.id,
      cantidad: item.cantidad
    }
  })
  try {
    await invoiceOffer({
      comercio_id: user.id,
      total_descuento: 10,
      ofertas: products,
      total: 1,
      client_id: client.id
    })
  } catch (err) {
    console.log(err)
  }
}

function deleteProduct () {
  console.log(selected.value)
  console.log('delete')

  // Corrección en la función de filtrado
  const filtro = rows.value.filter(
    (item) =>
      !selected.value.some((selectedItem) => selectedItem.id === item.id)
  )

  console.log(filtro, 'filtro')
  console.log(rows.value, 'rows')

  // Actualizar el valor de rows con el resultado del filtro
  rows.value = filtro
}

function addMount (id) {
  console.log('agregar', id)
  const item = offers.value.find((item) => item.id === id)
  console.log(item, 'item')
  if (item) {
    item.cantidad++
  }
}

function subtractMount (id) {
  console.log('restar', id)
  const item = offers.value.find((item) => {
    console.log(item.id, id)
    return item.id === id
  })
  console.log(item, 'item')
  if (item && item.cantidad > 1) {
    item.cantidad--
  }
}

function addProduct (product) {
  const productExist = rows.value.find((item) => item.id === product.id)
  if (productExist) {
    productExist.cantidad = product.cantidad + productExist.cantidad
  } else {
    rows.value.push({
      id: product.id,
      cantidad: product.cantidad,
      nombre: product.nombre,
      price_total: product.price_total,
      descuento: product.descuento
    })
  }
}

async function fetchOffers () {
  try {
    loading.value = true
    const products = await getOffersFromStore({
      name: search.value,
      page: currentPaginate.value,
      id: user.id
    })

    offers.value = await products.data.map((items) => {
      return { ...items, cantidad: 1 }
    })
  } catch (error) {
    console.error(error)
  } finally {
    loading.value = false
  }
}

watch(search, async (val) => {
  await fetchOffers()
})

watch(currentPaginate, async (val) => {
  await fetchOffers()
})

onMounted(async () => {
  fetchOffers()
})

const columns = [
  {
    name: 'cantidad',
    align: 'center',
    label: 'Cantidad',
    field: 'cantidad',
    sortable: true
  },
  {
    name: 'nombre',
    align: 'center',
    label: 'Producto',
    field: 'nombre',
    sortable: true
  },
  {
    name: 'price_total',
    label: 'Precio',
    field: 'price_total',
    sortable: true,
    format: (val) => `$${val}`
  },
  {
    name: 'descuento',
    label: 'Descuento',
    field: 'descuento',
    sortable: true,
    format: (val) => `${val}%`
  }
]

function getSelectedString () {
  return selected.value.length === 0
    ? ''
    : `${selected.value.length} record${
        selected.value.length > 1 ? 's' : ''
      } selected of ${rows.value.length}`
}
</script>

<style>
.orderContainer {
  display: grid;
  height: 100%;
  width: 100%;
  grid-template-columns: 1fr;
}

.card {
  border-radius: 4px;
  width: 100%;
  min-height: 80px;
  display: grid;
  grid-template-columns: 2fr 2fr 2fr 2fr 2fr 1fr;
  align-items: center;
  padding: 0 16px;
  background: #2222;
}

.containerCard {
  display: flex;
  height: 100%;
  flex-direction: column;
  align-items: center;
  position: relative;
  gap: 10px;
}

.buttonAdd {
  justify-self: flex-end;
}

.buttonActions {
  width: 100%;
  display: flex;
  gap: 16px;
  justify-content: flex-end;
  margin-top: 10px;
}

.my-sticky-virtscroll-table {
  /* height or max-height is important */
  height: 410px;
  scrollbar-width: none;
  overflow: auto;
}

::-webkit-scrollbar {
  display: none;
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

@media (min-width: 1115px) {
  .orderContainer {
    grid-template-columns: 1fr 1fr;
  }
}
</style>
