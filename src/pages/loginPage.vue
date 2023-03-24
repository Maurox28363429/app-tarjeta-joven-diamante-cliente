<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

import { loginSchema } from 'src/schemas/loginSchema'
import loginUser from 'src/api/loginUser'

import { useValidateForm } from 'src/composables/useValidateForm'
import { useToast } from 'src/composables/useToast'

const { triggerPositive, triggerWarning } = useToast()

const loadingButton = ref(false)
const router = useRouter()

const INITIAL_VALUES = {
  email: '',
  password: ''
}

const { useForm, validatInput, validateMessage, validateForm } =
  useValidateForm({ initialValue: INITIAL_VALUES, schema: loginSchema })

const onSubmit = async () => {
  validateForm()
  try {
    loadingButton.value = true
    const { data } = await loginUser(useForm.value)
    localStorage.setItem('user', JSON.stringify(data))
    triggerPositive('¡Estás iniciando sesión  !')
    if (
      data.user.membresia?.status === 'activa' ||
      data.user.membresia?.days > 0
    ) {
      router.push('/home')
    } else {
      router.push('/memberships')
    }
  } catch (err) {
    if (err.response?.status === 400) {
      triggerWarning(
        'No se ha encontrado el usuario, por favor verifique sus datos'
      )
    }
    if (err.code === 'ERR_NETWORK') {
      triggerWarning('Verifique su conexión a internet e intente nuevamente')
    }
    console.error(err)
  } finally {
    loadingButton.value = false
  }
}
</script>

<template>
  <div class="full-width window-height row flex-center loginContainer">
    <div class="full-width q-my-xl q-mx-none column items-center login">
      <div class="column full-width items-center">
        <q-img
          src="./../assets/logo.svg"
          width="100px"
          height="80px"
          img-class="my-custom-image"
          class="q-mb-md"
        >
        </q-img>
        <p class="text-h5 q-mb-xl text-weight-bold">
          ¡Bienvenido de vuelta! :)
        </p>
      </div>

      <q-form
        @submit.prevent="onSubmit"
        class="q-gutter-md full-width column items-center loginForm"
      >
        <div class="q-mb-md q-ma-none text-dark column items-center full-width">
          <div class="full-width input">
            <label class="label-input">
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
            <p class="error" v-if="!!validateMessage.errors.email">
              {{ validateMessage.errors.email }}
            </p>
          </div>

          <div class="full-width input">
            <label class="label-input">
              Contraseña
              <q-input
                type="password"
                outlined
                lazy-rules
                v-model="useForm.password"
                placeholder="********"
                @blur="validatInput('password')"
                @keypress="validatInput('password')"
              />
            </label>
            <p class="error" v-if="!!validateMessage.errors.password">
              {{ validateMessage.errors.password }}
            </p>
          </div>
        </div>

        <div class="full-width q-ma-none">
          <router-link class="text-link" to="/">
            Olvidé mi contraseña</router-link
          >
        </div>
        <div class="full-width q-px-md column items-center">
          <q-btn
            :disable="!validateMessage.isvalid"
            label="Login"
            size="14px"
            fill
            height="48px"
            color="secondary"
            class="full-width q-mb-md"
            :loading="loadingButton"
            type="submit"
          />
          <router-link class="text-link" to="/register">
            Aún no tienes cuenta?
            <span class="text-weight-bold">Regístrate</span></router-link
          >
        </div>
      </q-form>
    </div>
  </div>
</template>
