<script setup>
import { ref, computed, watchEffect } from 'vue';
import { useValidateForm } from 'src/composables/useValidateForm.js';
import { newSchema } from 'src/schemas/newSchema.js';
import { checkFileType } from 'src/utils/checkFileType';
import {
  useGetUniversities,
  useDeleteUniversityOfferMutation,
  useEditUniversityOfferMutation,
  useCreateUniversityOfferMutation,
  useGetStates,
  useGetUniversitiesRoles,
} from 'src/querys/offersQuerys';

const formulario = ref(false);
const edit_id = ref(null);

const search = ref('');

const pages = ref(1);
const lastPage = ref(1);
const itemsPerPage = ref([]);

const state = ref('todos');
const editorRef = ref(null);

const mapRef = ref([]);

const {
  data: offers,
  refetch,
  isLoading: isLoadingOffers,
} = useGetUniversities({
  page: pages,
  search,
  dir: state,
});

const { mutate: createOffer, isLoading: isLoadingCreate } =
  useCreateUniversityOfferMutation();
const { data: states, isLoading: isLoadingStates } = useGetStates({});
const { mutate: deleteOffer } = useDeleteUniversityOfferMutation();
const { mutate: editOffer, isLoading: isLoadingEdit } =
  useEditUniversityOfferMutation();

const { data: universitiesRoles } = useGetUniversitiesRoles();

const universitiesId = computed(() => {
  return universitiesRoles?.value?.data?.map(({ name, id }) => {
    return {
      label: name,
      value: id,
    };
  });
});

const initialFormValue = ref({});

watchEffect(() => {
  const listOfUniversities = universitiesId.value;
  if (listOfUniversities && universitiesRoles.value) {
    initialFormValue.value = {
      description: '',
      nombre: '',
      active: '1',
      universidad_id: universitiesId.value[0],
      link_map: [],
      prioridad: '1',
    };
  }
});

const { useForm } = useValidateForm({
  initialValue: initialFormValue.value,
  schema: newSchema,
});

const findUniversity = (id) => {
  return universitiesId.value?.find(({ value }) => {
    return value === id;
  });
};

const provinceOptions = ref([]);

watchEffect(() => {
  if (states.value?.data?.length > 2 && states.value?.data) {
    provinceOptions.value = states?.value?.data?.map(({ name }) => {
      return name;
    });
  }
});

const currentNews = ref([]);

watchEffect(() => {
  if (offers.value) {
    currentNews.value = offers?.value?.data?.find(({ id }) => {
      return id === edit_id.value;
    });
  }
});

const ACCEPTED_TYPES_FOR_DNI = ['image/jpeg', 'image/png', 'image/jpg', 'jpg'];

watchEffect(() => {
  if (offers.value) {
    pages.value = offers?.value?.pagination?.currentPage;
    lastPage.value = offers?.value?.pagination?.lastPage;
    itemsPerPage.value = [offers?.value?.pagination?.itemsPerPage];
  }
});

const handleNews = () => {
  useForm.value.universidad_id = useForm.value?.universidad_id?.value;

  edit_id.value
    ? editOffer({
        ...useForm.value,
        id: edit_id.value,
        link_map: mapRef.value,
      })
    : createOffer({ ...useForm.value, link_map: mapRef.value });
};

const deleteNew = (id) => {
  deleteOffer(id);
};

const options = ref(provinceOptions.value);
const optionsBusiness = ref(universitiesId.value);

const filterFn = (val, update) => {
  if (val === '') {
    update(() => {
      options.value = provinceOptions.value;
    });
    return;
  }

  update(() => {
    const needle = val.toLowerCase();
    options.value = provinceOptions.value.filter(
      (v) => v.toLowerCase().indexOf(needle) > -1
    );
  });
};

const filterBusiness = (val, update) => {
  if (val === '') {
    update(() => {
      optionsBusiness.value = universitiesId.value;
    });
    return;
  }

  update(() => {
    const needle = val.toLowerCase();
    optionsBusiness.value = universitiesId.value.filter(
      (v) => v.toLowerCase().indexOf(needle) > -1
    );
  });
};

const newMapLink = computed(() => {
  return (
    useForm.value?.link_map?.map((elements) => {
      return elements;
    }) ?? []
  );
});

watchEffect(() => {
  if (useForm.value && newMapLink.value) {
    mapRef.value = newMapLink.value;
  }
});

const openEditOfferForm = (id) => {
  edit_id.value = id;
  formulario.value = true;
  mapRef.value = newMapLink.value;

  const updatedForm = { ...currentNews.value };
  updatedForm.description = currentNews.value.description ?? '';
  updatedForm.universidad_id = findUniversity(
    Number(currentNews.value.universidad_id)
  );

  useForm.value = updatedForm;
};

const openCreateOfferForm = () => {
  edit_id.value = null;
  useForm.value = initialFormValue.value;
  formulario.value = true;
  mapRef.value = newMapLink.value;
};

const addNewMapLink = () => {
  const lastLink = mapRef.value?.at(-1);
  if (
    lastLink?.map !== '' ||
    lastLink?.ubication !== '' ||
    lastLink === undefined
  ) {
    mapRef.value.push({ ubication: provinceOptions.value[0], link: '' });
  }
};

const deleteMapLink = (index) => {
  mapRef.value.splice(index, 1);
};

