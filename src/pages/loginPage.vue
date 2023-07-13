<script setup>
import { ref } from 'vue';
import { loginSchema } from 'src/schemas/loginSchema';
import { useValidateForm } from 'src/composables/useValidateForm';
import { userAuth } from 'src/composables/userAuth';
import logo from './../assets/icons/logo.svg';

const { login, isLoadingLogin } = userAuth();

const INITIAL_VALUES = {
  email: '',
  password: '',
};

const { useForm, validatInput, validateMessage, validateForm } =
  useValidateForm({ initialValue: INITIAL_VALUES, schema: loginSchema });

const onSubmit = async () => {
  validateForm();
  login({ ...useForm.value });
};

const isVisible = ref(false);

const showPassword = () => {
  isVisible.value = !isVisible.value;
};
</script>

<template>
  <div
    style="min-height: 100vh"
    class="full-width q-py-md row flex-center loginContainer"
  >
    <q-card
      :class="
        $q.screen.lt.xl
          ? 'full-width column items-center no-shadow'
          : 'full-width column items-center '
      "
      style="max-width: 500px; background-color: #f8fdff"
    >
      <q-card-section class="column full-width items-center">
        <q-img :src="logo" width="180px" height="auto" class="q-mb-xs" />
        <p class="title-large text-center q-ma-none">¡Bienvenido de vuelta!</p>
      </q-card-section>

      <q-card-section class="full-width">
        <q-form
          @submit.prevent="onSubmit"
          class="q-gutter-md full-width column items-center loginForm"
        >
          <div
            class="q-mb-md q-ma-none text-dark column items-center full-width"
          >
            <div class="full-width">
              <p class="title-medium">Ingresa a tu cuenta</p>
            </div>
            <div class="full-width input">
              <label class="label-large">
                Email
                <q-input
                  lazy-rules
                  type="email"
                  outlined
                  autocomplete="nope"
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

            <div class="full-width input">
              <label class="label-large">
                Contraseña
                <q-input
                  :type="isVisible ? 'text' : 'password'"
                  outlined
                  lazy-rules
                  autocomplete="nope"
                  v-model="useForm.password"
                  placeholder="********"
                  @blur="validatInput('password')"
                  @keypress="validatInput('password')"
                >
                  <template v-slot:append>
                    <q-icon
                      @click="showPassword"
                      class="cursor-pointer"
                      :name="isVisible ? 'visibility' : 'visibility_off'"
                      color="primary"
                    />
                  </template>
                </q-input>
              </label>
              <p class="text-error" v-if="!!validateMessage.errors.password">
                {{ validateMessage.errors.password }}
              </p>
            </div>
          </div>

          <div class="full-width q-ma-none">
            <router-link
              class="text-link body-medium text-primary"
              to="/forgotpassword"
            >
              Olvidé mi contraseña
            </router-link>
          </div>
          <div class="full-width column items-center">
            <q-btn
              :disable="!validateMessage.isvalid"
              label="Login"
              size="14px"
              fill
              height="48px"
              color="primary"
              class="full-width q-mb-md"
              :loading="isLoadingLogin"
              type="submit"
            />
            <router-link class="body-small text-primary" to="/register">
              ¿Aún no tienes cuenta?
              <span class="text-weight-bold">Regístrate</span></router-link
            >
          </div>
        </q-form>
      </q-card-section>
    </q-card>
  </div>
</template>
