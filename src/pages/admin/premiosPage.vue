<script setup>
import { ref, onMounted, watch, watchEffect } from 'vue';
import getPremios from 'src/api/getPremios.js';
import getUsersFilters from 'src/api/getUsersFilters.js';
import DeletePremio from 'src/api/DeletePremio.js';
import { useQuasar } from 'quasar';
import createPremio from 'src/api/createPremio.js';
import { useGetUsersQuery } from 'src/querys/userQuerys';
import editarPremio from 'src/api/editarPremio.js';

const { notify } = useQuasar();
const current = ref(1);
const maxpage = ref(1);
const datos = ref([]);
const search = ref('');
const formPremio = ref(false);

const { data: users, isLoading } = useGetUsersQuery();

const user_list = ref([]);
const user_filter = ref('');

const userOptions = ref([]);
const options = ref(userOptions.value[0]);

watchEffect(() => {
  if (users.value?.data && !isLoading.value) {
    userOptions.value = users.value?.data?.map(({ name, id, last_name }) => {
      return {
        label: `${name} ${last_name}`,
        value: id,
      };
    });
  }
});

const filterFn = (val, update) => {
  if (val === '') {
    update(() => {
      options.value = userOptions.value;
    });
    return;
  }

  update(() => {
    const needle = val.toLowerCase();
    options.value = userOptions.value.filter(
      (v) => v.label.toLowerCase().indexOf(needle) > -1
    );
  });
};

const formData = ref({
  id: null,
  ganador_id: userOptions.value[0] ?? null,
  init_date: '',
  end_date: '',
  active: 1,
  titulo: '',
  descripcion: '',
});

const addPremio = () => {
  formData.value = {
    id: null,
    ganador_id: null,
    init_date: '',
    end_date: '',
    active: 1,
    titulo: '',
    descripcion: '',
  };
  formPremio.value = true;
};

onMounted(async () => {
  await cargar();
  await cargar_usuarios();
});
const cargar_usuarios = async () => {
  const { data } = await getUsersFilters(user_filter.value);
  user_list.value = data;
};

const cargar = async () => {
  const { data, pagination } = await getPremios(current.value, search.value);
  datos.value = data;
  maxpage.value = pagination.lastPage;
};

watch(current, async () => {
  await cargar();
});

watch(user_filter, async () => {
  await cargar_usuarios();
});
watch(search, async () => {
  current.value = 1;
  await cargar();
});
const eliminar = async (id) => {
  const data = await DeletePremio(id);
  if (data.id) {
    notify({
      message: 'Premio eliminado',
      color: 'primary',
      icon: 'check',
    });
    await cargar();
  } else {
    notify({
      message: 'Error al eliminar',
      color: 'red',
      icon: 'warning',
    });
  }
};
const editar = (d) => {
  formData.value = d;
  formPremio.value = true;
};
const convertFormdata = (obj) => {
  const formData2 = new FormData();
  for (const key in obj) {
    formData2.append(key, obj[key]);
  }
  return formData2;
};
const crearPremio = async () => {
  const senData = convertFormdata(formData.value);
  let data = null;
  if (formData.value.id != null) {
    data = await editarPremio(formData.value.id, senData);
  } else {
    data = await createPremio(senData);
  }
  if (data.status === 200) {
    notify({
      message: 'Premio creado',
      color: 'blue',
      icon: 'check',
    });
    formPremio.value = false;
    await cargar();
  } else {
    notify({
      message: 'Error al crear',
      color: 'red',
      icon: 'warning',
    });
  }
};
</script>

