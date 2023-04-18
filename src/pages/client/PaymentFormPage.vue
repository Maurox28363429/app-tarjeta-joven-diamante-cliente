<template>
  <q-layout
    view="lHh lpr lFf"
    container
    class="full-height"
    style="min-height: 100vh"
  >
    <q-header elevated class="q-py-sm window-width" style="background: #e9e9e9">
      <q-toolbar>
        <q-toolbar-title>
          <q-img
            src="src/assets/acronimo.svg"
            spinner-color="white"
            style="height: 40px; max-width: 98px"
          />
        </q-toolbar-title>
      </q-toolbar>
    </q-header>
    <q-page-container>
      <div class="payment">
        <div>
          <div class="row items-center q-py-md">
            <q-icon
              @click="goBack"
              name="arrow_back"
              size="xl"
              color="primary"
              class="cursor-pointer"
            />

            <p
              class="q-ml-md text-weight-medium q-ma-none text-h5 text-primary"
            >
              Regresar
            </p>
          </div>
        </div>
        <div class="full-width row justify-center payment">
          <div style="width: 400px">
            <q-form
              @submit="onSubmit"
              @reset="onReset"
              class="q-gutter-md"
              style="max-width: 400px"
            >
            <div>
              <img src="src/assets/yappy_ruta.jpeg" style="max-width:400px;height:auto">
            </div>
              <div>
                <q-input
                  @blur="validatInput('referencia')"
                  @keypress="validatInput('referencia')"
                  outlined
                  type="number"
                  v-model="useForm.referencia"
                  label="Referencia"
                />
                <p
                  class="text-error"
                  v-if="!!validateMessage.errors.referencia"
                >
                  <!-- {{ validateMessage.errors.referencia }} -->
                  Campo Requerido
                </p>
              </div>
              <div>
                <q-input
                  @update:model-value="
                    (val) => {
                      file = val[0];
                    }
                  "
                  filled
                  v-model="useForm.img"
                  type="file"
                  hint="Comprobante de pago"
                />
                <p class="text-error" v-if="!!validateMessage.errors.img">
                  {{ validateMessage.errors.img }}
                </p>
              </div>

              <div>
                <q-btn
                  :disable="!validateMessage.isvalid"
                  :loading="loading"
                  class="full-width"
                  label="Pagar"
                  type="submit"
                  color="primary"
                />
              </div>
            </q-form>
          </div>
        </div>
      </div>
    </q-page-container>
  </q-layout>
</template>

<script setup>
import createPayment from 'src/api/payment'
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useValidateForm } from 'src/composables/useValidateForm'
import getSingleMemberships from 'src/api/getSingleMemberships'
import { userAuth } from 'src/composables/userAuth'
import { paymentShema } from 'src/schemas/paymentShema'

const { user } = userAuth()
const loading = ref(false)
const membership = ref({})
const file = ref(null)
const router = useRouter()

const goBack = () => {
  router.go(-1)
}

const INITIAL_VALUES = () => ({
  referencia: '',
  membresia_id: membership.value.id,
  img: '',
  payment: membership.value.price,
  user_id: user.value.id
})

console.log(membership.value, 'membership.value')

const { useForm, validatInput, validateMessage, validateForm } =
  useValidateForm({ initialValue: INITIAL_VALUES(), schema: paymentShema })

const onSubmit = async () => {
  validateForm()
  console.log({ ...useForm.value, img: file.value })
  try {
    loading.value = true
    await createPayment({ ...useForm.value, img: file.value })
  } catch (error) {
    console.error(error)
  } finally {
    loading.value = false
  }
}

onMounted(async () => {
  try {
    const data = await getSingleMemberships(
      router.currentRoute.value.params.id
    )
    console.log(data)
    membership.value = data
    useForm.value = INITIAL_VALUES()
  } catch (error) {
    console.error(error)
  }
})
</script>

<style>
.payment {
  background-color: #e9e9e9;
  width: 100%;
  height: auto;
  padding: 0 20px;
  min-height: 100vh;
}
</style>
