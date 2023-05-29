<script setup>
import { computed } from 'vue'
import { userAuth } from 'src/composables/userAuth'
import logo from '../../assets/images/t.webp'

const { userData, isLoadingUser } = userAuth()

const isMembershipsActive = computed(() => {
  return userData.value?.membresia?.status === 'activa'
})

const getDate = (fechaString) => {
  const date = new Date(fechaString)
  const day = date.getDate()
  const month = date.getMonth() + 1
  const year = date.getFullYear()

  return `${day}/${month}/${year}`
}
</script>

<template>
  <q-inner-loading :showing="isLoadingUser">
    <q-spinner-gears size="50px" color="primary" />
  </q-inner-loading>
  <div class="full-width q-py-xl row justify-center items-center relative">
    <div
      class="column items-center absolute-center full-width"
      v-if="!isLoadingUser"
    >
      <q-img
        :src="logo"
        spinner-color="dark"
        height="200px"
        width="200px"
        alt="logo"
      />

      <p
        class="q-ma-none title-large text-center maxText"
        v-if="isMembershipsActive"
      >
        La membresía se encuentra activa, sigue disfrutando de tus beneficios
      </p>

      <p
        class="q-ma-none title-large text-center maxText"
        v-else-if="!isMembershipsActive"
      >
        La membresía esta vencida haz click en el botón de abajo para renovar
      </p>
      <div class="text-grey-7 q-mt-md">
        <p>
          Fecha de activación: {{ getDate(userData?.membresia?.created_at) }}
        </p>
        <p>
          Fecha de vencimiento: {{ getDate(userData?.membresia?.fecha_cobro) }}
        </p>
      </div>
      <section>
        <br />
        <q-btn
          v-if="!isMembershipsActive"
          to="/memberships"
          color="primary"
          label="Renovar membresia"
        />
      </section>
    </div>
  </div>
</template>

<style>
.maxText {
  max-width: 300px;
}
</style>
