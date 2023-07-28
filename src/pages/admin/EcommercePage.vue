<script setup>
import { ref, computed, watchEffect } from 'vue';
import { useValidateForm } from 'src/composables/useValidateForm.js';
import {
  useGetProducts,
  useCreateProductMutation,
  useEditProductMutation,
  useDeleteProductMutation,
  useGetProductCategories,
} from 'src/querys/productQuery';
import { productSchema } from 'src/schemas/productSchema.js';
import { checkFileType } from 'src/utils/checkFileType';

const formulario = ref(false);
const edit_id = ref(null);
const editorRef = ref(null);

const pages = ref(1);
const lastPage = ref(1);
const itemsPerPage = ref([]);

const search = ref('');
const {
  data: products,
  refetch,
  isLoading: isLoadingNews,
} = useGetProducts({
  pages,
  search,
});

const pageCategory = ref(1);
const searchCategory = ref('');

const { data: categories, isLoading: isLoadingCategories } =
  useGetProductCategories({
    page: pageCategory,
    search: searchCategory,
  });

const { mutate: createNewInformative, isLoading: isLoadingCreate } =
  useCreateProductMutation();
const { mutate: deleteNewInformative } = useDeleteProductMutation();
const { mutate: editNewInformative, isLoading: isLoadingEdit } =
  useEditProductMutation();

const categoryOptions = computed(() => {
  return categories.value?.data?.map((category) => ({
    label: category.name,
    value: category.id,
  }));
});

const findCategory = (id) => {
  return (
    categoryOptions.value?.find((category) => category.value === Number(id)) ??
    null
  );
};

const initialValues = () => ({
  nombre: null,
  descripcion: null,
  precio: null,
  stock: null,
  img: null,
  whatsap: null,
  category_id: categoryOptions.value ? categoryOptions.value[0] : null,
});

const { useForm, validatInput } = useValidateForm({
  initialValue: initialValues(),
  schema: productSchema,
});

const currentNews = computed(() => {
  return products?.value?.data?.find(({ id }) => {
    return id === edit_id.value;
  });
});

const ACCEPTED_TYPES_FOR_DNI = ['image/jpeg', 'image/png', 'image/jpg', 'jpg'];

watchEffect(() => {
  if (products.value && !isLoadingNews.value) {
    pages.value = products?.value?.pagination?.currentPage;
    lastPage.value = products?.value?.pagination?.lastPage;
    itemsPerPage.value = [products?.value?.pagination?.itemsPerPage];
  }
});

const handleModal = (id) => {
  edit_id.value = id;
  formulario.value = true;
  useForm.value = {
    ...currentNews.value,
    category_id: findCategory(currentNews.value?.category_id),
  };
  console.log(
    useForm.value,
    currentNews.value,
    findCategory(currentNews.value?.category_id)
  );
};

const createNew = () => {
  edit_id.value = null;
  useForm.value = initialValues();
  formulario.value = true;
};

const handleNews = () => {
  edit_id.value
    ? editNewInformative({
        ...useForm.value,
        id: edit_id.value,
        category_id: useForm.value.category_id.value,
      })
    : createNewInformative({
        ...useForm.value,
        category_id: useForm.value.category_id.value,
        whatsap: useForm.value.whatsap.replace(/[\s-]/g, ''),
      });
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
  { name: 'img', align: 'center', label: 'IMG', field: 'img' },
  { name: 'nombre', label: 'NOMBRE', field: 'nombre' },
  {
    name: 'category_id',
    label: 'CATEGORIA',
    field: 'category_id',
  },
  {
    name: 'descripcion',
    label: 'DESCRIPCION',
    field: 'descripcion',
    sortable: true,
  },
  { name: 'precio', label: 'PRECIO', field: 'precio' },
  { name: 'stock', label: 'STOCK', field: 'stock' },
  { name: 'whatsap', label: 'WHATSAAP', field: 'whatsap' },
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
      class="row full-width q-px-md"
      v-if="!isLoadingNews && !isLoadingCategories"
    >
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
          :rows="products?.data"
          :rows-per-page-options="itemsPerPage"
          :columns="columns"
          row-key="name"
          v-if="!isLoadingNews"
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
              <q-td key="nombre" :props="props">
                {{ props.row?.nombre }}
              </q-td>
              <q-td key="category_id" :props="props">
                {{
                  findCategory(props.row?.category_id)?.label ?? 'Sin categoria'
                }}
              </q-td>
              <q-td key="descripcion" :props="props">
                <div
                  class="line-clamp-3"
                  style="max-width: 100px"
                  v-html="props.row?.descripcion"
                />
              </q-td>
              <q-td key="precio" :props="props">
                {{ props.row?.precio }}
              </q-td>
              <q-td key="stock" :props="props">
                {{ props.row?.stock }}
              </q-td>
              <q-td key="whatsap" :props="props">
                {{ props.row?.whatsap }}
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
                v-model="useForm.nombre"
                label="Nombre"
                @blur="validatInput('nombre')"
                @keypress="validatInput('nombre')"
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
            <div class="col-12">
              <q-select
                :options="categoryOptions"
                outlined
                label="Categoria"
                v-model="useForm.category_id"
                @blur="validatInput('category_id')"
                @keypress="validatInput('category_id')"
              />
            </div>
            <div class="col-12 col-md-5">
              <q-input
                outlined
                v-model="useForm.precio"
                label="Precio"
                prefix="$"
                mask="#.##"
                fill-mask="0"
                reverse-fill-mask
                @blur="validatInput('precio')"
                @keypress="validatInput('precio')"
              />
            </div>
            <div class="col-12 col-md-5">
              <q-input
                outlined
                v-model="useForm.stock"
                prefix="N°"
                label="Stock"
                @blur="validatInput('stock')"
                @keypress="validatInput('stock')"
              />
            </div>
            <div class="col-12 col-md-5">
              <q-input
                outlined
                v-model="useForm.whatsap"
                label="Whatsaap"
                mask="### - ###"
                @blur="validatInput('whatsap')"
                @keypress="validatInput('whatsap')"
              />
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
