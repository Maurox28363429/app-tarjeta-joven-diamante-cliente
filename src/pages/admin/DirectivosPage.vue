<script setup>
import { ref, computed, watchEffect } from 'vue';
import { useValidateForm } from 'src/composables/useValidateForm.js';
import {
  useGetDirectivo,
  useDeleteDirectivoMutation,
  useCreateDirectivoMutation,
  useUploadDirectivoMutation,
} from 'src/querys/directivoQuery';
import { directivosSchema } from 'src/schemas/directivoSchema';

const page = ref(1);
const lastPage = ref(1);
const itemsPerPage = ref([1]);
const formulario = ref(false);
const edit_id = ref(null);

const search = ref('');

const {
  data: directivo,
  refetch,
  isLoading: isLoadingDirectivos,
} = useGetDirectivo({
  page,
  search,
});

const { mutate: createDirectivo, isLoading: isLoadingCreate } =
  useCreateDirectivoMutation();
const { mutate: deleteDirectivo } = useDeleteDirectivoMutation();
const { mutate: editDirectivo, isLoading: isLoadingEdit } =
  useUploadDirectivoMutation();

const initialValues = () => ({
  nombre: '',
  rol: '',
  telefono: '',
});

const { useForm, validatInput, validateMessage } = useValidateForm({
  initialValue: initialValues(),
  schema: directivosSchema,
});

const currentNews = computed(() => {
  return directivo?.value?.data?.find(({ id }) => {
    return id === edit_id.value;
  });
});

watchEffect(() => {
  if (directivo.value && !isLoadingDirectivos.value) {
    page.value = directivo?.value?.pagination?.currentPage;
    lastPage.value = directivo?.value?.pagination?.lastPage;
    itemsPerPage.value = [directivo?.value?.pagination?.itemsPerPage];
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
    ? editDirectivo({ ...useForm.value, id: edit_id.value })
    : createDirectivo(useForm.value);
};

const deleteNew = (id) => {
  deleteDirectivo(id);
};

const columns = [
  {
    name: 'id',
    required: true,
    label: 'ID',
    align: 'left',
  },
  { name: 'nombre', align: 'center', label: 'NOMBRE', field: 'nombre' },
  {
    name: 'telefono',
    label: 'TELEFONO',
    field: 'telefono',
    sortable: true,
  },
  { name: 'rol', label: 'ROL', field: 'rol' },
  {
    name: 'actions',
    label: 'ACCIONES',
    field: 'actions',
  },
];
</script>
<template>
  <q-page class="flex">
    <section class="row full-width q-px-md" v-if="!isLoadingDirectivos">
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
          :rows="directivo?.data"
          :rows-per-page-options="itemsPerPage"
          :columns="columns"
          row-key="name"
          v-if="!isLoadingDirectivos"
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
              <p class="text-error" v-if="!!validateMessage.errors.nombre">
                {{ validateMessage.errors.nombre }}
              </p>
            </div>
            <div class="col-12">
              <q-input
                outlined
                v-model="useForm.telefono"
                label="Telefono"
                mask="########"
                @blur="validatInput('telefono')"
                @keypress="validatInput('telefono')"
              />
              <p class="text-error" v-if="!!validateMessage.errors.telefono">
                {{ validateMessage.errors.telefono }}
              </p>
            </div>
            <div class="col-12">
              <q-input
                outlined
                v-model="useForm.rol"
                label="Rol"
                @blur="validatInput('rol')"
                @keypress="validatInput('rol')"
              />
              <p class="text-error" v-if="!!validateMessage.errors.rol">
                {{ validateMessage.errors.rol }}
              </p>
            </div>
          </q-card-section>

          <q-card-actions align="right" class="text-primary">
            <q-btn flat label="Cancelar" v-close-popup />
            <q-btn
              :loading="isLoadingCreate || isLoadingEdit"
              type="submit"
              flat
              :disable="!validateMessage.isvalid"
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
