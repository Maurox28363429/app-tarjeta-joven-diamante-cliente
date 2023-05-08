<script setup>
import { registerSchema } from "src/schemas/registerSchema";
import { ref, computed } from "vue";
import StepOne from "../components/RegisterInputs/StepOne.vue";
import StepTwo from "../components/RegisterInputs/StepTwo.vue";
import StepThree from "../components/RegisterInputs/StepThree.vue";
import StepFour from "../components/RegisterInputs/StepFour.vue";

import { userAuth } from "src/composables/userAuth";
import { useValidateForm } from "src/composables/useValidateForm";

const { register, isLoadingRegister } = userAuth();

const GENDER_OPTIONS = ["Hombre", "Mujer"];

const INITIAL_VALUES = {
  name: "",
  email: "",
  last_name: "",
  phone: "",
  sex: GENDER_OPTIONS[0],
  password: "",
  vendedor: "",
};

const lastStep = 4;
const currentForm = ref(1);

const nextStep = () => currentForm.value++;
const prevStep = () => currentForm.value--;

const disableLastButton = computed(() => currentForm.value === 1);
const isLastStep = computed(() => currentForm.value === lastStep);

const { useForm, validatInput, validateMessage, validateForm } =
  useValidateForm({ initialValue: INITIAL_VALUES, schema: registerSchema });

const onSubmit = async (e) => {
  validateForm();
  const roleIdClient = 3;
  register({ ...useForm.value, role_id: roleIdClient });
};

const updateForm = ({ key, value }) => {
  useForm.value[key] = value;
};
</script>

<template>
  <div class="full-width items-center row justify-center registerContainer">
    <div class="column items-center q-mx-none register">
      <div class="column items-center justify-center">
        <q-img
          src="./../assets/icons/logo.svg"
          width="100px"
          height="80px"
          img-class="my-custom-image"
          class="rounded-borders q-mb-md"
        >
        </q-img>
        <p class="q-mb-xl title-large text-center">
          Bienvenido a Tarjeta Joven Diamante
        </p>
      </div>

      <q-form
        @submit.prevent="onSubmit"
        class="q-gutter-md full-width column items-center loginForm"
      >
        <div class="full-width row justify-between">
          <p class="title-medium">Crear cuenta</p>
          <p class="text-weight-bold">{{ currentForm }}/{{ lastStep }}</p>
        </div>
        <div class="q-mb-md q-ma-none text-dark column items-center full-width">
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
            <StepThree
              @update:modelValue="updateForm($event)"
              :validateMessage="validateMessage"
              :validatInput="validatInput"
              :useForm="useForm"
            />
          </div>
          <div v-show="currentForm === 4" class="full-width">
            <StepFour
              @update:modelValue="updateForm($event)"
              :validateMessage="validateMessage"
              :validatInput="validatInput"
              :useForm="useForm"
            />
          </div>
        </div>

        <div
          class="q-py-none full-width row"
          style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px"
        >
          <q-btn
            :disable="disableLastButton"
            @click="prevStep"
            label="Anterior"
            class=""
            height="48px"
            color="secondary"
            size="14px"
            fill
          />
          <q-btn
            v-if="!isLastStep"
            @click="nextStep"
            label="Siguiente"
            class=""
            height="48px"
            color="secondary"
            size="14px"
            fill
          />
          <q-btn
            v-else
            :disable="!validateMessage.isvalid"
            type="submit"
            label="Registrar"
            class=""
            height="48px"
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
      </q-form>
    </div>
  </div>
</template>