<template>
  <div class="text-center q-pa-md flex">
    <section style="width: 100%">
      <q-card>
        <h5 style="margin-left: 1em; text-align: left; padding: 1em">
          Premios
        </h5>

        <div class="full-width row justify-center" style="padding: 1em">
          <q-input
            class="full-width"
            rounded
            dense
            v-model="search"
            style="max-width: 400px"
            outlined
            type="search"
            label="Buscar por ganador"
            color="primary"
          >
            <q-btn
              @click="cargar()"
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
        </div>
        <table>
          <thead>
            <th>ID</th>
            <th>Img</th>
            <th>Titulo</th>
            <th>Ganador img</th>
            <th>Ganador Nombre</th>
            <th>Opciones</th>
          </thead>
          <tbody>
            <tr v-for="(d, index) in datos" :key="index">
              <td>{{ d.id }}</td>
              <td>
                <q-img
                  :src="d.img"
                  loading="lazy"
                  spinner-color="white"
                  style="max-width: 150px"
                />
              </td>
              <td>
                {{ d.titulo }}
              </td>
              <td>
                <q-img
                  :src="
                    d.user ? d.user.img_url : 'https://placehold.co/600x400/png'
                  "
                  loading="lazy"
                  spinner-color="white"
                  style="max-width: 150px"
                />
              </td>
              <td>
                {{
                  d.user ? d.user.name + ' ' + d.user.last_name : 'Sin ganador'
                }}
              </td>
              <td>
                <q-btn
                  color="primary"
                  label="Editar"
                  icon="edit"
                  @click="editar(d)"
                  style="margin: 0.1em"
                />
                <q-btn
                  color="red"
                  label="Eliminar"
                  icon="delete"
                  @click="eliminar(d.id)"
                  style="margin: 0.1em"
                />
              </td>
            </tr>
          </tbody>
        </table>
        <div class="flex flex-center" style="padding: 1em">
          <q-pagination
            v-model="current"
            :max="maxpage"
            direction-links
            outline
            color="blue"
            active-design="unelevated"
            active-color="white"
            active-text-color="blue"
          />
        </div>
      </q-card>
    </section>
  </div>
  <!--Sticky button-->
  <q-page-sticky position="bottom-right" style="margin: 1em; bottom: 1em">
    <q-btn fab icon="add" color="primary" @click="addPremio()" />
  </q-page-sticky>
  <!--Add and Edit Premio-->
  <q-dialog v-model="formPremio" persistent>
    <q-card style="min-width: 500px">
      <q-card-section>
        <div class="text-h6">
          {{ formData.id != null ? 'Editar' : 'Agregar' }} Premios
        </div>
      </q-card-section>

      <q-card-section class="q-pt-none">
        <q-input
          name="titulo"
          v-model="formData.titulo"
          label="Titulo"
          outlined
          dense
          color="primary"
          style="margin: 0.4em"
        />
        <q-select
          name="ganador_id"
          v-model="formData.ganador_id"
          :options="options"
          label="Ganador"
          use-input
          input-debounce="0"
          outlined
          dense
          @filter="filterFn"
          color="primary"
          style="margin: 0.4em"
        />
        <q-input
          name="init_date"
          v-model="formData.init_date"
          label="Fecha de inicio"
          outlined
          dense
          color="primary"
          type="date"
          style="margin: 0.4em"
        />
        <q-input
          name="end_date"
          v-model="formData.end_date"
          label="Fecha de finalizacion"
          outlined
          dense
          color="primary"
          type="date"
          style="margin: 0.4em"
        />
        <q-file
          filled
          name="img"
          v-model="formData.img"
          label="Imagen"
          style="margin: 0.4em"
        >
          <template v-slot:prepend>
            <q-icon name="cloud_upload" />
          </template>
        </q-file>
        <q-input
          name="descripcion"
          v-model="formData.descripcion"
          label="Descripcion"
          outlined
          dense
          color="primary"
          type="textarea"
          style="margin: 0.4em"
        />
      </q-card-section>

      <q-card-actions align="right" class="text-primary">
        <q-btn flat label="Cancel" v-close-popup />
        <q-btn flat label="Enviar" @click="crearPremio()" />
      </q-card-actions>
    </q-card>
  </q-dialog>
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
