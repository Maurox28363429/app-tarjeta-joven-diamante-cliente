<script setup>
import { ref, computed, watchEffect } from 'vue';
import { useValidateForm } from 'src/composables/useValidateForm.js';
import {
  useGetNewsInformative,
  useCreateNewMutation,
  useEditNewMutation,
  useDeleteNewMutation,
} from 'src/querys/newsQuerys';
import { directivosSchema } from 'src/schemas/directivoSchema';

const paginador = ref({
  current: 1,
  lastPage: 1,
  itemsPerPage: 1,
});
const formulario = ref(false);
const edit_id = ref(null);

const search = ref('');
const {
  data: noticias,
  refetch,
  isLoading: isLoadingNews,
} = useGetNewsInformative({
  pages: paginador,
  search,
});

const { mutate: createNewInformative, isLoading: isLoadingCreate } =
  useCreateNewMutation();
const { mutate: deleteNewInformative } = useDeleteNewMutation();
const { mutate: editNewInformative, isLoading: isLoadingEdit } =
  useEditNewMutation();

const initialValues = () => ({
  nombre: '',
  rol: '',
  telefono: '',
});

const { useForm, validatInput } = useValidateForm({
  initialValue: initialValues(),
  schema: directivosSchema,
});

const currentNews = computed(() => {
  return noticias?.value?.data?.data?.find(({ id }) => {
    return id === edit_id.value;
  });
});

watchEffect(() => {
  if (noticias.value && !isLoadingNews.value) {
    paginador.value = {
      current: noticias?.value?.data?.pagination?.currentPage,
      lastPage: noticias?.value?.data?.pagination?.lastPage,
      itemsPerPage: [noticias?.value?.data?.pagination?.itemsPerPage],
    };
  }
});

const handleModal = (id) => {
  edit_id.value = id;
  formulario.value = true;
  useForm.value = { ...currentNews.value };
};

const createNew = () => {
  edit_id.value = null;
  useForm.value = initialValues();
  formulario.value = true;
};

const handleNews = () => {
  edit_id.value
    ? editNewInformative({ ...useForm.value, id: edit_id.value })
    : createNewInformative(useForm.value);
};

const deleteNew = (id) => {
  deleteNewInformative(id);
};

const columns = [
  {
    name: 'id',
    required: true,
    label: 'ID',
    align: 'left',
  },
  { name: 'nombre', align: 'center', label: 'NOMBRE', field: 'nombre' },
  { name: 'rol', label: 'ROL', field: 'rol' },
  {
    name: 'telefono',
    label: 'TELEFONO',
    field: 'telefono',
    sortable: true,
  },
  {
    name: 'actions',
    label: 'ACCIONES',
    field: 'actions',
  },
];
</script>
<template>
  <q-page class="flex">
    <section class="row full-width q-px-md" v-if="!isLoadingNews">
      <div class="col-12">
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
            label="Buscar directivo"
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
        <q-table
          flat
          bordered
          title="Directivos"
          :rows="noticias?.data?.data"
          :rows-per-page-options="paginador.itemsPerPage"
          :columns="columns"
          row-key="name"
          v-if="!isLoadingNews"
        >
          <template v-slot:body="props">
            <q-tr :props="props">
              <q-td key="id" :props="props">
                {{ props.row?.id }}
              </q-td>
              <q-td key="nombre" :props="props">
                {{ props.row?.nombre }}
              </q-td>
              <q-td key="telefono" :props="props">
                {{ props.row?.telefono }}
              </q-td>
              <q-td key="rol" :props="props">
                {{ props.row?.rol }}
              </q-td>
              <q-td key="actions" :props="props">
                <q-btn flat icon="more_vert">
                  <q-menu>
                    <q-list style="min-width: 100px">
                      <q-item clickable v-close-popup>
                        <q-item-section @click="handleModal(props.row?.id)"
                          >Editar</q-item-section
                        >
                      </q-item>
                      <q-item clickable v-close-popup>
                        <q-item-section @click="deleteNew(props.row?.id)"
                          >Eliminar</q-item-section
                        >
                      </q-item>
                    </q-list>
                  </q-menu>
                </q-btn>
              </q-td>
            </q-tr>
          </template>
        </q-table>
        <article style="margin: 1em">
          <q-pagination
            v-model="paginador.current"
            :max="paginador.lastPage"
            direction-links
            outline
            color="blue"
            active-design="unelevated"
            active-color="white"
            active-text-color="blue"
            class="flex justify-center"
          />
        </article>
      </div>
    </section>
    <!--Modal ADD AND EDIT-->
    <q-dialog
      v-model="formulario"
      :maximized="$q.screen.lt.md"
      persistent
      class="full-width"
    >
      <q-card style="max-width: 750px">
        <q-form @submit.prevent="handleNews">
          <q-card-section>
            <div class="text-h6">
              {{ edit_id ? 'Editar' : 'Agregar' }} directivo
            </div>
          </q-card-section>

          <q-card-section class="row full-width" style="gap: 14px">
            <div class="col-12">
              <q-input
                outlined
                v-model="useForm.nombre"
                label="Nombre"
                @blur="validatInput('nombre')"
                @keypress="validatInput('nombre')"
              />
            </div>
            <div class="col-12 col-md-5">
              <q-input
                outlined
                v-model="useForm.telefono"
                label="Telefono"
                @blur="validatInput('telefono')"
                @keypress="validatInput('telefono')"
              />
            </div>
            <div class="col-12 col-md-5">
              <q-input
                outlined
                v-model="useForm.rol"
                label="Rol"
                @blur="validatInput('rol')"
                @keypress="validatInput('rol')"
              />
            </div>
          </q-card-section>

          <q-card-actions align="right" class="text-primary">
            <q-btn flat label="Cancelar" v-close-popup />
            <q-btn
              :loading="isLoadingCreate || isLoadingEdit"
              type="submit"
              flat
              label="Enviar"
              v-close-popup
            />
          </q-card-actions>
        </q-form>
      </q-card>
    </q-dialog>
    <!--Floating button-->
    <q-page-sticky position="bottom-right" style="margin: 12px; bottom: 60px">
      <q-btn fab icon="add" color="primary" @click="createNew" />
    </q-page-sticky>
  </q-page>
</template>
