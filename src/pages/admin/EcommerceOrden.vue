<template>
  <q-page>
    <div class="q-pa-md">
      <q-form
        class="full-width row justify-center"
        @submit="refetch"
        style="padding: 1em"
      >
        <q-input
          class="full-width"
          rounded
          dense
          v-model="search"
          style="max-width: 400px"
          outlined
          type="search"
          label="Buscar cliente"
          color="primary"
        >
          <q-btn
            type="submit"
            size="md"
            style="
              right: -12px;
              bottom: 0;
              top: 0;
              border-radius: 0 26px 26px 0;
            "
            color="primary"
            label="Buscar"
            icon="search"
            class="absolute"
          />
        </q-input>
      </q-form>
      <div class="full-width row justify-center flex-separation">
        <q-input
          class="full-width"
          rounded
          dense
          v-model="initDate"
          style="max-width: 400px; padding: 0.2em"
          outlined
          type="date"
          label="Fecha inicial"
          color="primary"
        />
        <q-input
          class="full-width"
          rounded
          dense
          v-model="endDate"
          style="max-width: 400px; padding: 0.2em"
          outlined
          type="date"
          label="Fecha final"
          color="primary"
        />
      </div>
    </div>
    <div class="q-pa-md">
      <q-markup-table>
        <thead>
          <tr>
            <th class="text-left">ID</th>
            <th class="text-left">Capture</th>
            <th class="text-left">Total</th>
            <th class="text-left">Estado</th>
            <th class="text-left">Tipo de pago</th>
            <th class="text-left">Cliente</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in ordenes" :key="index">
            <td class="text-left">
              {{ item.id }}
            </td>
            <td class="text-left">
              <q-img
                :src="item.img"
                @click="openURL(item.img)"
                style="cursor: pointer"
              />
            </td>
            <td class="text-left">
              {{ item.total }}
            </td>
            <td class="text-left">
              <q-toggle
                v-model="item.estado"
                @click="change(item.id, item.estado)"
                :label="item.estado ? 'Entregado' : 'Pendiente'"
                color="primary"
                style="margin: 0"
              />
            </td>
            <td class="text-left">
              {{ item.tipo_pago }}
            </td>
            <td class="text-left">
              {{ item.cliente.name + ' ' + item.cliente.last_name }}
            </td>
          </tr>
        </tbody>
      </q-markup-table>
    </div>
    <article style="margin: 1em">
      <q-pagination
        v-model="page"
        :max="lastPage"
        direction-links
        outline
        color="blue"
        active-design="unelevated"
        active-color="white"
        active-text-color="blue"
        class="flex justify-center"
      />
    </article>
  </q-page>
</template>
<script setup>
import { ref, onMounted } from 'vue';
import { useQuasar } from 'quasar';
import { GetPaginatorOrder, UpdateEcommerceOrder } from 'src/api/productsOrder';

const $q = useQuasar();
const page = ref(1);
const lastPage = ref(1);
const search = ref('');
const ordenes = ref([]);
const initDate = ref('');
const endDate = ref('');
const change = async (id, estado) => {
  estado = estado === true ? 'entregado' : 'pendiente';
  const { data } = await UpdateEcommerceOrder(id, {
    estado,
  });
  if (data) {
    $q.notify({
      color: 'green-4',
      textColor: 'white',
      icon: 'cloud_done',
      message: 'Se ha actualizado el estado de la orden',
    });
  }
};
const refetch = async () => {
  const { data, pagination } = await GetPaginatorOrder(
    page.value,
    search.value,
    initDate.value,
    endDate.value
  );
  ordenes.value = data.map((item) => {
    return {
      id: item.id,
      img: item.img,
      total: item.total,
      estado: item.estado !== 'pendiente',
      tipo_pago: item.tipo_pago,
      cliente: item.cliente,
    };
  });
  lastPage.value = pagination.lastPage;
};
onMounted(async () => {
  await refetch(page.value, search.value);
});
const openURL = (url) => {
  $q.platform.is.mobile
    ? window.open(url, '_blank')
    : window.open(url, '_blank');
};
</script>
