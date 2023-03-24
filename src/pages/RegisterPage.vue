<script setup>
import { useRouter } from 'vue-router'
import { ref } from 'vue'

import registerUser from 'src/api/registerUser'
import { registerSchema } from 'src/schemas/registerSchema'

import { userAuth } from 'src/composables/userAuth'

import { useValidateForm } from 'src/composables/useValidateForm'
import { useToast } from 'src/composables/useToast'

const { triggerPositive, triggerWarning } = useToast()

const GENDER_OPTIONS = ['Hombre', 'Mujer']

const { userAuth: auth } = userAuth()
const loadingButton = ref(false)
const router = useRouter()

const INITIAL_VALUES = {
  name: '',
  email: '',
  last_name: '',
  phone: '',
  sex: GENDER_OPTIONS[0],
  password: ''
}

const { useForm, validatInput, validateMessage, validateForm } =
  useValidateForm({ initialValue: INITIAL_VALUES, schema: registerSchema })

const onSubmit = async (e) => {
  validateForm()
  const roleIdClient = 3

  try {
    loadingButton.value = true
    const { data } = await registerUser({
      ...useForm.value,
      role_id: roleIdClient
    })
    triggerPositive('¡Ahora estás registrado!')
    localStorage.setItem('user', JSON.stringify(data))
    if (
      auth?.value.user.membresia?.status === 'activa' ||
      auth?.value.user.membresia?.days > 0
    ) {
      router.push('/home')
    } else {
      router.push('/memberships')
    }
  } catch (err) {
    if (err.response?.status === 400) {
      triggerWarning(
        'Ese usuario ya exite, por favor ingrese otro correo o número de teléfono'
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
  <div class="full-width items-center row justify-center registerContainer">
    <div class="column items-center q-my-xl q-mx-none register">
      <div class="column items-center justify-center">
        <q-img
          src="./../assets/logo.svg"
          width="100px"
          height="80px"
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
                placeholder="Luis"
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
                placeholder="Perez"
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
                placeholder="example@gmail.com"
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
                placeholder="041459789"
                @blur="validatInput('phone')"
                @keypress="validatInput('phone')"
              />
            </label>
            <p class="error" v-if="!!validateMessage.errors.phone">
              {{ validateMessage.errors.phone }}
            </p>
          </div>
          <div class="q-ma-none full-width input">
            <label class="label-input">
              Genero
              <q-select
                outlined
                lazy-rules
                class="full-width q-ma-none"
                v-model="useForm.sex"
                :options="GENDER_OPTIONS"
              />
            </label>
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

        <div class="q-py-none q-px-md full-width row justify-center">
          <q-btn
            :disable="!validateMessage.isvalid"
            type="submit"
            label="Registrar"
            class="full-width q-mb-md"
            height="48px"
            color="secondary"
            :loading="loadingButton"
            size="14px"
            fill
          />
        </div>
        <router-link class="text-link" to="/login"
          >Ya tienes una cuenta?
          <span class="text-weight-bold">Login</span></router-link
        >
      </q-form>
    </div>
  </div>
</template>
