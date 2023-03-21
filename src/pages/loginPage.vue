<script setup>
import { ref } from 'vue'
import { loginSchema } from 'src/schemas/loginSchema'
import loginUser from 'src/api/loginUser'

const useFormLoging = ref({
  email: '',
  password: ''
})

const validateMessageLogin = ref({
  errors: {
    email: '',
    password: ''
  },
  isvalid: false
})

const onSubmit = async () => {
  validateForm()
  console.log('onsubmit')
  try {
    const { data } = await loginUser(useFormLoging.value)
    localStorage.setItem('token', data.token)
    console.log(data, 'data')
  } catch (err) {
    console.error(err)
  }
}

const validateForm = () => {
  loginSchema
    .validate(useFormLoging.value, { abortEarly: false })
    .then(() => (validateMessageLogin.value = { errors: {}, isvalid: true }))
    .catch((err) => {
      const errors = err.inner.reduce((acc, error) => {
        acc[error.path] = error.message
        return acc
      }, {})
      validateMessageLogin.value = {
        errors,
        isvalid: false
      }
    })
}

const validatInput = (field) => {
  loginSchema
    .validateAt(field, useFormLoging.value)
    .then(() => (validateMessageLogin.value.errors[field] = ''))
    .catch((err) => {
      validateMessageLogin.value.errors[err.path] = err.message
    })
  validateForm()
  console.log(useFormLoging.value, 'validate')
}
</script>

<template>
  <div class="full-width window-height row flex-center loginContainer">
    <div class="full-width q-my-xl q-mx-none column items-center login">
      <div class="column full-width items-center">
        <q-img
          src="./../assets/logo.png"
          width="130px"
          height="130px"
          img-class="my-custom-image"
          class="rounded-borders q-mb-md"
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
                v-model="useFormLoging.email"
                label="Email"
                @blur="validatInput('email')"
                @keypress="validatInput('email')"
              />
            </label>
            <p class="error" v-if="!!validateMessageLogin.errors.email">
              {{ validateMessageLogin.errors.email }}
            </p>
          </div>
          <div class="full-width input">
            <label class="label-input">
              Contraseña
              <q-input
                type="password"
                outlined
                lazy-rules
                v-model="useFormLoging.password"
                label="contraseña"
                @blur="validatInput('password')"
                @keypress="validatInput('password')"
              />
            </label>
            <p class="error" v-if="!!validateMessageLogin.errors.password">
              {{ validateMessageLogin.errors.password }}
            </p>
          </div>
        </div>

        <div class="full-width">
          <router-link class="text-link" to="/">
            Olvidé mi contraseña</router-link
          >
        </div>
        <div class="full-width column items-center">
          <q-btn
            :disable="!validateMessageLogin.isvalid"
            label="Login"
            size="14px"
            fill
            height="48px"
            color="primary"
            class="full-width q-mb-md"
            type="submit"
          />
          <router-link class="text-link" to="/register">
            Aún no tienes cuenta?, registrate</router-link
          >
        </div>
      </q-form>
    </div>
  </div>
</template>