const columns = [
  {
    name: 'id',
    required: true,
    label: 'ID',
    align: 'left',
  },
  { name: 'active', align: 'center', label: 'ACTIVO', field: 'active' },
  { name: 'nombre', align: 'center', label: 'NOMBRE', field: 'nombre' },
  {
    name: 'img_array_url',
    align: 'center',
    label: 'IMG',
    field: 'img_array_url',
  },
  { name: 'description', label: 'DESCRIPCION', field: 'description' },
  { name: 'prioridad', label: 'PRIORIDAD', field: 'prioridad' },
  { name: 'link_map', label: 'LINK MAP', field: 'link_map' },
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
            label="Buscar ofertas"
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
          title="Ofertas de universidades"
          :rows="offers?.data"
          :columns="columns"
          :rows-per-page-options="itemsPerPage"
          row-key="id"
          v-if="!isLoadingOffers && !isLoadingStates"
        >
          <template v-slot:body="props">
            <q-tr :props="props">
              <q-td key="id" :props="props">
                {{ props.row?.id }}
              </q-td>
              <q-td key="active" :props="props">
                {{ props.row?.active }}
              </q-td>
              <q-td key="nombre" :props="props">
                {{ props.row?.nombre }}
              </q-td>
              <q-td key="img_array_url" :props="props">
                <q-img
                  :src="
                    props.row?.img_array_url ? props.row?.img_array_url[0] : ''
                  "
                  alt="img"
                  spinner-color="dark"
                  style="width: 100px; height: 100px"
                />
              </q-td>
              <q-td key="description" :props="props">
                <div style="max-width: 100px; text-overflow: ellipsis">
                  <p
                    class="line-clamp-2 q-ma-none"
                    v-html="props.row?.description"
                  />
                </div>
              </q-td>
              <q-td key="prioridad" :props="props">
                {{ props.row?.prioridad }}
              </q-td>
              <q-td key="link_map" :props="props">
                <div>
                  <p
                    class="text-justify"
                    v-for="map in typeof props.row?.link_map === 'string'
                      ? JSON.parse(props.row?.link_map)
                      : props.row?.link_map"
                    :key="map.link"
                  >
                    <q-badge color="blue">
                      <a
                        class="text-white"
                        href="{{ map.link }}"
                        target="_blank"
                      >
                        {{ map.ubication }}</a
                      >
                    </q-badge>
                  </p>
                </div>
              </q-td>
              <q-td key="created_at" :props="props">
                {{ new Date(props.row?.created_at).toLocaleDateString() }}
              </q-td>
              <q-td key="action" :props="props">
                <q-btn flat icon="more_vert">
                  <q-menu>
                    <q-list style="min-width: 100px">
                      <q-item clickable v-close-popup>
                        <q-item-section
                          @click="openEditOfferForm(props.row?.id)"
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
            v-model="pages"
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
      <q-card
        style="max-width: 750px"
        class="full-width"
        v-if="!isLoadingStates && useForm"
      >
        <q-form @submit.prevent="handleNews" class="full-width">
          <q-card-section>
            <div class="text-h6">
              {{ edit_id ? 'Editar' : 'Agregar' }} ofertas
            </div>
          </q-card-section>

          <q-card-section class="q-pt-none q-gutter-md">
            <q-radio v-model="useForm.active" val="1" label="Activo" />
            <q-radio v-model="useForm.active" val="0" label="No activo" />
            <q-input outlined v-model="useForm.nombre" label="Nombre" />

            <q-editor
              ref="editorRef"
              @paste="onPaste"
              v-model="useForm.description"
            />
            <q-input
              outlined
              type="number"
              v-model="useForm.prioridad"
              label="Prioridad"
            />

            <q-select
              outlined
              v-model="useForm.universidad_id"
              use-input
              input-debounce="0"
              label="Universidad"
              :options="optionsBusiness"
              @filter="filterBusiness"
              behavior="menu"
            >
              <template v-slot:no-option>
                <q-item>
                  <q-item-section class="text-grey">
                    No results
                  </q-item-section>
                </q-item>
              </template>
            </q-select>

            <div class="row q-gutter-md q-ml-none">
              <div
                class="row q-gutter-x-md q-ml-none"
                v-for="(map, index) in mapRef"
                :key="index"
              >
                <q-select
                  outlined
                  v-model="map.ubication"
                  use-input
                  input-debounce="0"
                  label="Provincia"
                  :options="options"
                  @filter="filterFn"
                  behavior="menu"
                >
                  <template v-slot:no-option>
                    <q-item>
                      <q-item-section class="text-grey">
                        No results
                      </q-item-section>
                    </q-item>
                  </template>
                </q-select>

                <q-input
                  outlined
                  v-model="map.link"
                  label="Link de ubicación"
                />
                <div style="height: 46px; width: 46px">
                  <q-btn
                    icon="delete"
                    color="red-8"
                    round
                    class="full-width full-height"
                    @click="deleteMapLink(index)"
                  >
                    <q-tooltip>Eliminar ubicación</q-tooltip>
                  </q-btn>
                </div>
              </div>
              <div style="height: 46px; width: 46px">
                <q-btn
                  rounded
                  color="primary"
                  size="md"
                  icon="add"
                  class="full-width full-height"
                  @click="addNewMapLink"
                >
                  <q-tooltip> Agregar nueva ubicacion </q-tooltip>
                </q-btn>
              </div>
            </div>

            <q-file
              outlined
              max-files="2"
              :filter="checkFileType(ACCEPTED_TYPES_FOR_DNI)"
              v-model="useForm.img"
              label="Imagen"
            >
              <template v-slot:prepend>
                <q-icon name="cloud_upload" />
              </template>
            </q-file>
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
      <q-btn fab icon="add" color="primary" @click="openCreateOfferForm" />
    </q-page-sticky>
  </q-page>
</template>

<style>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
