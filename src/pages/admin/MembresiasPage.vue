<template>
  <div class="text-center q-pa-md flex">
    <section style="width: 100%">
      <q-card>
        <table>
          <thead>
            <th>ID</th>
            <th>Nombre completo</th>
            <th>Membresia</th>
            <th>Fecha de compra</th>
            <th>Fecha de expiracion</th>
          </thead>
          <tbody>
            <tr v-for="(d, index) in datos" :key="index">
              <td>{{ d.id }}</td>
              <td>{{ d.name }} {{ d.last_name }}</td>
              <td></td>
            </tr>
          </tbody>
        </table>
      </q-card>
      <div class="flex flex-center">
        <q-pagination
          v-model="current"
          :max="maxpage"
          direction-links
          @input="cargar"
        />
      </div>
    </section>
  </div>
</template>
<style scoped>
table {
  width: 100%;
}
td,
th {
  padding: 1em;
}
</style>
<script setup>
import { ref, onMounted } from 'vue';
import getUserMembresiaComprada from 'src/api/getUserMembresiaComprada.js';
const current = ref(1);
const maxpage = ref(1);
const datos = ref([]);
const cargar = async () => {
  const { data, pagination } = await getUserMembresiaComprada(current.value);
  datos.value = data;
  current.value = pagination.currentPage;
  maxpage.value = pagination.lastPage;
};
onMounted(async () => {
  await cargar();
});
</script>
