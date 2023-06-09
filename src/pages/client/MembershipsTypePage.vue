<script setup>
import { computed } from 'vue';
import { userAuth } from 'src/composables/userAuth';
import logo from '../../assets/images/t.webp';

const { userData, isLoadingUser } = userAuth();

const isMembershipsActive = computed(
  () => userData.value?.membresia?.status === 'activa'
);

const getDate = (fechaString) => {
  const date = new Date(fechaString);
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  return `${day}/${month}/${year}`;
};

const activationDate = getDate(userData.value?.membresia?.updated_at);
const expirationDate = getDate(userData.value?.membresia?.fecha_cobro);
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
        style="max-width: 300px"
        class="q-ma-none title-large text-center maxText"
        v-if="isMembershipsActive"
      >
        La membresía se encuentra activa, sigue disfrutando de tus beneficios
      </p>

      <p
        style="max-width: 300px"
        class="q-ma-none title-large text-center maxText"
        v-else-if="!isMembershipsActive"
      >
        La membresía esta vencida haz click en el botón de abajo para renovar
      </p>
      <div class="text-grey-7 q-mt-md">
        <p>Fecha de activación: {{ activationDate }}</p>
        <p>Fecha de vencimiento: {{ expirationDate }}</p>
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
