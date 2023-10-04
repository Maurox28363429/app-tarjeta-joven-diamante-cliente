<script setup>
import { ref, computed, watchEffect } from 'vue';
import { useValidateForm } from 'src/composables/useValidateForm';

import {
  useGetPromotions,
  useCreatePromotionMutation,
  useEditPromotionMutation,
  useDeletePromotionMutation,
} from 'src/querys/promotionsQuerys';

import { useToast } from 'src/composables/useToast';

import { promotionsSchema } from 'src/schemas/promotionsSchema';

import FileInput from 'src/forms/FileInput.vue';
import TextInput from 'src/forms/TextInput.vue';
import TextareaInput from 'src/forms/TextareaInput.vue';

import PROMOTIONS_TABLE from 'src/shared/constansts/tables/promotionsTable';

const formulario = ref(false);
const edit_id = ref(null);

const pages = ref(1);
const search = ref('');

const itemsPerPage = ref([0]);
const lastPage = ref(1);

const { triggerWarning } = useToast();

const {
  data: promotionsData,
  isLoading,
  refetch,
} = useGetPromotions({ search, pages });

watchEffect(() => {
  if (!isLoading.value && promotionsData?.value?.pagination) {
    pages.value = promotionsData?.value?.pagination?.currentPage;
    itemsPerPage.value = [promotionsData?.value?.pagination?.itemsPerPage];
    lastPage.value = promotionsData?.value?.pagination?.lastPage;
  }
});

const { mutate: createNewInformative, isLoading: isLoadingCreate } =
  useCreatePromotionMutation();
const { mutate: deleteNewInformative } = useDeletePromotionMutation();
const { mutate: editNewInformative, isLoading: isLoadingEdit } =
  useEditPromotionMutation();

const initialValues = () => ({
  titulo: '',
  descripcion: '',
  categoria: '',
  img_url: [],
  prioridad: 1,
  link_youtube: '',
  link_facebook: '',
  link_instragram: '',
  link_web: '',
  link_otros: '',
});

const { useForm, validatInput, validateMessage, validateForm } =
  useValidateForm({
    initialValue: initialValues(),
    schema: promotionsSchema,
  });

const currentNews = computed(() => {
  return promotionsData?.value?.data?.find(({ id }) => {
    return id === edit_id.value;
  });
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
  validateForm();
  if (validateMessage.value.isvalid) {
    formulario.value = false;
    return edit_id.value
      ? editNewInformative({ ...useForm.value, id: edit_id.value })
      : createNewInformative(useForm.value);
  }
  triggerWarning('Por favor, rellene los campos correctamente');
};

const updateForm = ({ key, value }) => {
  useForm.value[key] = value;
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
            label="Buscar promociones"
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
          :rows-per-page-options="itemsPerPage"
          title="Promociones"
          :loading="isLoading && !itemsPerPage > 0"
          :rows="promotionsData?.data ?? []"
          :columns="PROMOTIONS_TABLE"
          row-key="name"
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
                <div
                  class="line-clamp-3"
                  style="max-width: 200px"
                  v-html="props.row?.descripcion"
                />
              </q-td>
              <q-td key="prioridad" :props="props">
                {{ props.row?.prioridad }}
              </q-td>
              <q-td key="categoria" :props="props">
                {{ props.row?.categoria }}
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
                        <q-item-section
                          @click="deleteNewInformative(props.row?.id)"
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
              {{ edit_id ? 'Editar' : 'Agregar' }} Promoción
            </div>
          </q-card-section>

          <q-card-section class="row full-width" style="gap: 14px">
            <div class="col-12">
              <TextInput
                label="titulo"
                name="titulo"
                :initial-value="useForm.titulo"
                @update:model-value="updateForm($event)"
                :validat-input="validatInput"
                :error-message="validateMessage.errors.titulo"
              />
            </div>
            <div class="col-12">
              <TextInput
                label="categoria"
                name="categoria"
                :initial-value="useForm.categoria"
                @update:model-value="updateForm($event)"
                :validat-input="validatInput"
                :error-message="validateMessage.errors.categoria"
              />
            </div>
            <div class="col-12">
              <TextareaInput
                label="descripcion"
                name="descripcion"
                :initial-value="useForm.descripcion"
                @update:model-value="updateForm($event)"
                :validat-input="validatInput"
                :error-message="validateMessage.errors.descripcion"
              />
            </div>
            <div class="col-12 col-md-5">
              <TextInput
                label="Prioridad"
                type="number"
                :initial-value="useForm.prioridad"
                @update:model-value="updateForm($event)"
                :validat-input="validatInput"
                :error-message="validateMessage.errors.prioridad"
                name="prioridad"
              />
            </div>
            <div class="col-12 col-md-5">
              <TextInput
                :initial-value="useForm.link_youtube"
                @update:model-value="updateForm($event)"
                :validat-input="validatInput"
                :error-message="validateMessage.errors.link_youtube"
                name="link_youtube"
                label="Link youtube"
              >
                <q-icon name="la la-youtube" />
              </TextInput>
            </div>
            <div class="col-12 col-md-5">
              <TextInput
                :initial-value="useForm.link_facebook"
                @update:model-value="updateForm($event)"
                :validat-input="validatInput"
                :error-message="validateMessage.errors.link_facebook"
                name="link_facebook"
                label="Link facebook"
              >
                <q-icon name="facebook" />
              </TextInput>
            </div>
            <div class="col-12 col-md-5">
              <TextInput
                :validat-input="validatInput"
                :error-message="validateMessage.errors.link_instragram"
                name="link_instragram"
                @update:model-value="updateForm($event)"
                :initial-value="useForm.link_instragram"
                label="Link instragram"
              >
                <q-icon name="la la-instagram" />
              </TextInput>
            </div>
            <div class="col-12 col-md-5">
              <TextInput
                :initial-value="useForm.link_web"
                label="Link web"
                @update:model-value="updateForm($event)"
                :validat-input="validatInput"
                :error-message="validateMessage.errors.link_web"
                name="link_web"
              >
                <q-icon name="public" />
              </TextInput>
            </div>
            <div class="col-12 col-md-5">
              <TextInput
                :initial-value="useForm.link_otros"
                label="Link otrosad"
                @update:model-value="updateForm($event)"
                :validat-input="validatInput"
                :error-message="validateMessage.errors.link_otros"
                name="link_otros"
              >
                <q-icon name="link" />
              </TextInput>
            </div>
            <div class="col-12">
              <FileInput
                name="img"
                :validate-input="validatInput"
                :error-message="validateMessage.errors.img"
                @update:model-value="updateForm($event)"
                :initial-value="useForm.img"
                label="Imagen"
              >
                <template v-slot:prepend>
                  <q-icon name="cloud_upload" />
                </template>
              </FileInput>
            </div>
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
    </q-page-sticky>
  </q-page>
</template>
