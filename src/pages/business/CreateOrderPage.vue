<script setup>
import { ref, watch, computed } from 'vue';
import { userAuth } from 'src/composables/userAuth';
import { userCart } from 'src/stores/userCart';
import { useToast } from 'src/composables/useToast';
import createTracking from 'src/api/createTracking.js';

const { triggerPositive } = useToast();
const storeClient = userCart();
const { user } = userAuth();
// const { mutate, isLoading: loadingInvoice } = useInvoiceOfferMutation();
const client = computed(() => storeClient.client);
const guardado = ref(false);
const saveVisit = async () => {
  const response = await createTracking(client.value.id, user.value.id);
  if (response) {
    triggerPositive('Visita guardada');
    guardado.value = true;
  }
};
const cancelVisit = () => {
  guardado.value = true;
};
watch(client, (value) => {
  if (value) {
    guardado.value = false;
  }
});
</script>
<template>
  <section class="row q-pa-md" style="width: 100%">
    <section
      class="full-width column items-center absolute-center"
      style="text-align: center"
      v-if="!client"
    >
      <q-img
        style="width: 200px"
        src="~assets/images/scanme.png"
        loading="lazy"
        spinner-color="black"
      />
      <p class="text-h5" style="max-width: 400px">
        Escanea el código QR de tu cliente para comenzar a crear la orden
      </p>
    </section>
    <section
      :class="
        $q.screen.lt.md
          ? 'full-width column items-center'
          : 'full-width column items-center absolute-center'
      "
      style="text-align: center"
      v-if="client"
    >
      <q-card
        style="width: 100%; max-width: 550px; margin: 0 auto"
        class="q-pa-md"
      >
        <q-card-section>
          <q-avatar size="100px">
            <q-img :src="client.img_url" fit="cover" spinner-color="dark" />
          </q-avatar>
        </q-card-section>

        <q-card-section class="q-gutter-y-md">
          <div
            :class="
              $q.screen.lt.md ? 'column items-start' : 'row justify-between'
            "
          >
            <p class="q-ma-none text-grey">Nombre:</p>
            <p class="q-ma-none">{{ client.name }} {{ client.last_name }}</p>
          </div>
          <div
            :class="
              $q.screen.lt.md ? 'column items-start' : 'row justify-between'
            "
          >
            <p class="q-ma-none text-grey">Status de membresia:</p>
            <p class="q-ma-none">
              {{ client.membresia?.status }}
              <q-icon
                v-if="client.membresia?.status === 'vencida'"
                color="red"
                name="close"
                size="18px"
              />
              <q-icon
                v-if="client.membresia?.status === 'activa'"
                color="positive"
                name="done"
                size="18px"
              />
            </p>
          </div>
          <div
            :class="
              $q.screen.lt.md ? 'column items-start' : 'row justify-between'
            "
          >
            <p class="q-ma-none text-grey">Correo:</p>
            <p class="q-ma-none">{{ client.email }}</p>
          </div>
          <div
            :class="
              $q.screen.lt.md ? 'column items-start' : 'row justify-between'
            "
          >
            <p class="q-ma-none text-grey">Teléfono:</p>
            <p class="q-ma-none">{{ client.phone }}</p>
          </div>
          <div
            :class="
              $q.screen.lt.md ? 'column items-start' : 'row justify-between'
            "
          >
            <p class="q-ma-none text-grey">DNI:</p>
            <p class="q-ma-none">{{ client.dni_text }}</p>
          </div>
          <div
            :class="
              $q.screen.lt.md ? 'column items-start' : 'row justify-between'
            "
          >
            <p class="q-ma-none text-grey">Fecha de nacimiento:</p>
            <p class="q-ma-none">{{ client.fecha_nacimiento }}</p>
          </div>
        </q-card-section>

        <div class="q-pa-md q-gutter-md" v-show="guardado == false">
          <q-btn
            label="Guardar visita"
            icon="save"
            color="primary"
            @click="saveVisit()"
          />
          <q-btn
            label="Cancelar"
            icon="cancel"
            color="red"
            @click="cancelVisit()"
          />
        </div>
      </q-card>
    </section>
  </section>
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
