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
        <p class="title-large q-mb-xl">Recuperar contraseña</p>

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
            :loading="loading"
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

<script setup>
import { useRouter } from 'vue-router'
import { useValidateForm } from 'src/composables/useValidateForm'
import { emailSchema } from 'src/schemas/emailShema'
import getCodeForRecoveryPassword from 'src/api/getCodeForRecoveryPassword'
import { useToast } from 'src/composables/useToast'
import { useRecoveryPasswordStore } from 'src/stores/recoveryPasswordStore'
import { ref } from 'vue'

const loading = ref(false)
const { triggerPositive, triggerWarning } = useToast()

const router = useRouter()

const goBack = () => {
  console.log('go back')
  router.go(-1)
}

const INITIAL_VALUES = {
  email: ''
}

const { useForm, validatInput, validateMessage } = useValidateForm({
  initialValue: INITIAL_VALUES,
  schema: emailSchema
})

const recoveryPasswordStore = useRecoveryPasswordStore()

const sendEmail = async () => {
  try {
    loading.value = true
    await getCodeForRecoveryPassword({ email: useForm.value.email })
    triggerPositive('Código enviado, podría tardar unos minutos en llegar.')
    recoveryPasswordStore.setEmail(useForm.value.email)
    router.push({
      name: 'recoveryPassword'
    })
  } catch (err) {
    console.log(err)
    triggerWarning('¡Up! Ha ocurrido un error, intento nuevamente')
  } finally {
    loading.value = false
  }
}
</script>
