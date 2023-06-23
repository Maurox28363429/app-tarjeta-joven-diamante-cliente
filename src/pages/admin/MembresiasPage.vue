<template>
  <div class="text-center q-pa-md flex">
    <section style="width: 100%">
      <q-card>
        <h5 style="margin-left: 1em; text-align: left; padding: 1em">
          Membresias compradas
          <div style="float: right">
            <q-btn
              style="background: #0c844f; color: white; margin-left: 0.2em"
              round
              icon="file_download"
              @click="excelDonwload()"
            />
            <q-btn
              style="background: #840c0c; color: white; margin-left: 0.2em"
              round
              icon="picture_as_pdf"
              @click="pdfDonwload()"
            />
          </div>
        </h5>
        <hr />
        <table>
          <thead>
            <th>ID</th>
            <th>Nombre completo</th>
            <th>Membresia</th>
            <th>Dias restantes</th>
            <th>Fecha de expiracion</th>
          </thead>
          <tbody>
            <tr v-for="(d, index) in datos" :key="index">
              <td>{{ d.id }}</td>
              <td>{{ d.name }} {{ d.last_name }}</td>
              <td>
                <!-- <q-toggle
                  disabled="true"
                  v-model="d.membresia.status_num"
                  @change="
                    cambiar(
                      d.membresia.id,
                      (d.membresia.status_num = !d.membresia.status_num)
                    )
                  "
                  :true-value="1"
                  :false-value="0"
                /> -->
                <q-icon
                  v-if="d.membresia.status_num == 1"
                  name="check_circle"
                  color="primary"
                  size="2rem"
                />
                <q-icon v-else name="cancel" color="red" size="2rem" />
              </td>
              <td>
                {{ d.membresia.days }}
              </td>
              <td>
                {{ d.membresia.fecha_cobro }}
              </td>
            </tr>
          </tbody>
        </table>
        <div class="flex flex-center" style="padding: 1em">
          <q-pagination v-model="current" :max="maxpage" direction-links />
        </div>
      </q-card>
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
import { ref, onMounted, watch } from 'vue';
import getUserMembresiaComprada from 'src/api/getUserMembresiaComprada.js';
const current = ref(1);
const maxpage = ref(1);
const datos = ref([]);
watch(current, async (val) => {
  await cargar();
});
const cargar = async () => {
  const { data, pagination } = await getUserMembresiaComprada(current.value);
  datos.value = data;
  current.value = pagination.currentPage;
  maxpage.value = pagination.lastPage;
};
/* const cambiar=async(id,status)=>{
  console.log(id,status)
}
 */
onMounted(async () => {
  await cargar();
});

const excelDonwload = async () => {
  window.open(
    process.env.VUE_APP_API_URL + 'export_membresia?membresia=1',
    '_blank'
  );
};
const pdfDonwload = async () => {
  window.open(process.env.VUE_APP_API_URL + 'export_pdf_membresia', '_blank');
};
</script>
