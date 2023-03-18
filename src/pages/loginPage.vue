<template>
  <div class="full-width window-height row flex-center">
    <div
      class="full-width q-my-xl q-mx-none column items-center"
      style="max-width: 313px"
    >
      <q-img
        src="./../assets/avatar.svg"
        width="130px"
        height="130px"
        img-class="my-custom-image"
        class="rounded-borders q-mb-xl"
      >
      </q-img>

      <q-form
        @submit="onSubmit"
        @reset="onReset"
        class="q-gutter-md full-width column items-center"
        style="display: flex"
      >
        <div
          class="q-mb-xl q-ma-none text-dark column items-center"
          style="width: 260px; gap: 10px"
        >
          <div class="full-width">
            <label>
              Email
              <q-input type="email" outlined v-model="text" label="Email" />
            </label>
          </div>
          <div class="full-width">
            <label>
              Contraseña
              <q-input
                type="password"
                outlined
                v-model="text"
                label="contraseña"
              />
            </label>
          </div>
        </div>

        <div class="full-width">
          <p
            style="text-decoration: underline"
            class="text-primary cursor-pointer"
          >
            Olvidé mi contraseña
          </p>
        </div>

        <div class="row full-width">
          <div class="col-6 q-pr-xs">
            <q-btn
              label="Login"
              size="14px"
              fill
              height="48px"
              color="primary"
              class="full-width"
              type="submit"
            />
          </div>
          <div class="col-6">
            <q-btn
              label="Registrar"
              outline
              type="reset"
              size="14px"
              height="48px"
              color="primary"
              to="/register"
              class="full-width"
            />
          </div>
        </div>
      </q-form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LoginPage'
}
</script>
