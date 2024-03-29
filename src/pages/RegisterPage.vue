<script setup>
import { ref, computed } from 'vue';
import { useQuasar } from 'quasar';
import { registerSchema } from 'src/schemas/registerSchema';
import StepOne from '../components/RegisterInputs/StepOne.vue';
import StepTwo from '../components/RegisterInputs/StepTwo.vue';
import StepThree from '../components/RegisterInputs/StepThree.vue';
import StepFour from '../components/RegisterInputs/StepFour.vue';
import logo from './../assets/icons/logo.svg';

import { userAuth } from 'src/composables/userAuth';
import { useValidateForm } from 'src/composables/useValidateForm';

const $q = useQuasar();
const { register, isLoadingRegister } = userAuth();

const GENDER_OPTIONS = ['Hombre', 'Mujer'];

const INITIAL_VALUES = {
  name: '',
  email: '',
  last_name: '',
  phone: '',
  sex: GENDER_OPTIONS[0],
  password: '',
  vendedor: 'Promotor 4',
  provincia: [],
};

const lastStep = 4;
const currentForm = ref(1);

const nextStep = () => currentForm.value++;
const prevStep = () => currentForm.value--;

const disableLastButton = computed(() => currentForm.value === 1);
const isLastStep = computed(() => currentForm.value === lastStep);

const { useForm, validatInput, validateMessage, validateForm } =
  useValidateForm({ initialValue: INITIAL_VALUES, schema: registerSchema });

const onSubmit = () => {
  const roleIdClient = 3;

  validateForm();
  register({ ...useForm.value, role_id: roleIdClient });
};

const updateForm = ({ key, value }) => {
  useForm.value[key] = value;
};

const isLowerThanExtraLarge = computed(() => {
  const baseClass = 'full-width column items-center ';
  if ($q.screen.lt.xl) {
    return `${baseClass} no-shadow`;
  } else {
    return baseClass;
  }
});
</script>

<template>
  <div
    class="full-width items-center row justify-center registerContainer q-py-md"
  >
    <q-card
      :class="isLowerThanExtraLarge"
      style="max-width: 500px; background-color: #f8fdff"
    >
      <q-card-section class="column items-center justify-center">
        <q-img
          :src="logo"
          width="170px"
          alt="logo"
          height="auto"
          class="rounded-borders q-mb-md"
        />
        <p class="q-ma-none title-large text-center">
          Bienvenido a Tarjeta Joven Diamante
        </p>
      </q-card-section>

      <q-card-section class="full-width">
        <form
          @submit.prevent="onSubmit"
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
          <router-link class="text-link" to="/login"
            >¿Ya tienes cuenta?
            <span class="text-weight-bold">Login</span></router-link
          >
        </form>
      </q-card-section>
    </q-card>
  </div>
</template>
