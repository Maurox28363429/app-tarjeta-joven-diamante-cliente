<script setup>
import { useQuasar } from 'quasar';
import { ref, computed, watchEffect } from 'vue';
import { useValidateForm } from 'src/composables/useValidateForm.js';
import offersSchema from 'src/schemas/offersSchema';
import {
  useGetOffersFromBusiness,
  useDeleteOfferMutation,
  useEditOfferMutation,
  useCreateOfferMutation,
  useGetStates,
} from 'src/querys/offersQuerys';
import { useGetBusiness } from 'src/querys/businessQuerys';

import { useToast } from 'src/composables/useToast';

import OFFERS_TABLE from 'src/shared/constansts/tables/offersTable';

import TextInput from 'src/forms/TextInput.vue';
import TextareInput from 'src/forms/TextareaInput.vue';
import DateInput from 'src/forms/DateInput.vue';
import FileInput from 'src/forms/FileInput.vue';

const formulario = ref(false);
const edit_id = ref(null);

const $q = useQuasar();

const search = ref('');

const pages = ref(1);

const provinceFilter = ref('todos');

const searchBusiness = ref('');

const { triggerWarning } = useToast();

const {
  data: offers,
  refetch,
  isLoading: isLoadingOffers,
} = useGetOffersFromBusiness({
  page: pages,
  search,
  dir: provinceFilter,
});

const { mutate: createOffer, isLoading: isLoadingCreate } =
  useCreateOfferMutation();
const { data: states, isLoading: isLoadingStates } = useGetStates({});
const { mutate: deleteOffer } = useDeleteOfferMutation();
const { mutate: editOffer, isLoading: isLoadingEdit } = useEditOfferMutation();

const { data: businessData } = useGetBusiness({
  search: searchBusiness,
});

const businessId = computed(() => {
  return businessData?.value?.data?.map((element) => {
    return {
      label: element.name,
      value: element.id,
    };
  });
});

const initialValues = ref({
  price_total: 0.0,
  descuento: 0.0,
  description: '',
  comercio_id: {
    label: '',
    value: '',
  },
  nombre: '',
  fecha_tope_descuento: '',
  active: 1,
  stock: 0,
  link_map: [],
  prioridad: 0,
});

watchEffect(() => {
  const listOfBusiness = businessId.value;
  if (listOfBusiness && businessData?.value?.data) {
    initialValues.value = {
      price_total: 0.0,
      descuento: 0.0,
      description: '',
      comercio_id: businessId.value[0],
      nombre: '',
      fecha_tope_descuento: '',
      active: 1,
      stock: 0,
      link_map: [],
      prioridad: 0,
    };
  }
});

const { useForm, validatInput, validateMessage, validateForm } =
  useValidateForm({
    initialValue: initialValues.value,
    schema: offersSchema,
  });

