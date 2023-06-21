<script setup>
import { ref, computed, watchEffect, watch } from 'vue';
import { useValidateForm } from 'src/composables/useValidateForm.js';
import { newSchema } from 'src/schemas/newSchema.js';
import { checkFileType } from 'src/utils/checkFileType';
import {
  useGetOffersFromBusiness,
  useDeleteOfferMutation,
  useEditOfferMutation,
  useCreateOfferMutation,
  useGetStates,
} from 'src/querys/offersQuerys';
import { useGetBusiness } from 'src/querys/businessQuerys';

const formulario = ref(false);
const edit_id = ref(null);

const search = ref('');

const pages = ref(1);
const lastPage = ref(1);

const state = ref('todos');
const editorRef = ref(null);

const {
  data: offers,
  refetch,
  isLoading: isLoadingOffers,
  isFetching: isFetchedOffers,
} = useGetOffersFromBusiness({
  page: pages,
  search,
  dir: state,
});

const { mutate: createOffer, isLoading: isLoadingCreate } =
  useCreateOfferMutation();
const { data: states } = useGetStates({ sort_ofertas: '1' });
const { mutate: deleteOffer } = useDeleteOfferMutation();
const { mutate: editOffer, isLoading: isLoadingEdit } = useEditOfferMutation();
const { data: businessData } = useGetBusiness();

const { useForm } = useValidateForm({
  initialValue: {},
  schema: newSchema,
});

const businessId = computed(() => {
  return businessData?.value?.data?.map((element) => {
    return {
      label: element.name,
      value: element.id,
    };
  });
});

const provinceOptions = computed(() =>
  states?.value?.map((element) => {
    return element.name;
  })
);

const currentNews = computed(() => {
  return offers?.value?.data?.find(({ id }) => {
    return id === edit_id.value;
  });
});
watch([offers, isFetchedOffers, currentNews], () => {
  if (offers.value && edit_id.value) {
    useForm.value = { ...currentNews.value };
    useForm.active = false;
  }
});

const ACCEPTED_TYPES_FOR_DNI = ['image/jpeg', 'image/png', 'image/jpg', 'jpg'];

watchEffect(() => {
  pages.value = offers?.value?.pagination?.currentPage;
  lastPage.value = offers?.value?.pagination?.lastPage;
  console.log(editorRef.value);
});

const buscar = () => {
  refetch();
};

const handleModal = (id) => {
  edit_id.value = id;
  formulario.value = true;
};

const createNew = () => {
  edit_id.value = null;
  useForm.value = {};
  formulario.value = true;
};

const handleNews = () => {
  edit_id.value
    ? editOffer({ ...useForm.value, id: edit_id.value })
    : createOffer(useForm.value);
};

const deleteNew = (id) => {
  deleteOffer(id);
};

const options = ref(provinceOptions.value);
const optionsBusiness = ref(businessId.value);

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
      optionsBusiness.value = businessId.value;
    });
    return;
  }

  update(() => {
    const needle = val.toLowerCase();
    optionsBusiness.value = businessId.value.filter(
      (v) => v.toLowerCase().indexOf(needle) > -1
    );
  });
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
  { name: 'comercio', align: 'center', label: 'COMERCIO', field: 'comercio' },
  {
    name: 'img_array_url',
    align: 'center',
    label: 'IMG',
    field: 'img_array_url',
  },
  { name: 'description', label: 'DESCRIPCION', field: 'description' },
  { name: 'descuento', label: 'DESCUENTO', field: 'descuento' },
  { name: 'price_total', label: 'PRECIO TOTAL', field: 'price_total' },
  { name: 'dir', label: 'PROVINCIA', field: 'dir' },
  {
    name: 'fecha_tope_descuento',
    label: 'FECHA TOPE',
    field: 'fecha_tope_descuento',
  },
  { name: 'stock', label: 'STOCK', field: 'stock', sortable: true },
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
    <section
      class="row"
      style="width: 100%; padding: 1em"
      v-if="!isLoadingOffers"
    >
      <div class="col-12">
        <q-form
          class="full-width row justify-center"
          @submit="buscar"
          style="padding: 1em"
        >
          <q-input
            class="full-width"
            rounded
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
          title="Ofertas"
          :rows="offers?.data"
          :columns="columns"
          row-key="name"
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
              <q-td key="comercio" :props="props">
                {{ props.row?.comercio.name }}
              </q-td>
              <q-td key="img_array_url" :props="props">
                <q-img
                  :src="props.row.img_array_url[0]"
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
              <q-td key="descuento" :props="props">
                %{{ props.row?.descuento }}
              </q-td>
              <q-td key="price_total" :props="props">
                ${{ props.row?.price_total }}
              </q-td>
              <q-td key="dir" :props="props">
                {{ props.row?.dir === '' ? 'sin provincia' : props.row?.dir }}
              </q-td>
              <q-td key="fecha_tope_descuento" :props="props">
                {{
                  new Date(props.row?.fecha_tope_descuento).toLocaleDateString()
                }}
              </q-td>
              <q-td key="stock" :props="props">
                {{ props.row?.stock }}
              </q-td>
              <q-td key="prioridad" :props="props">
                {{ props.row?.prioridad }}
              </q-td>
              <q-td key="link_map" :props="props">
                <div>
                  <p v-for="map in props.row?.link_map" :key="map.link">
                    Ubicacion:
                    <a href="{{ map.link }}" target="_blank">
                      {{ map.ubication }}</a
                    >
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
      <q-card style="max-width: 750px" class="full-width">
        <q-form @submit.prevent="handleNews" class="full-width">
          <q-card-section>
            <div class="text-h6">
              {{ edit_id ? 'Editar' : 'Agregar' }} ofertas
            </div>
          </q-card-section>

          <q-card-section class="q-pt-none q-gutter-md">
            <q-toggle v-model="useForm.active" label="Activo" />
            <q-input outlined v-model="useForm.nombre" label="Nombre" />
            <q-input outlined v-model="useForm.stock" label="Stock" />
            <q-input outlined v-model="useForm.descuento" label="Descuento" />
            <q-input
              outlined
              type="number"
              v-model="useForm.price_total"
              label="Precio total"
            />
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
              v-model="useForm.dir"
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
            <q-select
              outlined
              v-model="useForm.role_id"
              use-input
              input-debounce="0"
              label="Comercio"
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

            <q-date v-model="useForm.fecha_tope_descuento" />

            <q-file
              outlined
              :filter="checkFileType(ACCEPTED_TYPES_FOR_DNI)"
              v-model="useForm.img_array_url"
              label="Imagen"
              multiple
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
      <q-btn fab icon="add" color="primary" @click="createNew" />
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
