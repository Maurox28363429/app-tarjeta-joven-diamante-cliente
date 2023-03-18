<template>
  <div class="full-width row justify-center" style="min-height: 100vh">
    <div
      class="full-width column items-center q-my-xl q-mx-none"
      style="max-width: 340px"
    >
      <q-img
        src="./../assets/avatar.svg"
        width="74px"
        height="74px"
        img-class="my-custom-image"
        class="rounded-borders q-mb-md"
      >
      </q-img>

      <q-form
        @submit="onSubmit"
        @reset="onReset"
        class="q-gutter-md full-width column items-center"
      >
        <div
          class="q-ma-none text-dark items-center column"
          style="width: 260px; gap: 10px"
        >
          <div class="q-ma-none full-width">
            <label>
              Nombre
              <q-input outlined v-model="text" label="Email" />
            </label>
          </div>
          <div class="q-ma-none full-width">
            <label>
              Apellido
              <q-input outlined v-model="text" label="Email" />
            </label>
          </div>
          <div class="q-ma-none full-width">
            <label>
              Email
              <q-input type="tel" outlined v-model="text" label="Email" />
            </label>
          </div>
          <div class="q-ma-none full-width">
            <label>
              Telefono
              <q-input type="email" outlined v-model="text" label="Email" />
            </label>
          </div>
          <q-select
            outlined
            class="full-width q-ma-none"
            v-model="model"
            :options="options"
            label="Genero"
          />
        </div>

        <div class="q-py-none q-px-lg full-width row">
          <q-btn
            label="Registrar"
            class="full-width"
            height="48px"
            color="primary"
            fill
            size="14px"
            to="/"
          />
        </div>
      </q-form>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'

export default {
  name: 'RegisterPage',
  setup () {
    return {
      model: ref(null),
      options: ['Hombre', 'Mujer']
    }
  }
}
</script>
