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
  try {
    const res = await registerUser(useForm.value)
    console.log(res, 'res')
  } catch (e) {
    console.log(e)
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
}
</script>

<template>
  <div class="full-width row justify-center registerContainer">
    <div class="full-width column items-center q-my-xl q-mx-none register">
      <q-img
        src="./../assets/avatar.svg"
        width="74px"
        height="74px"
        img-class="my-custom-image"
        class="rounded-borders q-mb-md"
      >
      </q-img>

      <q-form
        @submit.prevent="onSubmit"
        class="q-gutter-md full-width column items-center"
      >
        <div class="inputsContainer q-ma-none text-dark items-center column">
          <div class="q-ma-none full-width">
            <label>
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
          <div class="q-ma-none full-width">
            <label>
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
          <div class="q-ma-none full-width">
            <label>
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
          <div class="q-ma-none full-width">
            <label>
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
          <q-select
            outlined
            lazy-rules
            class="full-width q-ma-none"
            v-model="useForm.sex"
            :options="GENDER_OPTIONS"
            label="Genero"
          />
          <div class="q-ma-none full-width">
            <label>
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

        <div class="q-py-none q-px-lg full-width row">
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
      </q-form>
    </div>
  </div>
</template>

<style>
.registerContainer {
  min-height: 100vh;
}

.register {
  max-width: 340px;
}

.inputsContainer {
  width: 260px;
  gap: 10px;
}

.error {
  color: #dd1a1a;
  font-size: 12px;
}
</style>
