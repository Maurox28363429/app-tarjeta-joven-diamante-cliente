<script setup>
import { ref, computed, watchEffect } from 'vue';
import { useValidateForm } from 'src/composables/useValidateForm.js';
import {
  useGetNewsInformative,
  useCreateNewMutation,
  useEditNewMutation,
  useDeleteNewMutation,
} from 'src/querys/newsQuerys';
import { newSchema } from 'src/schemas/newSchema.js';
import { checkFileType } from 'src/utils/checkFileType';

const paginador = ref({
  current: 1,
  lastPage: 1,
  itemsPerPage: 1,
});
const formulario = ref(false);
const edit_id = ref(null);
const editorRef = ref(null);

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
  titulo: '',
  descripcion: '',
  img_url: '',
  prioridad: 1,
  link_youtube: '',
  link_facebook: '',
  link_instragram: '',
  link_web: '',
  link_otros: '',
  img: [],
});

const { useForm, validatInput } = useValidateForm({
  initialValue: initialValues(),
  schema: newSchema,
});

const currentNews = computed(() => {
  return noticias?.value?.data?.data?.find(({ id }) => {
    return id === edit_id.value;
  });
});

const ACCEPTED_TYPES_FOR_DNI = ['image/jpeg', 'image/png', 'image/jpg', 'jpg'];

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
  { name: 'img_url', align: 'center', label: 'IMG', field: 'img_url' },
  { name: 'titulo', label: 'TITULO', field: 'titulo' },
  {
    name: 'descripcion',
    label: 'DESCRIPCION',
    field: 'descripcion',
    sortable: true,
  },
  { name: 'prioridad', label: 'PRIORIDAD', field: 'prioridad' },
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
            label="Buscar producto"
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
          title="Productos"
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
              <q-td key="img_url" :props="props">
                <q-img
                  :src="props.row.img_url"
                  alt="img"
                  spinner-color="dark"
                  style="width: 100px; height: 100px"
                />
              </q-td>
              <q-td key="titulo" :props="props">
                {{ props.row?.titulo }}
              </q-td>
              <q-td key="descripcion" :props="props">
                <div class="line-clamp-3" v-html="props.row?.descripcion" />
              </q-td>
              <q-td key="prioridad" :props="props">
                {{ props.row?.prioridad }}
              </q-td>
              <q-td key="created_at" :props="props">
                {{ props.row?.created_at }}
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
              {{ edit_id ? 'Editar' : 'Agregar' }} Producto
            </div>
          </q-card-section>

          <q-card-section class="row full-width" style="gap: 14px">
            <div class="col-12">
              <q-input
                outlined
                v-model="useForm.titulo"
                label="Titulo"
                @blur="validatInput('titulo')"
                @keypress="validatInput('titulo')"
              />
            </div>
            <div class="col-12">
              <q-editor
                ref="editorRef"
                @paste="onPaste"
                v-model="useForm.descripcion"
                @blur="validatInput('descripcion')"
                @keypress="validatInput('descripcion')"
              />
            </div>
            <div class="col-12 col-md-5">
              <q-input
                outlined
                v-model="useForm.prioridad"
                label="Prioridad"
                @blur="validatInput('prioridad')"
                @keypress="validatInput('prioridad')"
              />
            </div>
            <div class="col-12 col-md-5">
              <q-input
                outlined
                v-model="useForm.link_youtube"
                label="Link youtube"
                @blur="validatInput('link_youtube')"
                @keypress="validatInput('link_youtube')"
              >
                <template v-slot:prepend>
                  <q-icon name="la la-youtube" />
                </template>
              </q-input>
            </div>
            <div class="col-12 col-md-5">
              <q-input
                outlined
                v-model="useForm.link_facebook"
                label="Link facebook"
                @blur="validatInput('link_facebook')"
                @keypress="validatInput('link_facebook')"
              >
                <template v-slot:prepend>
                  <q-icon name="facebook" />
                </template>
              </q-input>
            </div>
            <div class="col-12 col-md-5">
              <q-input
                outlined
                v-model="useForm.link_instragram"
                label="Link instragram"
                @blur="validatInput('link_instragram')"
                @keypress="validatInput('link_instragram')"
              >
                <template v-slot:prepend>
                  <q-icon name="la la-instagram" />
                </template>
              </q-input>
            </div>
            <div class="col-12 col-md-5">
              <q-input
                outlined
                v-model="useForm.link_web"
                label="Link webidad"
                @blur="validatInput('link_web')"
                @keypress="validatInput('link_web')"
              >
                <template v-slot:prepend>
                  <q-icon name="public" />
                </template>
              </q-input>
            </div>
            <div class="col-12 col-md-5">
              <q-input
                outlined
                v-model="useForm.link_otros"
                label="Link otrosad"
                @blur="validatInput('link_otros')"
                @keypress="validatInput('link_otros')"
              >
                <template v-slot:prepend>
                  <q-icon name="link" />
                </template>
              </q-input>
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
