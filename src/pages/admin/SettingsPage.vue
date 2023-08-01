<script setup>
import { useValidateForm } from 'src/composables/useValidateForm';
import { consecutiveSchema } from 'src/schemas/consecutiveSchema';
import {
  getConsecutiveQuery,
  uploadConsecutiveMutation,
} from 'src/querys/getConsecutiveQuery';
import { watchEffect } from 'vue';

const { data: consecutive, isLoading: isLoadingConsecutive } =
  getConsecutiveQuery();
const { mutate: uploadConsecutive, isLoading: isLoadingConsecutiveMutation } =
  uploadConsecutiveMutation();

const { useForm, validateForm } = useValidateForm({
  initialValue: {},
  schema: consecutiveSchema,
});

watchEffect(() => {
  if (consecutive.value && !isLoadingConsecutive.value) {
    useForm.value = {
      nombre: consecutive.value.data[0].nombre,
      valor: consecutive.value.data[0].valor,
    };
  }
});

const options = ['Consecutivo_seguro'];

const submit = () => {
  validateForm();
  uploadConsecutive({ ...useForm.value, id: consecutive.value.data[0].id });
};
</script>

<template>
  <div class="full-width q-pa-md">
    <p class="text-h6 text-medium">Settings</p>
    <div class="full-width row justify-center items-center">
      <div class="full-width row items-center" style="gap: 10px">
        <q-card
          class="full-width"
          style="max-width: 280px"
          v-if="!isLoadingConsecutive"
        >
          <form @submit.prevent="submit">
            <q-card-section class="q-pb-none">
              <p class="text-medium q-ma-none text-center">
                Consecutivo de Facturas
              </p>
            </q-card-section>
            <q-card-section class="q-gutter-y-md full-width">
              <q-select
                label="Nombre"
                name="nombre"
                outlined
                :options="options"
                v-model="useForm.nombre"
                :value="consecutive.data.nombre"
              />
              <q-input
                type="number"
                name="valor"
                label="Valor"
                outlined
                v-model="useForm.valor"
                :value="consecutive.data.valor"
              />
            </q-card-section>
            <q-card-actions>
              <q-btn
                :loading="isLoadingConsecutiveMutation"
                class="full-width"
                type="submit"
                color="primary"
                label="Guardar"
              />
            </q-card-actions>
          </form>
        </q-card>
      </div>
    </div>
  </div>
</template>
