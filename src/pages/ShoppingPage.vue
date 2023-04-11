<template>
  <div class="q-pa-lg flex flex-center">
    <!--Container-->
    <div class="q-pa-md full-width">
      <q-table
        class="my-sticky-header-table"
        flat
        bordered
        :title="user.role_id === 2 ? 'Mis ventas' : 'Mis compras'"
        :rows="rows"
        :columns="columns"
        hide-bottom
        dense
        :rows-per-page-options="[10, 20, 50]"
        :rows-per-page="15"
        @row-click="onButtonClick"
        row-key="id"
      ></q-table>

      <q-pagination
        style="margin-top: 1em"
        v-model="currentPaginate"
        :max="paginas"
        boundary-numbers
      />
    </div>
  </div>
  <!--end container-->

  <div class="q-pa-md q-gutter-sm">
    <q-dialog
      v-model="dialog"
      persistent
      :maximized="maximizedToggle"
      transition-show="slide-up"
      transition-hide="slide-down"
    >
      <q-card class="bg-white text-black">
        <q-bar>
          <q-space />
          <q-btn
            dense
            flat
            icon="minimize"
            @click="maximizedToggle = false"
            :disable="!maximizedToggle"
          >
            <q-tooltip v-if="maximizedToggle" class="bg-white text-primary"
              >Minimize</q-tooltip
            >
          </q-btn>
          <q-btn
            dense
            flat
            icon="crop_square"
            @click="maximizedToggle = true"
            :disable="maximizedToggle"
          >
            <q-tooltip v-if="!maximizedToggle" class="bg-white text-primary"
              >Maximize</q-tooltip
            >
          </q-btn>
          <q-btn dense flat icon="close" v-close-popup>
            <q-tooltip class="bg-white text-primary">Close</q-tooltip>
          </q-btn>
        </q-bar>

        <q-card-section>
          <div class="text-h6 text-center">Productos asociados</div>
          <hr style="opacity: 0.5" />
          <section>
            <div
              v-for="item in prouctos"
              :key="item.id"
              style="display: inline-flex"
            >
              <q-card class="my-card" flat bordered>
                <img
                  :src="
                    item.img_url ?? 'https://cdn.quasar.dev/img/parallax2.jpg'
                  "
                />
                <q-list>
                  <q-item>
                    <q-section>
                      <h5>{{ item.nombre }}</h5>
                    </q-section>
                  </q-item>
                  <q-item>
                    <q-item-section avatar>
                      <q-icon
                        color="primary"
                        name="production_quantity_limits"
                      />
                    </q-item-section>

                    <q-item-section>
                      <q-item-label>Cantidad</q-item-label>
                      <q-item-label caption>{{ item.cantidad }}</q-item-label>
                    </q-item-section>
                  </q-item>

                  <q-item>
                    <q-item-section avatar>
                      <q-icon color="red" name="paid" />
                    </q-item-section>

                    <q-item-section>
                      <q-item-label>precio por unidad</q-item-label>
                      <q-item-label caption>{{ item.price }}</q-item-label>
                    </q-item-section>
                  </q-item>

                  <q-item>
                    <q-item-section avatar>
                      <q-icon color="amber" name="sell" />
                    </q-item-section>

                    <q-item-section>
                      <q-item-label>Descuento</q-item-label>
                      <q-item-label caption
                        >{{ item.descuento }} %</q-item-label
                      >
                    </q-item-section>
                  </q-item>
                </q-list>
              </q-card>
            </div>
          </section>
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>
</template>
<script setup>
// importaciones
import { ref, onMounted, watch } from 'vue'
import { instance } from 'src/api/index.js'
import { userAuth } from 'src/composables/userAuth'
// user auth
const { user } = userAuth()
console.log(user)
// variables
const currentPaginate = ref(1)
const paginas = ref(0)
const prouctos = ref([])
// dialog
const dialog = ref(false)
const maximizedToggle = ref(true)
// table
const columns = [
  {
    name: 'id',
    label: 'ID',
    field: 'id',
    align: 'left'
  },
  {
    name: 'comercio',
    label: 'Comercio',
    field: (row) => row.comercio.name,
    align: 'left'
  },
  {
    name: 'total',
    label: 'Total',
    field: (row) => row.total,
    align: 'left'
  },
  {
    name: 'total_descuento',
    label: 'Descuento total',
    field: (row) => row.total_descuento,
    align: 'left'
  }
]

if (user.role_id === 2) {
  columns[1] = {
    name: 'client',
    label: 'Cliente',
    field: (row) => row.client.name,
    align: 'left'
  }
}

const rows = ref([])
// los observadores
watch(currentPaginate, async (val) => {
  await cargarDatos(currentPaginate.value)
})
// eventos hooks
onMounted(async () => {
  await cargarDatos()
})
// funciones
const onButtonClick = (evt, row, index) => {
  console.log(row)
  console.log(index)
  console.log(evt)
  dialog.value = true
  prouctos.value = row.ofertas
}
const cargarDatos = async (page = 0) => {
  const queryString =
    user.role_id === 2
      ? `/cliente-comercio-ofertas?with[]=comercio&with[]=client&page=${page}&client_id=${user.id}`
      : `/cliente-comercio-ofertas?with[]=comercio&with[]=client&page=${page}&comercio_id=${user.id}`
  await instance
    .get(queryString)
    .then((res) => {
      rows.value = res.data.data
      paginas.value = res.data.pagination.lastPage
      currentPaginate.value = res.data.pagination.currentPage
    })
    .catch((err) => {
      console.log(err)
    })
}
</script>
<style scoped>
.my-card {
  width: 100%;
  max-width: 300px;
  margin: 1em;
}
</style>
