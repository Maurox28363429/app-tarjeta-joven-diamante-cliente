<script setup>
import { ref, watchEffect } from 'vue'
import { useRouter } from 'vue-router'
import { useValidateForm } from 'src/composables/useValidateForm'
import { passwordSchema } from 'src/schemas/passwordShema'
import { useRecoveryPasswordStore } from 'src/stores/recoveryPasswordStore'
import {
  useChangePassword,
  useValidatePasswordAndCode,
  useSendEmailAgain
} from 'src/querys/userQuerys'
import PinInput from 'src/components/PinInput.vue'

const isVisible = ref(false)

const showPassword = () => {
  isVisible.value = !isVisible.value
}

const recoveryPasswordStore = useRecoveryPasswordStore()
const recoveryEmail = recoveryPasswordStore.email

const INITIAL_VALUES = {
  password: ''
}

const { useForm, validatInput, validateMessage } = useValidateForm({
  initialValue: INITIAL_VALUES,
  schema: passwordSchema
})

const codeValue = ref(null)
const showFormCode = ref(true)

const { go } = useRouter()

const { isLoading: isLoadingSendEmail, mutate: sendEmailMutate } =
  useSendEmailAgain()
const {
  isLoading: isLoadingHandledSencode,
  mutate: validateMutate,
  data: validateData
} = useValidatePasswordAndCode()
const { isLoading: isLoadingPassword, mutate: passwordMutate } =
  useChangePassword()

const sendCode = async () => {
  sendEmailMutate({ email: recoveryEmail })
}

const handledSencode = (code) => {
  codeValue.value = code
  validateMutate({
    email: recoveryEmail,
    code
  })
}

watchEffect(() => {
  if (validateData.value) {
    showFormCode.value = false
  }
})

const sendPassword = () => {
  passwordMutate({
    recovery_cod: codeValue.value,
    password: useForm.value.password,
    email: recoveryEmail
  })
}
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
        <div v-if="showFormCode" class="full-width column items-center">
          <p class="title-large q-mb-xl">Verifica tu email</p>
          <p class="text-center">
            Introduce el código enviado a tu correo electrónico.
          </p>
          <div class="full-width">
            <PinInput
              :submit="handledSencode"
              :loading="isLoadingHandledSencode"
            />
          </div>
          <p>¿No has recibido el correo electrónico?</p>
          <q-btn
            @click="sendCode"
            :loading="isLoadingSendEmail"
            label="Reenviar código"
            size="14px"
            fill
            height="48px"
            color="secondary"
            class="full-width q-mb-md"
          />
        </div>
        <div v-if="!showFormCode" class="full-width column items-center">
          <p class="title-large q-mb-xl">Crear nueva contraseña</p>
          <p class="text-center">Introduce la nueva contraseña</p>
          <div class="full-width">
            <div class="full-width input">
              <label class="label-large">
                Contraseña
                <q-input
                  :type="isVisible ? 'text' : 'password'"
                  outlined
                  lazy-rules
                  v-model="useForm.password"
                  placeholder="********"
                  @blur="validatInput('password')"
                  @keypress="validatInput('password')"
                >
                  <template v-slot:append>
                    <q-icon
                      @click="showPassword"
                      class="cursor-pointer"
                      :name="isVisible ? 'visibility_off' : 'visibility'"
                      color="primary"
                    />
                  </template>
                </q-input>
              </label>
              <p class="text-error" v-if="!!validateMessage.errors.password">
                {{ validateMessage.errors.password }}
              </p>
            </div>
            <q-btn
              @click="sendPassword"
              :loading="isLoadingPassword"
              :disabled="!validateMessage.isvalid"
              label="Guardar"
              size="14px"
              fill
              height="48px"
              color="primary"
              class="full-width q-mb-md"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