const findBusiness = (id) => {
  return businessId.value?.find((element) => {
    return element.value === id;
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

const currentNews = computed(() => {
  return offers?.value?.data?.find(({ id }) => {
    return id === edit_id.value;
  });
});

watchEffect(() => {
  pages.value = offers?.value?.pagination?.currentPage;
});

const map = ref([]);

const handleNews = () => {
  validateForm();
  if (validateMessage.value.isvalid) {
    formulario.value = false;
    return edit_id.value
      ? editOffer({
          ...useForm.value,
          id: edit_id.value,
          link_map: map.value,
          comercio_id: useForm.value.comercio_id.value,
        })
      : createOffer({
          ...useForm.value,
          link_map: map.value,
          comercio_id: useForm.value.comercio_id.value,
        });
  }
  triggerWarning('Por favor, rellene los campos correctamente');
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

const newLinkMap = computed(() => {
  return (
    useForm.value?.link_map?.map((elements) => {
      return { ...elements };
    }) ?? []
  );
});

watchEffect(() => {
  if (useForm.value) {
    map.value = newLinkMap.value;
  }
});

const handleModal = (id) => {
  edit_id.value = id;
  map.value = newLinkMap.value;
  formulario.value = true;
  const updatedForm = { ...currentNews.value };
  updatedForm.description = currentNews.value.description ?? '';
  updatedForm.comercio_id = findBusiness(Number(currentNews.value.comercio_id));
  updatedForm.active = Number(currentNews.value.active);

  useForm.value = updatedForm;
};

const createNew = () => {
  edit_id.value = null;
  useForm.value = {
    price_total: 0.0,
    descuento: 0.0,
    description: '',
    comercio_id: businessId.value[0],
    nombre: '',
    fecha_tope_descuento: '',
    active: 1,
    stock: 0,
    link_map: [],
    prioridad: 0,
  };
  map.value = newLinkMap.value;
  formulario.value = true;
};

const addNew = () => {
  const lastLink = map.value?.at(-1);

  if (
    lastLink?.map !== '' ||
    lastLink?.ubication !== '' ||
    lastLink === undefined
  ) {
    map.value.push({ ubication: provinceOptions?.value[0], link: '' });
  }
};

const deleteLink = (index) => {
  map.value.splice(index, 1);
};

const exporExcel = () => {
  window.open(
    `${process.env.VUE_APP_API_URL}comercio-ofertas?excel=1&dir=${provinceFilter.value}`
  );
};

const updateForm = ({ key, value }) => {
  useForm.value[key] = value;
};
</script>

<template>
  <q-page class="flex">
    <section class="row full-width q-px-md">
      <div class="col-12">
        <div class="row full-width justify-center">
          <q-form
            class="full-width row justify-center"
            @submit="refetch"
            style="padding: 1em; max-width: 400px"
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
          <q-select
            outlined
            v-model="provinceFilter"
            use-input
            input-debounce="0"
            label="Provincia"
            :options="options"
            @filter="filterFn"
            behavior="menu"
          >
            <template v-slot:no-option>
              <q-item>
                <q-item-section class="text-grey"> No results </q-item-section>
              </q-item>
            </template>
          </q-select>
        </div>
        <q-table
          flat
          bordered
          title="Ofertas"
          :rows="offers?.data"
          :columns="OFFERS_TABLE"
          v-if="!isLoadingOffers && !isLoadingStates"
          :rows-per-page-options="[offers?.pagination?.itemsPerPage]"
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
                {{ props.row?.comercio?.name }}
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
              <q-td key="descuento" :props="props">
                %{{ props.row?.descuento }}
              </q-td>
              <q-td key="price_total" :props="props">
                ${{ props.row?.price_total }}
              </q-td>
              <q-td key="stock" :props="props">
                {{ props.row?.stock }}
              </q-td>
              <q-td key="prioridad" :props="props">
                {{ props.row?.prioridad }}
              </q-td>
              <q-td key="link_map" :props="props">
                <div>
                  <p
                    class="text-justify text-white"
                    v-for="map in props.row?.link_map"
                    :key="map.link"
                  >
                    <q-badge color="blue">
                      <a class="text-white" :href="map.link" target="_blank">
                        {{ map.ubication }}
                      </a>
                    </q-badge>
                  </p>
                </div>
              </q-td>
              <q-td key="created_at" :props="props">
                {{ new Date(props.row?.created_at).toLocaleDateString() }}
              </q-td>
              <q-td key="fecha_tope_descuento" :props="props">
                {{
                  new Date(props.row?.fecha_tope_descuento).toLocaleDateString()
                }}
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
            v-if="!isLoadingOffers && offers?.pagination"
            v-model="pages"
            :max="offers?.pagination?.lastPage"
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
        v-if="!isLoadingStates"
        style="max-width: 750px"
        class="full-width"
      >
        <q-form @submit.prevent="handleNews" class="full-width">
          <q-card-section>
            <div class="text-h6">
              {{ edit_id ? 'Editar' : 'Agregar' }} ofertas
            </div>
          </q-card-section>

          <q-card-section class="q-pt-none q-gutter-md full-width">
            <q-radio v-model="useForm.active" :val="1" label="Activo" />
            <q-radio v-model="useForm.active" :val="0" label="No activo" />
            <TextInput
              @update:modelValue="updateForm($event)"
              name="nombre"
              :validatInput="validatInput"
              label="Nombre"
              :errorMessage="validateMessage.errors.nombre"
              :initial-value="useForm.nombre"
            />
            <TextInput
              @update:modelValue="updateForm($event)"
              name="stock"
              :validatInput="validatInput"
              label="Stock"
              type="number"
              :errorMessage="validateMessage.errors.stock"
              :initial-value="useForm.stock"
            />
            <TextInput
              @update:modelValue="updateForm($event)"
              name="descuento"
              :validatInput="validatInput"
              label="Descuento"
              type="number"
              :errorMessage="validateMessage.errors.descuento"
              :initial-value="useForm.descuento"
            />
            <TextInput
              @update:modelValue="updateForm($event)"
              name="price_total"
              :validatInput="validatInput"
              label="Precio total"
              type="number"
              :errorMessage="validateMessage.errors.price_total"
              :initial-value="useForm.price_total"
            />
            <TextareInput
              name="description"
              :validatInput="validatInput"
              label="Descripcion"
              @update:modelValue="updateForm($event)"
              :errorMessage="validateMessage.errors.description"
              :initial-value="useForm.description"
            />
            <TextInput
              @update:modelValue="updateForm($event)"
              name="prioridad"
              :validatInput="validatInput"
              label="Prioridad"
              type="number"
              :errorMessage="validateMessage.errors.prioridad"
              :initial-value="useForm.prioridad"
            />
            <div class="q-ml-none">
              <p class="q-ml-md text-body1">Link de ubicaciones</p>
              <div class="row q-gutter-md q-ml-none items-center">
                <div
                  class="row q-gutter-x-md q-ml-none items-center"
                  v-for="(map, index) in map"
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
                      @click="deleteLink(index)"
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
                    @click="addNew"
                  >
                    <q-tooltip> Agregar nueva ubicacion </q-tooltip>
                  </q-btn>
                </div>
              </div>
            </div>
            <q-select
              outlined
              v-model="useForm.comercio_id"
              use-input
              input-debounce="0"
              label="Comercio"
              :options="optionsBusiness"
              @input-value="(value) => (searchBusiness = value)"
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

            <div>
              <p class="text-body1">Fecha tope</p>

              <DateInput
                name="fecha_tope_descuento"
                label="Fecha tope"
                @update:modelValue="updateForm($event)"
                :validateInput="validatInput"
                :errorMessage="validateMessage.errors.fecha_tope_descuento"
                :initial-value="useForm.fecha_tope_descuento"
              />
            </div>

            <FileInput
              name="img"
              @update:modelValue="updateForm($event)"
              :initial-value="useForm.img"
              :validateInput="validatInput"
              :errorMessage="validateMessage.errors.img"
              label="Imagen"
            >
              <q-icon name="cloud_upload" />
            </FileInput>
          </q-card-section>

          <q-card-actions align="right" class="text-primary">
            <q-btn flat label="Cancelar" v-close-popup />
            <q-btn
              :loading="isLoadingCreate || isLoadingEdit"
              type="submit"
              flat
              label="Enviar"
            />
          </q-card-actions>
        </q-form>
      </q-card>
    </q-dialog>
    <!--Floating button-->
    <q-page-sticky position="bottom-right" style="margin: 12px; bottom: 60px">
      <q-btn fab icon="add" color="primary" @click="createNew" />
      <q-btn
        fab
        icon="download"
        @click="exporExcel"
        style="
          margin-left: 0.5em;
          background-color: rgb(4, 137, 15);
          color: white;
        "
      />
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
