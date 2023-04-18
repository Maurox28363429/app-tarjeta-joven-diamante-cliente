<template>
  <div class="full-width">
    <div @click="goBack" class="full-width q-pl-md q-pt-md">
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
              :loading="loadingHandledSencode"
            />
          </div>
          <p>¿No has recibido el correo electrónico?</p>
          <q-btn
            @click="sendCode"
            :loading="loadingSendCode"
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
                  :type="typePassword"
                  outlined
                  lazy-rules
                  v-model="useForm.password"
                  placeholder="********"
                  @blur="validatInput('password')"
                  @keypress="validatInput('password')"
                >
                  <template v-slot:append>
                    <q-icon
                      @click="showPassword()"
                      class="cursor-pointer"
                      :name="iconPassword"
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
              :loading="loadingSendPassword"
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

<script setup>
import { useRouter } from 'vue-router'
import PinInput from 'src/components/PinInput.vue'
import { ref } from 'vue'
import { useValidateForm } from 'src/composables/useValidateForm'
import { passwordSchema } from 'src/schemas/passwordShema'
import validatePasswordAndCode from 'src/api/validatePasswordAndCode'
import changePassword from 'src/api/changePassword'
import { useToast } from 'src/composables/useToast'
import getCodeForRecoveryPassword from 'src/api/getCodeForRecoveryPassword'
import { useRecoveryPasswordStore } from 'src/stores/recoveryPasswordStore'

const { triggerPositive, triggerWarning } = useToast()
const loadingSendCode = ref(false)
const loadingSendPassword = ref(false)
const loadingHandledSencode = ref(false)

const typePassword = ref('password')
const iconPassword = ref('visibility_off')

const showPassword = () => {
  typePassword.value = typePassword.value === 'password' ? 'text' : 'password'
  iconPassword.value =
    iconPassword.value === 'visibility_off' ? 'visibility' : 'visibility_off'
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

const router = useRouter()

const goBack = () => {
  router.go(-1)
}

const sendCode = async () => {
  try {
    loadingSendCode.value = true
    await getCodeForRecoveryPassword({ email: recoveryEmail })
    triggerPositive('¡Código reenviado!, puede tardar unos minutos')
  } catch (err) {
    console.error(err)
    triggerWarning('¡Up! Ha ocurrido un error, intento nuevamente')
  } finally {
    loadingSendCode.value = false
  }
}

const handledSencode = async (code) => {
  codeValue.value = code
  try {
    loadingHandledSencode.value = true
    await validatePasswordAndCode({
      email: recoveryEmail,
      code
    })
    showFormCode.value = false
    triggerPositive('¡Código verificado!, ahora puede cambiar su contraseña.')
  } catch (error) {
    console.error(error)
  } finally {
    loadingHandledSencode.value = false
  }
}

const sendPassword = async () => {
  try {
    loadingSendPassword.value = true
    await changePassword({
      recovery_cod: codeValue.value,
      password: useForm.value.password,
      email: recoveryEmail
    })
    triggerPositive('La contraseña ha sido cambiada exitosamente.')
    router.push({ name: 'login' })
  } catch (error) {
    console.error(error)
    triggerWarning('¡Up! Códido incorreto, intente de nuevo ')
  } finally {
    loadingSendPassword.value = false
  }
}
</script>
