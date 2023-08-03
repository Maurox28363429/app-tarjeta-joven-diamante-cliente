<script setup>
import { ref, computed, watchEffect } from 'vue';
import { useValidateForm } from 'src/composables/useValidateForm.js';
import { createSosSchema } from 'src/schemas/sosSchema';
import { checkFileType } from 'src/utils/checkFileType';
import {
  useGetHelpNumber,
  updateSosMutate,
  createSosMutate,
  deleteSosMutate,
} from 'src/querys/sosQuerys';

const itemsPerPage = ref([]);
const lastPage = ref(1);
const currentPage = ref(1);

const formulario = ref(false);
const edit_id = ref(null);
const editorRef = ref(null);

const search = ref('');

const {
  data: sosData,
  isLoading: sosLoading,
  refetch,
} = useGetHelpNumber({
  page: currentPage,
  search,
});

const { mutate: create, isLoading: isLoadingCreate } = createSosMutate();
const { mutate: deleteSos } = deleteSosMutate();
const { mutate: editSos, isLoading: isLoadingEdit } = updateSosMutate();

const initialValues = () => ({
  name: null,
  descripcion: null,
  img: null,
  phone: null,
});

const { useForm, validatInput, validateMessage, validateForm } =
  useValidateForm({
    initialValue: initialValues(),
    schema: createSosSchema,
  });

const currentSosNumber = computed(() => {
  return sosData?.value?.data?.find(({ id }) => {
    return id === edit_id.value;
  });
});

const ACCEPTED_TYPES_FOR_DNI = ['image/jpeg', 'image/png', 'image/jpg', 'jpg'];

watchEffect(() => {
  if (!sosLoading.value && sosData?.value?.pagination) {
    currentPage.value = sosData?.value?.pagination?.currentPage;
    itemsPerPage.value = [sosData?.value?.pagination?.itemsPerPage];
    lastPage.value = sosData?.value?.pagination?.lastPage;
  }
});

const handleModal = (id) => {
  validateForm();
  edit_id.value = id;
  formulario.value = true;
  useForm.value = { ...currentSosNumber.value };
};

const createSos = () => {
  validateForm();
  edit_id.value = null;
  useForm.value = initialValues();
  formulario.value = true;
};

const handleSos = () => {
  edit_id.value
    ? editSos({ ...useForm.value, id: edit_id.value })
    : create(useForm.value);
};

const deleteSosNumber = (id) => {
  deleteSos(id);
};

const columns = [
  {
    name: 'id',
    required: true,
    label: 'ID',
    align: 'left',
  },
  { name: 'img', align: 'center', label: 'IMG', field: 'img' },
  { name: 'name', label: 'Nombre', field: 'name' },
  { name: 'phone', label: 'Teléfono', field: 'phone' },
  {
    name: 'descripcion',
    label: 'DESCRIPCION',
    field: 'descripcion',
  },
  { name: 'created_at', label: 'FECHA', field: 'created_at' },
  { name: 'action', label: 'ACTION', field: 'action' },
];

const onPaste = (evt) => {
  // Let inputs do their thing, so we don't break pasting of links.
  if (evt.target.nodeName === 'INPUT') return;
  let text, onPasteStripFormattingIEPaste;
  evt.preventDefault();
  evt.stopPropagation();
  if (evt.originalEvent && evt.originalEvent.clipboardData.getData) {
    text = evt.originalEvent.clipboardData.getData('text/plain');
    editorRef.value.runCmd('insertText', text);
  } else if (evt.clipboardData && evt.clipboardData.getData) {
    text = evt.clipboardData.getData('text/plain');
    editorRef.value.runCmd('insertText', text);
  } else if (window.clipboardData && window.clipboardData.getData) {
    if (!onPasteStripFormattingIEPaste) {
      onPasteStripFormattingIEPaste = true;
      editorRef.value.runCmd('ms-pasteTextOnly', text);
    }
    onPasteStripFormattingIEPaste = false;
  }
};
</script>
<template>
  <q-page class="flex">
    <section class="row full-width q-px-md">
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
            label="Buscar sos"
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
          :loading="sosLoading && !itemsPerPage.length > 0"
          flat
          bordered
          title="SOS"
          :rows="sosData?.data"
          :rows-per-page-options="itemsPerPage"
          :columns="columns"
          row-key="id"
        >
          <template v-slot:body="props">
            <q-tr :props="props">
              <q-td key="id" :props="props">
                {{ props.row?.id }}
              </q-td>
              <q-td key="img" :props="props">
                <q-img
                  :src="props.row.img"
                  alt="img"
                  spinner-color="dark"
                  style="width: 100px; height: 100px"
                />
              </q-td>
              <q-td key="name" :props="props">
                {{ props.row?.name }}
              </q-td>
              <q-td key="phone" :props="props">
                {{ props.row?.phone }}
              </q-td>
              <q-td key="descripcion" :props="props">
                {{ props.row?.descripcion }}
              </q-td>
              <q-td key="created_at" :props="props">
                {{ new Date(props.row?.created_at).toLocaleDateString() }}
              </q-td>
              <q-td key="action" :props="props">
                <q-btn flat icon="more_vert">
                  <q-menu>
                    <q-list style="min-width: 100px">
                      <q-item clickable v-close-popup>
                        <q-item-section @click="handleModal(props.row?.id)"
                          >Editar</q-item-section
                        >
                      </q-item>
                      <q-item clickable v-close-popup>
                        <q-item-section @click="deleteSosNumber(props.row?.id)"
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
            v-model="currentPage"
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
        <q-form @submit.prevent="handleSos">
          <q-card-section>
            <div class="text-h6">{{ edit_id ? 'Editar' : 'Agregar' }} SOS</div>
          </q-card-section>

          <q-card-section class="row full-width" style="gap: 14px">
            <div class="col-12">
              <q-input
                outlined
                name="name"
                v-model="useForm.name"
                label="Nombre"
                @keyup="validatInput('name')"
                @blur="validatInput('name')"
                @keypress="validatInput('name')"
              />
              <div>
                <p class="text-error" v-if="!!validateMessage.errors.name">
                  {{ validateMessage.errors.name }}
                </p>
              </div>
            </div>
            <div class="col-12">
              <q-input
                outlined
                type="tel"
                name="phone"
                v-model="useForm.phone"
                label="Teléfono"
                mask="### - ###"
                @blur="validatInput('phone')"
                @keyup="validatInput('phone')"
                @keypress="validatInput('phone')"
              />
              <p class="text-error" v-if="!!validateMessage.errors.phone">
                {{ validateMessage.errors.phone }}
              </p>
            </div>
            <div class="col-12">
              <q-editor
                ref="editorRef"
                @paste="onPaste"
                v-model="useForm.descripcion"
                @keyup="validatInput('descripcion')"
                @blur="validatInput('descripcion')"
                @keypress="validatInput('descripcion')"
              />
              <p class="text-error" v-if="!!validateMessage.errors.descripcion">
                {{ validateMessage.errors.descripcion }}
              </p>
            </div>
            <div class="col-12">
              <q-file
                outlined
                :filter="checkFileType(ACCEPTED_TYPES_FOR_DNI)"
                max-files="1"
                v-model="useForm.img"
                label="Imagen"
              >
                <template v-slot:prepend>
                  <q-icon name="cloud_upload" />
                </template>
              </q-file>
              <p class="text-error" v-if="!!validateMessage.errors.img">
                {{ validateMessage.errors.img }}
              </p>
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
      <q-btn fab icon="add" color="primary" @click="createSos" />
    </q-page-sticky>
  </q-page>
</template>
