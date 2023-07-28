<script setup>
import { ref, computed, watchEffect } from 'vue';
import { useValidateForm } from 'src/composables/useValidateForm.js';
import {
  useGetProductCategories,
  useDeleteProductCategoryMutation,
  useCreateProductCategoryMutation,
  useUploadProductCategoryMutation,
} from 'src/querys/productQuery';

import { productCategorySchema } from 'src/schemas/productSchema';

const page = ref(1);
const lastPage = ref(1);
const itemsPerPage = ref([1]);
const formulario = ref(false);
const edit_id = ref(null);

const search = ref('');

const {
  data: category,
  refetch,
  isLoading: isLoadingCategory,
} = useGetProductCategories({
  page,
  search,
});

const { mutate: createDirectivo, isLoading: isLoadingCreate } =
  useCreateProductCategoryMutation();
const { mutate: deleteDirectivo } = useDeleteProductCategoryMutation();
const { mutate: editDirectivo, isLoading: isLoadingEdit } =
  useUploadProductCategoryMutation();

const initialValues = () => ({
  name: '',
  icon: '',
});

const { useForm, validatInput, validateMessage } = useValidateForm({
  initialValue: initialValues(),
  schema: productCategorySchema,
});

const currentNews = computed(() => {
  return category?.value?.data?.find(({ id }) => {
    return id === edit_id.value;
  });
});

watchEffect(() => {
  if (category.value && !isLoadingCategory.value) {
    page.value = category?.value?.pagination?.currentPage;
    lastPage.value = category?.value?.pagination?.lastPage;
    itemsPerPage.value = [category?.value?.pagination?.itemsPerPage];
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
  { name: 'name', align: 'center', label: 'NOMBRE', field: 'name' },
  { name: 'icon', label: 'ICON', field: 'icon' },
  {
    name: 'actions',
    label: 'ACCIONES',
    field: 'actions',
  },
];
</script>
<template>
  <q-page class="flex">
    <section class="row full-width q-px-md" v-if="!isLoadingCategory">
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
            label="Buscar categoria"
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
          title="Categorias"
          :rows="category?.data"
          :rows-per-page-options="itemsPerPage"
          :columns="columns"
          row-key="name"
          v-if="!isLoadingCategory"
        >
          <template v-slot:body="props">
            <q-tr :props="props">
              <q-td key="id" :props="props">
                {{ props.row?.id }}
              </q-td>
              <q-td key="name" :props="props">
                {{ props.row?.name }}
              </q-td>
              <q-td key="icon" :props="props">
                <q-img
                  alt="icon"
                  :src="props.row?.icon"
                  spinner-color="white"
                  style="height: 32px; max-width: 32px"
                />
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
              {{ edit_id ? 'Editar' : 'Agregar' }} categoria
            </div>
          </q-card-section>

          <q-card-section class="row full-width" style="gap: 14px">
            <div class="col-12">
              <q-input
                outlined
                v-model="useForm.name"
                label="Nombre"
                @blur="validatInput('name')"
                @keypress="validatInput('name')"
              />
              <p class="text-error" v-if="!!validateMessage.errors.name">
                {{ validateMessage.errors.name }}
              </p>
            </div>
            <div class="col-12">
              <q-file
                outlined
                v-model="useForm.icon"
                label="Icono"
                @blur="validatInput('icon')"
                @keypress="validatInput('icon')"
              />
              <p class="text-error" v-if="!!validateMessage.errors.icon">
                {{ validateMessage.errors.icon }}
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
