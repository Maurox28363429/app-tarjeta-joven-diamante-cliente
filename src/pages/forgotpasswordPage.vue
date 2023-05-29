<script setup>
import { useRouter } from "vue-router";
import { emailSchema } from "src/schemas/emailShema";
import { useRecoveryPasswordStore } from "src/stores/recoveryPasswordStore";
import { useValidateForm } from "src/composables/useValidateForm";
import { useSendEmail } from "src/querys/userQuerys";

const { go } = useRouter();

const INITIAL_VALUES = {
  email: "",
};

const { useForm, validatInput, validateMessage } = useValidateForm({
  initialValue: INITIAL_VALUES,
  schema: emailSchema,
});

const recoveryPasswordStore = useRecoveryPasswordStore();

const { mutate, isLoading } = useSendEmail();

const sendEmail = async () => {
  mutate({ email: useForm.value.email });
  recoveryPasswordStore.setEmail(useForm.value.email);
};
</script>

<template>
  <div class="full-width">
    <div @click="go(-1)" class="full-width q-pl-md q-pt-md">
      <q-icon name="arrow_back" size="md" color="dark" class="cursor-pointer" />
    </div>
    <div class="full-width row justify-center">
      <div
        class="q-pa-md column items-center full-width"
        style="max-width: 400px"
      >
        <p class="title-large q-mx-none q-mb-xl">Recuperar contraseña</p>

        <form @submit.prevent="sendEmail" class="full-width">
          <p class="title-medium q-mb-xl text-center">
            Por favor ingresa tu email para recibir el código de verificación.
          </p>
          <div class="full-width input">
            <label class="label-large">
              Email
              <q-input
                lazy-rules
                type="email"
                outlined
                v-model="useForm.email"
                placeholder="Example@gmail.com"
                @blur="validatInput('email')"
                @keypress="validatInput('email')"
              />
            </label>
            <p class="text-error" v-if="!!validateMessage.errors.email">
              {{ validateMessage.errors.email }}
            </p>
          </div>
          <q-btn
            :disable="!validateMessage.isvalid"
            :loading="isLoading"
            label="Enviar"
            size="14px"
            fill
            height="48px"
            color="primary"
            class="full-width q-mb-md"
            type="submit"
          />
        </form>
      </div>
    </div>
  </div>
</template>
