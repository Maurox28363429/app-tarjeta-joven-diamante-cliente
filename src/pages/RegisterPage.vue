<script setup>
import { ref } from 'vue'
import { registerSchema } from 'src/schemas/registerSchema'
import registerUser from 'src/api/registerUser'

const GENDER_OPTIONS = ['Hombre', 'Mujer']

const useForm = ref({
  name: '',
  email: '',
  last_name: '',
  phone: '',
  sex: GENDER_OPTIONS[0],
  password: ''
})

const validateMessage = ref({
  errors: {
    name: '',
    email: '',
    last_name: '',
    phone: '',
    sex: '',
    password: ''
  },
  isvalid: false
})

const onSubmit = async (e) => {
  validateForm()
  console.log('onSumit')
  const roleIdClient = 3

  try {
    const { data } = await registerUser({
      ...useForm.value,
      role_id: roleIdClient
    })
    localStorage.setItem('token', data.token)
    console.log(data, 'res')
  } catch (e) {
    console.error(e)
  }
}

const validateForm = () => {
  registerSchema
    .validate(useForm.value, { abortEarly: false })
    .then(() => (validateMessage.value = { errors: {}, isvalid: true }))
    .catch((err) => {
      const errors = err.inner.reduce((acc, error) => {
        acc[error.path] = error.message
        return acc
      }, {})
      validateForm.value = {
        errors,
        isvalid: false
      }
    })
}

const validatInput = (field) => {
  registerSchema
    .validateAt(field, useForm.value)
    .then(() => (validateMessage.value.errors[field] = ''))
    .catch((err) => {
      validateMessage.value.errors[err.path] = err.message
    })

  validateForm()
  console.log(validateMessage.value)
}
</script>

<template>
  <div class="full-width row justify-center registerContainer">
    <div class="column items-center q-my-xl q-mx-none register">
      <div class="column items-center justify-center">
        <q-img
          src="./../assets/logo.png"
          width="74px"
          height="74px"
          img-class="my-custom-image"
          class="rounded-borders q-mb-md"
        >
        </q-img>
        <p class="text-h5 q-mb-xl text-weight-bold">Crear cuenta</p>
      </div>

      <q-form
        @submit.prevent="onSubmit"
        class="q-gutter-md full-width column items-center"
      >
        <div
          class="inputsContainer q-ma-none text-dark items-center column form"
        >
          <div class="q-ma-none full-width input">
            <label class="label-input">
              Nombre
              <q-input
                lazy-rules
                outlined
                v-model="useForm.name"
                label="Nombre"
                @blur="validatInput('name')"
                @keypress="validatInput('name')"
              />
            </label>
            <p class="error" v-if="!!validateMessage.errors.name">
              {{ validateMessage.errors.name }}
            </p>
          </div>
          <div class="q-ma-none full-width input">
            <label class="label-input">
              Apellido
              <q-input
                lazy-rules
                outlined
                v-model="useForm.last_name"
                label="Apellido"
                @blur="validatInput('last_name')"
                @keypress="validatInput('last_name')"
              />
            </label>
            <p class="error" v-if="!!validateMessage.errors.last_name">
              {{ validateMessage.errors.last_name }}
            </p>
          </div>
          <div class="q-ma-none full-width input">
            <label class="label-input">
              Email
              <q-input
                lazy-rules
                type="email"
                outlined
                v-model="useForm.email"
                label="Email"
                @blur="validatInput('email')"
                @keypress="validatInput('email')"
              />
            </label>
            <p class="error" v-if="!!validateMessage.errors.email">
              {{ validateMessage.errors.email }}
            </p>
          </div>
          <div class="q-ma-none full-width input">
            <label class="label-input">
              Telefono
              <q-input
                lazy-rules
                type="tel"
                outlined
                v-model="useForm.phone"
                label="Telefono"
                @blur="validatInput('phone')"
                @keypress="validatInput('phone')"
              />
            </label>
            <p class="error" v-if="!!validateMessage.errors.phone">
              {{ validateMessage.errors.phone }}
            </p>
          </div>
          <div class="q-ma-none full-width selectInput">
            <q-select
              outlined
              lazy-rules
              class="full-width q-ma-none"
              v-model="useForm.sex"
              :options="GENDER_OPTIONS"
              label="Genero"
            />
            <p class="error" v-if="!!validateMessage.errors.role_id">
              {{ validateMessage.errors.sex }}
            </p>
          </div>
          <div class="q-ma-none full-width input">
            <label class="label-input">
              Password
              <q-input
                lazy-rules
                type="password"
                outlined
                v-model="useForm.password"
                label="Password"
                @blur="validatInput('password')"
                @keypress="validatInput('password')"
              />
            </label>
            <p class="error" v-if="!!validateMessage.errors.password">
              {{ validateMessage.errors.password }}
            </p>
          </div>
        </div>

        <div class="q-py-none full-width row">
          <q-btn
            :disable="!validateMessage.isvalid"
            type="submit"
            label="Registrar"
            class="full-width"
            height="48px"
            color="primary"
            fill
            size="14px"
          />
        </div>
        <router-link class="text-link" to="/login"
          >Ya tienes una cuenta?, da click a Login</router-link
        >
      </q-form>
    </div>
  </div>
</template>
