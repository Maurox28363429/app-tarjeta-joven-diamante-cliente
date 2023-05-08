<template>
  <div class="q-pa-md flex flex-center">
    <!--Container-->
    <div class="full-width" style="position: relative; min-height: 400px">
      <q-inner-loading
        :showing="isLoading"
        label="Por favor espera..."
        label-class="text-teal"
        label-style="font-size: 1.1em"
      />
      <q-table
        class="my-sticky-header-table"
        flat
        bordered
        :title="userData?.role_id === 2 ? 'Mis ventas' : 'Mis compras'"
        :rows="transactionsData?.data?.data"
        :columns="TRANSACTION_COLUMNS"
        hide-bottom
        dense
        :rows-per-page-options="[10, 20, 50]"
        :rows-per-page="15"
        @row-click="onButtonClick"
        row-key="id"
      ></q-table>

      <q-pagination
        style="margin-top: 1em"
        v-model="currentPage"
        :max="pages"
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
              v-for="item in products"
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
                    <q-item-section>
                      <h5>{{ item.nombre }}</h5>
                    </q-item-section>
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
import { ref, watchEffect } from "vue";
import { userAuth } from "src/composables/userAuth";
import { TRANSACTION_COLUMNS } from "src/shared/constansts/transanctionColumns";
import {
  useGetTransactionsClient,
  useGetTransactionsBusiness,
} from "src/querys/transactionsQuerys";

const currentPage = ref(1);
const products = ref([]);
const dialog = ref(false);
const maximizedToggle = ref(true);
const { userData } = userAuth();

let transactions;

if (userData?.value?.role_id === 3) {
  transactions = useGetTransactionsClient({
    page: currentPage.value,
    id: userData.value.id,
  });
  TRANSACTION_COLUMNS[1] = {
    name: "client",
    label: "Cliente",
    field: (row) => row.client.name,
    align: "left",
  };
} else {
  transactions = useGetTransactionsBusiness({
    page: currentPage.value,
    id: userData?.value?.id,
  });
}

const { data: transactionsData, isLoading, refetch } = transactions;

const pages = ref(1);

watchEffect(() => {
  currentPage.value && refetch();
});

watchEffect(() => {
  if (transactionsData.value) {
    pages.value = transactionsData.value.data.pagination.lastPage;
  }
});

const onButtonClick = (evt, row, index) => {
  dialog.value = true;
  products.value = row.ofertas;
};
</script>

<style scoped>
.my-card {
  width: 100%;
  max-width: 300px;
  margin: 1em;
}
</style>
