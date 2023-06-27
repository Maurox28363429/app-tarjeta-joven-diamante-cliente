<script setup>
import { ref, computed, watchEffect } from 'vue';
import { registerSchema } from 'src/schemas/registerSchema';
import StepOne from 'src/components/RegisterInputs/StepOne.vue';
import StepTwo from 'src/components/RegisterInputs/StepTwo.vue';
import StepThree from 'src/components/RegisterInputs/StepThree.vue';
import StepFour from 'src/components/RegisterInputs/StepFour.vue';
import { useGetRoles } from 'src/querys/roleQuerys';

import { userAuth } from 'src/composables/userAuth';
import { useValidateForm } from 'src/composables/useValidateForm';

const { adminRegister, isLoadingRegister } = userAuth();
const { data: roles } = useGetRoles();

const GENDER_OPTIONS = ['Hombre', 'Mujer'];

const roleOptions = ref([]);

watchEffect(() => {
  if (roles.value) {
    roleOptions.value = roles.value.map(({ name, id }) => {
      return { label: name, value: id };
    });
  }
});
const INITIAL_VALUES = {
  name: '',
  email: '',
  last_name: '',
  phone: '',
  sex: GENDER_OPTIONS[0],
  password: '',
  vendedor: '',
  provincia: [],
  role_id: roleOptions.value[0],
};

const lastStep = 5;
const currentForm = ref(1);

const nextStep = () => currentForm.value++;
const prevStep = () => currentForm.value--;

const disableLastButton = computed(() => currentForm.value === 1);
const isLastStep = computed(() => currentForm.value === lastStep);

const { useForm, validatInput, validateMessage, validateForm } =
  useValidateForm({ initialValue: INITIAL_VALUES, schema: registerSchema });

const onSubmit = () => {
  validateForm();
  adminRegister({ ...useForm.value, role_id: useForm.value.role_id.value });
};

const onReset = () => {
  useForm.value = INITIAL_VALUES;
};

const updateForm = ({ key, value }) => {
  useForm.value[key] = value;
};
</script>

<template>
  <div class="full-width items-center row justify-center">
    <q-card
      class="full-width column items-center no-shadow absolute-center"
      style="max-width: 500px; background-color: transparent"
    >
      <q-card-section class="column items-center justify-center">
        <p class="q-ma-none title-large text-center">Crear usuario</p>
      </q-card-section>

      <q-card-section class="full-width">
        <form
          @submit.prevent="onSubmit"
          @reset="onReset"
          class="q-gutter-y-md full-width column items-center loginForm"
          autocomplete="nope"
        >
          <div class="full-width row justify-between">
            <p class="title-medium">Crear cuenta</p>
            <p class="text-weight-bold">{{ currentForm }}/{{ lastStep }}</p>
          </div>
          <div
            class="q-mb-md q-ma-none text-dark column items-center full-width"
          >
            <div v-show="currentForm === 1" class="full-width">
              <StepOne
                @update:modelValue="updateForm($event)"
                :validateMessage="validateMessage"
                :validatInput="validatInput"
                :useForm="useForm"
              />
            </div>
            <div v-show="currentForm === 2" class="full-width">
              <StepTwo
                @update:modelValue="updateForm($event)"
                :validateMessage="validateMessage"
                :validatInput="validatInput"
                :useForm="useForm"
              />
            </div>
            <div v-show="currentForm === 3" class="full-width">
              <StepFour
                @update:modelValue="updateForm($event)"
                :validateMessage="validateMessage"
                :validatInput="validatInput"
                :useForm="useForm"
              />
            </div>
            <div v-show="currentForm === 4" class="full-width">
              <StepThree
                @update:modelValue="updateForm($event)"
                :validateMessage="validateMessage"
                :validatInput="validatInput"
                :useForm="useForm"
              />
            </div>
            <div v-show="currentForm === 5" class="full-width">
              <q-select
                outlined
                v-model="useForm.role_id"
                use-input
                input-debounce="0"
                label="Role de usuario"
                :options="roleOptions"
                behavior="menu"
              />
            </div>
          </div>

          <div class="q-py-none full-width row q-gutter-x-md justify-center">
            <q-btn
              :disable="disableLastButton"
              @click="prevStep"
              label="Anterior"
              class="col-5"
              height="48px"
              color="secondary"
              size="14px"
              fill
            />
            <q-btn
              v-if="!isLastStep"
              @click="nextStep"
              label="Siguiente"
              height="48px"
              class="col-5"
              color="secondary"
              size="14px"
              fill
            />
            <q-btn
              v-else
              :disable="!validateMessage.isvalid"
              type="submit"
              label="Registrar"
              height="48px"
              class="col-5"
              color="primary"
              :loading="isLoadingRegister"
              size="14px"
              fill
            />
          </div>
        </form>
      </q-card-section>
    </q-card>
  </div>
</template>
